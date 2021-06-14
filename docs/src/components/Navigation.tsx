import React from 'react';
import Link from 'gatsby-link';
import { Text } from '@marigold/components';

export const Navigation: React.FC = () => {
  return (
    <Text>
      <Link to="/start">Marigold</Link>
      <ul>
        <li>
          <b>Guides</b>
          <ul>
            <li>Installation</li>
            <li>Theme & Variants</li>
          </ul>
        </li>
        <li>
          <b>Foundation</b>
          <ul>
            <li>
              <Link to="/foundation/design-language/theming">Theming</Link>
            </li>
            <li>Layout</li>
            <li>Box Primitive</li>
            <li>
              <Link to="/foundation/design-tokens/icons">Iconography</Link>
            </li>
          </ul>
        </li>
        <li>
          <b>Components</b>
          <ul>
            <li>
              <Link to="/components/alert">Alert</Link>
            </li>
            <li>
              <Link to="/components/badge">Badge</Link>
            </li>
            <li>
              <Link to="/components/box">Box</Link>
            </li>
            <li>
              <Link to="/components/button">Button</Link>
            </li>
            <li>
              <Link to="/components/column">Column</Link>
            </li>
            <li>
              <Link to="/components/columns">Columns</Link>
            </li>
            <li>
              <Link to="/components/container">Container</Link>
            </li>
            <li>
              <Link to="/components/dialog">Dialog</Link>
            </li>
            <li>
              <Link to="/components/divider">Divider</Link>
            </li>
            <li>
              <Link to="/components/field">Field</Link>
            </li>
            <li>
              <Link to="/components/heading">Heading</Link>
            </li>
            <li>
              <Link to="/components/hidden">Hidden</Link>
            </li>
            <li>
              <Link to="/components/input">Input</Link>
            </li>
            <li>
              <Link to="/components/label">Label</Link>
            </li>
            <li>
              <Link to="/components/link">Link</Link>
            </li>
            <li>
              <Link to="/components/menu">Menu</Link>
            </li>
            <li>
              <Link to="/components/menu-item">MenuItem</Link>
            </li>
            <li>
              <Link to="/components/message">Message</Link>
            </li>
            <li>
              <Link to="/components/radio">Radio</Link>
            </li>
            <li>
              <Link to="/components/select">Select</Link>
            </li>
            <li>
              <Link to="/components/slider">Slider</Link>
            </li>
            <li>
              <Link to="/components/stack">Stack</Link>
            </li>
            <li>
              <Link to="/components/text">Text</Link>
            </li>
            <li>
              <Link to="/components/textarea">Textarea</Link>
            </li>
            <li>
              <Link to="/components/validation-message">ValidationMessage</Link>
            </li>
          </ul>
        </li>
        <li>
          <b>Themes</b>
          <ul>
            <li>
              <Link to="/themes/b2b">B2B</Link>
            </li>
            <li>
              <Link to="/themes/unicorn">Unicorn</Link>
            </li>
            <li>Marigold Docs</li>
          </ul>
        </li>
      </ul>
    </Text>
  );
};
