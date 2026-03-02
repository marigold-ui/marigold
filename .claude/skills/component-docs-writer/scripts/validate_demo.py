#!/usr/bin/env python3
"""
Validate demo files follow Marigold conventions.

Usage:
    python validate_demo.py path/to/demo.tsx
    python validate_demo.py path/to/component/  # validates all demos in directory

Checks:
- Naming convention: {component}-{feature}.demo.tsx
- Has default export
- Imports from @marigold/components
- No hardcoded styles or className props
- TypeScript types used correctly
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Tuple


class DemoValidator:
    def __init__(self, file_path: Path):
        self.file_path = file_path
        self.content = file_path.read_text()
        self.errors = []
        self.warnings = []

    def validate(self) -> Tuple[List[str], List[str]]:
        """Run all validation checks."""
        self.check_naming()
        self.check_imports()
        self.check_export()
        self.check_styling()
        self.check_typescript()

        return self.errors, self.warnings

    def check_naming(self):
        """Validate file naming convention."""
        filename = self.file_path.name

        # Should end with .demo.tsx
        if not filename.endswith('.demo.tsx'):
            self.errors.append(
                f"File must end with '.demo.tsx', got '{filename}'"
            )
            return

        # Should follow {component}-{feature}.demo.tsx pattern
        name_part = filename.replace('.demo.tsx', '')
        if not re.match(r'^[a-z]+(-[a-z]+)*$', name_part):
            self.warnings.append(
                f"Filename should follow kebab-case pattern: '{name_part}'"
            )

    def check_imports(self):
        """Check imports from @marigold packages."""
        has_component_import = re.search(
            r"from ['\"]@marigold/(components|icons)['\"]",
            self.content
        )

        if not has_component_import:
            self.warnings.append(
                "Demo should import from '@marigold/components' or '@marigold/icons'"
            )

        # Check for external icon imports (allowed)
        if "from 'lucide-react'" in self.content:
            # This is fine, just noting it
            pass

    def check_export(self):
        """Check for default export."""
        has_default_export = (
            'export default' in self.content
        )

        if not has_default_export:
            self.errors.append(
                "Demo must have a default export"
            )

        # Check export pattern
        if not re.search(r'export default.*=>', self.content):
            if not re.search(r'export default function', self.content):
                self.warnings.append(
                    "Prefer arrow function syntax: export default () => (...)"
                )

    def check_styling(self):
        """Check for hardcoded styles."""
        # Check for inline style prop
        if re.search(r'style=\{', self.content):
            self.errors.append(
                "Don't use inline 'style' prop. Use Tailwind classes via component props."
            )

        # Check for className on Marigold components
        # This is tricky as className is valid on layout components
        if re.search(r'<(?!Image|svg)[A-Z]\w+[^>]*className=', self.content):
            self.warnings.append(
                "Avoid 'className' on Marigold components. Use variant/size props instead."
            )

        # Check for hardcoded CSS
        if 'styled.' in self.content or 'css`' in self.content:
            self.errors.append(
                "Don't use CSS-in-JS. Use Tailwind classes via component props."
            )

    def check_typescript(self):
        """Check TypeScript usage."""
        # For appearance demos, should have type annotation
        if '-appearance.demo.tsx' in self.file_path.name:
            if not re.search(r'export default \(props:', self.content):
                self.warnings.append(
                    "Appearance demos should accept typed props: (props: ComponentProps)"
                )

        # Check for 'any' type
        if ': any' in self.content or '<any>' in self.content:
            self.errors.append(
                "Avoid using 'any' type. Use proper TypeScript types."
            )

    def format_results(self) -> str:
        """Format validation results."""
        result = [f"\n📄 {self.file_path.name}"]

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


def validate_file(file_path: Path) -> bool:
    """Validate a single demo file. Returns True if valid."""
    validator = DemoValidator(file_path)
    errors, warnings = validator.validate()
    print(validator.format_results())
    return len(errors) == 0


def validate_directory(dir_path: Path) -> Tuple[int, int]:
    """Validate all demo files in directory. Returns (passed, total)."""
    demo_files = list(dir_path.glob('*.demo.tsx'))

    if not demo_files:
        print(f"No demo files found in {dir_path}")
        return 0, 0

    print(f"Found {len(demo_files)} demo file(s) in {dir_path}")

    passed = 0
    for demo_file in demo_files:
        if validate_file(demo_file):
            passed += 1

    return passed, len(demo_files)


def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_demo.py <file-or-directory>")
        print("\nExamples:")
        print("  python validate_demo.py button-icon.demo.tsx")
        print("  python validate_demo.py docs/content/components/actions/button/")
        sys.exit(1)

    path = Path(sys.argv[1])

    if not path.exists():
        print(f"❌ Path does not exist: {path}")
        sys.exit(1)

    if path.is_file():
        if not path.name.endswith('.demo.tsx'):
            print(f"❌ Not a demo file: {path.name}")
            sys.exit(1)

        is_valid = validate_file(path)
        sys.exit(0 if is_valid else 1)

    elif path.is_dir():
        passed, total = validate_directory(path)

        print(f"\n{'='*60}")
        print(f"Results: {passed}/{total} demos passed validation")

        if passed == total:
            print("✅ All demos are valid!")
            sys.exit(0)
        else:
            print(f"❌ {total - passed} demo(s) have issues")
            sys.exit(1)

    else:
        print(f"❌ Invalid path: {path}")
        sys.exit(1)


if __name__ == "__main__":
    main()
