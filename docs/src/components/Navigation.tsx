import React from 'react';
import Link from 'gatsby-link';
import { Text } from '@marigold/components';

export default function Navigation() {
  return (
    <div>
      <Link to="/start">
        <Text>Home</Text>
      </Link>
      <ul>
        <li>
          <Text>Content</Text>
        </li>
        <li>
          <Text>Layout</Text>
        </li>
        <li>
          <Text>Form</Text>
          <ul>
            <li>
              <Link to="/button">Button</Link>
            </li>
          </ul>
        </li>
        <li>
          <Text>Typography</Text>
        </li>
        <li>
          <Text>Iconography</Text>
        </li>
      </ul>
    </div>
  );
}
