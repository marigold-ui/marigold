import React from 'react';
import Link from 'gatsby-link';
import { Text } from '@marigold/components';

export const Navigation: React.FC = () => {
  return (
    <Text>
      <Link to="/start">Home</Link>
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
              <Link to="/designTokens/theme">Theming</Link>
            </li>
            <li>Layout</li>
            <li>Box Primitive</li>
            <li>
              <Link to="/designTokens/icons">Iconography</Link>
            </li>
            {/* <li>
                <Link to="/designTokens/colours">Colours</Link>
            </li> */}
          </ul>
        </li>
        <li>
          <b>Components</b>
          <ul>
            <li>Alert</li>
            <li>Badge</li>
            <li>
              <Link to="/components/button">Button</Link>
            </li>
            <li>
              <Link to="/components/checkbox">Checkbox</Link>
            </li>
            <li>Column</li>
            <li>
              <Link to="/components/field">Field</Link>
            </li>
            <li>
              <Link to="/components/input">Input</Link>
            </li>
          </ul>
        </li>
      </ul>
    </Text>
  );
};
