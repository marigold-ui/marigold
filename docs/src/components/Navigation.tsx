import React from 'react';
import Link from 'gatsby-link';
import { Text } from '@marigold/components';

export const Navigation: React.FC = () => {
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
              <Text>
                <Link to="/components/button">Button</Link>
              </Text>
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
};
