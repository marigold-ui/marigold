import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { VisuallyHidden } from './VisuallyHidden';
import { Text } from '../Text';

export default {
  title: 'Components/Hidden',
} as Meta;

export const Basic: ComponentStory<typeof VisuallyHidden> = ({
  children,
  ...args
}) => (
  <>
    <Text>The Text below is visually hidden</Text>
    <VisuallyHidden {...args}>Invisible!</VisuallyHidden>
  </>
);
