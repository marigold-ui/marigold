import { addDecorator, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import { withA11y } from '@storybook/addon-a11y';

addDecorator(withA11y);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
