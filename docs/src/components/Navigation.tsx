import React from 'react';
import Link from 'gatsby-link';
import { Text } from '@marigold/components';

export const Navigation: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <Text>Home</Text>
      </Link>
      <ul>
        <li>
          <Text>Design Language</Text>
          <ul>
            <li>
              <Text>Brand</Text>
            </li>
            <li>
              <Text>Logos</Text>
            </li>
            <li>
              <Text>Guidelines</Text>
            </li>
          </ul>
        </li>
        <li>
          <Text>Design Tokens</Text>
          <ul>
            <li>
              <Text>
                <Link to="/design-tokens/colors">Colors</Link>
              </Text>
            </li>
            <li>
              <Text>Layout</Text>
            </li>
            <li>
              <Text>Typography</Text>
            </li>
            <li>
              <Text>
                <Link to="/design-tokens/icons">Icons</Link>
              </Text>
            </li>
          </ul>
        </li>
        <li>
          <Text>Components</Text>
          <ul>
            <li>
              <Text>
                <Link to="/components/button">Button</Link>
              </Text>
            </li>
            <li>
              <Text>
                <Link to="/components/checkbox">Checkbox</Link>
              </Text>
            </li>
            <li>
              <Text>
                <Link to="/components/field">Field</Link>
              </Text>
            </li>
            <li>
              <Text>
                <Link to="/components/input">Input</Link>
              </Text>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
