#!/usr/bin/env python3
"""
Validate Marigold component documentation completeness.

Usage:
    python validate_docs.py docs/content/components/{category}/{component}/

Checks:
- Required frontmatter fields (title, caption)
- Anatomy section exists and is first section after introduction
- Anatomy diagram image exists
- Demo files follow naming conventions
- Image files referenced in MDX exist
- Cross-references are valid
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Tuple, Optional


class DocsValidator:
    def __init__(self, component_dir: Path):
        self.component_dir = component_dir
        self.errors = []
        self.warnings = []

        # Find main MDX file
        mdx_files = list(component_dir.glob('*.mdx'))
        if not mdx_files:
            self.errors.append(f"No MDX file found in {component_dir}")
            self.mdx_file = None
            self.content = ""
        else:
            self.mdx_file = mdx_files[0]
            self.content = self.mdx_file.read_text()

    def validate(self) -> Tuple[List[str], List[str]]:
        """Run all validation checks."""
        if not self.mdx_file:
            return self.errors, self.warnings

        self.check_frontmatter()
        self.check_sections()
        self.check_anatomy()
        self.check_demo_files()
        self.check_images()

        return self.errors, self.warnings

    def check_frontmatter(self):
        """Validate frontmatter has required fields."""
        frontmatter_match = re.search(r'^---\n(.*?)\n---', self.content, re.DOTALL)

        if not frontmatter_match:
            self.errors.append("Missing frontmatter (---...---)")
            return

        frontmatter = frontmatter_match.group(1)

        # Check for title
        if not re.search(r'^title:', frontmatter, re.MULTILINE):
            self.errors.append("Missing 'title:' in frontmatter")

        # Check for caption
        if not re.search(r'^caption:', frontmatter, re.MULTILINE):
            self.errors.append("Missing 'caption:' in frontmatter")

    def check_sections(self):
        """Check for required sections."""
        # Remove frontmatter for section analysis
        content_body = re.sub(r'^---\n.*?\n---\n', '', self.content, flags=re.DOTALL)

        # Find all h2 headers
        h2_headers = re.findall(r'^## (.+)$', content_body, re.MULTILINE)

        if not h2_headers:
            self.warnings.append("No sections (## headers) found")
            return

        # Check for required sections
        required_sections = ['Anatomy', 'Appearance', 'Usage', 'Props']
        for section in required_sections:
            if section not in h2_headers:
                self.warnings.append(f"Missing recommended section: '{section}'")

        # Check Anatomy is first section
        if 'Anatomy' in h2_headers and h2_headers[0] != 'Anatomy':
            self.errors.append(
                f"'Anatomy' must be the first section after introduction. "
                f"Currently: '{h2_headers[0]}' is first"
            )

    def check_anatomy(self):
        """Check anatomy section has diagram and description."""
        anatomy_match = re.search(
            r'## Anatomy\n(.*?)(?=\n## |\Z)',
            self.content,
            re.DOTALL
        )

        if not anatomy_match:
            # Already warned in check_sections
            return

        anatomy_content = anatomy_match.group(1)

        # Check for Image component
        if '<Image' not in anatomy_content:
            self.errors.append(
                "Anatomy section must include <Image> component with diagram"
            )

        # Check for description list
        if not re.search(r'<ul>.*?<li>.*?<b>', anatomy_content, re.DOTALL):
            self.warnings.append(
                "Anatomy section should include list describing parts"
            )

        # Extract image path and check it exists
        image_match = re.search(r'src="([^"]+)"', anatomy_content)
        if image_match:
            image_path = image_match.group(1)
            # Remove leading slash for path resolution
            image_path = image_path.lstrip('/')
            full_path = self.component_dir.parent.parent.parent.parent / 'public' / image_path

            if not full_path.exists():
                self.errors.append(
                    f"Anatomy diagram image not found: {image_path}"
                )

    def check_demo_files(self):
        """Check demo files exist and follow conventions."""
        demo_files = list(self.component_dir.glob('*.demo.tsx'))

        if not demo_files:
            self.warnings.append("No demo files found")
            return

        # Check naming convention
        for demo in demo_files:
            name = demo.name
            if not re.match(r'^[a-z]+(-[a-z]+)*\.demo\.tsx$', name):
                self.warnings.append(
                    f"Demo file '{name}' should use kebab-case naming"
                )

        # Check demos are referenced in MDX
        demo_refs = re.findall(r'file="\./(.*?\.demo\.tsx)"', self.content)

        for ref in demo_refs:
            ref_path = self.component_dir / ref
            if not ref_path.exists():
                self.errors.append(
                    f"Referenced demo file not found: {ref}"
                )

    def check_images(self):
        """Check referenced images exist."""
        # Find all Image components
        image_refs = re.findall(r'<Image[^>]+src="([^"]+)"', self.content)

        for image_path in image_refs:
            # Remove leading slash
            image_path = image_path.lstrip('/')
            full_path = self.component_dir.parent.parent.parent.parent / 'public' / image_path

            if not full_path.exists():
                self.warnings.append(
                    f"Referenced image not found: {image_path}"
                )

    def format_results(self) -> str:
        """Format validation results."""
        component_name = self.component_dir.name
        result = [f"\n📦 {component_name}"]

        if not self.errors and not self.warnings:
            result.append("   ✅ All checks passed")
            return '\n'.join(result)

        if self.errors:
            result.append(f"\n   ❌ {len(self.errors)} error(s):")
            for error in self.errors:
                result.append(f"      - {error}")

        if self.warnings:
            result.append(f"\n   ⚠️  {len(self.warnings)} warning(s):")
            for warning in self.warnings:
                result.append(f"      - {warning}")

        return '\n'.join(result)


def validate_component(component_dir: Path) -> bool:
    """Validate component documentation. Returns True if valid."""
    validator = DocsValidator(component_dir)
    errors, warnings = validator.validate()
    print(validator.format_results())
    return len(errors) == 0


def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_docs.py <component-directory>")
        print("\nExample:")
        print("  python validate_docs.py docs/content/components/form/file-field/")
        sys.exit(1)

    path = Path(sys.argv[1])

    if not path.exists():
        print(f"❌ Path does not exist: {path}")
        sys.exit(1)

    if not path.is_dir():
        print(f"❌ Path must be a directory: {path}")
        sys.exit(1)

    is_valid = validate_component(path)

    print(f"\n{'='*60}")
    if is_valid:
        print("✅ Documentation validation passed!")
        sys.exit(0)
    else:
        print("❌ Documentation has issues that need fixing")
        sys.exit(1)


if __name__ == "__main__":
    main()
