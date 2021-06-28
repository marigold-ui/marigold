import React from 'react';

import { useNavigation } from './useNavigation';

const NavigationSection = () => {};

export const Navigation: React.FC = () => {
  const tree = useNavigation();
  console.log(tree);

  return (
    <nav aria-labelledby="primary-navigation">
      <ul>
        {tree.map(item => (
          <li>edge or item</li>
        ))}
      </ul>
    </nav>
  );
};
