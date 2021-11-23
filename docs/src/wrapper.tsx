import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import {
  MarigoldProvider,
  SSRProvider,
  ActionGroup,
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Column,
  Columns,
  Dialog,
  Divider,
  Field,
  Heading,
  Hidden,
  Image,
  Label,
  Link,
  Menu,
  MenuItem,
  Message,
  Radio,
  Slider,
  Select,
  Stack,
  Text,
  Textarea,
  Input,
  Container,
  ValidationMessage,
  Item,
  Section,
} from '@marigold/components';
import { theme } from './theme';

import { Layout } from './components/Layout';
import { MarigoldThemeSwitch, themes } from './components/ThemeSwitch';
import * as mdxComponents from './mdx';

const components = {
  ActionGroup,
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Column,
  Columns,
  Dialog,
  Divider,
  Field,
  Heading,
  Hidden,
  Image,
  Label,
  Link,
  Menu,
  MenuItem,
  Message,
  Radio,
  Slider,
  Select,
  Stack,
  Text,
  Textarea,
  Input,
  Container,
  ValidationMessage,
  Item,
  Section,
  ...mdxComponents,
};

export const WrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const WrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <SSRProvider>
    <MarigoldProvider theme={theme}>
      <MarigoldThemeSwitch themes={themes} initial="b2bTheme">
        <MDXProvider components={components}>{element}</MDXProvider>
      </MarigoldThemeSwitch>
    </MarigoldProvider>
  </SSRProvider>
);

/**
 * Enforce reloading to update styles.
 */
if (module.hot) {
  module.hot.accept('./theme', () => {
    console.log('🏵  UPDATE THEME!');
    window.location.reload();
  });
}
