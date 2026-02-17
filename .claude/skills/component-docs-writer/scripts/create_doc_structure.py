#!/usr/bin/env python3
"""
Create documentation structure for a new Marigold component.

Usage:
    python create_doc_structure.py ComponentName category

Example:
    python create_doc_structure.py Badge content
    python create_doc_structure.py DatePicker form
"""

import os
import sys
from pathlib import Path


def to_kebab_case(name: str) -> str:
    """Convert PascalCase to kebab-case."""
    result = []
    for i, char in enumerate(name):
        if char.isupper() and i > 0:
            result.append('-')
        result.append(char.lower())
    return ''.join(result)


def create_doc_structure(component_name: str, category: str, base_path: str = None):
    """
    Create documentation structure for a component.

    Args:
        component_name: PascalCase component name (e.g., "Badge", "DatePicker")
        category: Component category (e.g., "content", "form", "actions")
        base_path: Optional base path (defaults to docs/content/components)
    """
    if base_path is None:
        # Default to the Marigold project structure
        base_path = "docs/content/components"

    kebab_name = to_kebab_case(component_name)

    # Create directory structure
    doc_dir = Path(base_path) / category / kebab_name
    doc_dir.mkdir(parents=True, exist_ok=True)

    # Create main MDX file
    mdx_file = doc_dir / f"{kebab_name}.mdx"
    mdx_content = f"""---
title: {component_name}
caption: Brief one-sentence description of what the component does.
badge: new
---

The `<{component_name}>` component is a [category] that allows users to [primary action]. It is used for [main use case] such as [example 1], [example 2], or [example 3].

## Anatomy

A {component_name.lower()} consists of [part 1], [part 2], and [part 3]. Users interact with it by [interaction method].

<Image
  src="/{kebab_name}/{kebab_name}-anatomy.jpg"
  alt="Anatomy of a {component_name}"
  width={{800}}
  height={{550}}
  className="mx-auto block"
/>

## Appearance

<AppearanceDemo component={{title}} />

<AppearanceTable component={{title}} />

## Usage

[Explain when and how to use this component]

### Feature Name

Brief explanation of the feature.

<ComponentDemo file="./{kebab_name}-feature.demo.tsx" />

## Props

<StorybookHintMessage component={{title}} />

<PropsTable component={{title}} />

## Alternative components

- [RelatedComponent](/path): Description
"""

    mdx_file.write_text(mdx_content)

    # Create appearance demo file
    appearance_demo = doc_dir / f"{kebab_name}-appearance.demo.tsx"
    appearance_content = f"""import type {{ {component_name}Props }} from '@marigold/components';
import {{ {component_name} }} from '@marigold/components';

export default (props: {component_name}Props) => (
  <{component_name} {{...props}}>Content</{component_name}>
);
"""
    appearance_demo.write_text(appearance_content)

    # Create basic feature demo file
    feature_demo = doc_dir / f"{kebab_name}-basic.demo.tsx"
    feature_content = f"""import {{ {component_name} }} from '@marigold/components';

export default () => (
  <{component_name}>
    Example content
  </{component_name}>
);
"""
    feature_demo.write_text(feature_content)

    print(f"✅ Created documentation structure for {component_name}")
    print(f"   Location: {doc_dir}")
    print(f"\nFiles created:")
    print(f"   - {kebab_name}.mdx")
    print(f"   - {kebab_name}-appearance.demo.tsx")
    print(f"   - {kebab_name}-basic.demo.tsx")
    print(f"\nNext steps:")
    print(f"   1. Update the MDX file with actual content")
    print(f"   2. Create anatomy diagram at public/{kebab_name}/{kebab_name}-anatomy.jpg")
    print(f"   3. Add additional demo files as needed")


def main():
    if len(sys.argv) < 3:
        print("Usage: python create_doc_structure.py ComponentName category")
        print("\nExamples:")
        print("  python create_doc_structure.py Badge content")
        print("  python create_doc_structure.py DatePicker form")
        print("\nCategories: actions, content, form, layout, overlay, etc.")
        sys.exit(1)

    component_name = sys.argv[1]
    category = sys.argv[2]
    base_path = sys.argv[3] if len(sys.argv) > 3 else None

    create_doc_structure(component_name, category, base_path)


if __name__ == "__main__":
    main()
