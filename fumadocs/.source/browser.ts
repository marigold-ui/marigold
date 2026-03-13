// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<
  typeof Config,
  import('fumadocs-mdx/runtime/types').InternalTypeConfig & {
    DocData: {};
  } & {
    DocData: {
      blogPosts: {
        /**
         * Last modified date of document file, obtained from version control.
         *
         */
        lastModified?: Date;
      };
      docs: {
        /**
         * Last modified date of document file, obtained from version control.
         *
         */
        lastModified?: Date;
      };
    };
  }
>();
const browserCollections = {
  blogPosts: create.doc('blogPosts', {
    'release-2024-10-25.mdx': () =>
      import('../content/releases/blog/release-2024-10-25.mdx?collection=blogPosts'),
    'release-2024-11-27.mdx': () =>
      import('../content/releases/blog/release-2024-11-27.mdx?collection=blogPosts'),
    'release-2025-01-22.mdx': () =>
      import('../content/releases/blog/release-2025-01-22.mdx?collection=blogPosts'),
    'release-2025-02-14.mdx': () =>
      import('../content/releases/blog/release-2025-02-14.mdx?collection=blogPosts'),
    'release-2025-03-19.mdx': () =>
      import('../content/releases/blog/release-2025-03-19.mdx?collection=blogPosts'),
    'release-2025-05-08.mdx': () =>
      import('../content/releases/blog/release-2025-05-08.mdx?collection=blogPosts'),
    'release-2025-07-08.mdx': () =>
      import('../content/releases/blog/release-2025-07-08.mdx?collection=blogPosts'),
    'release-2025-07-22.mdx': () =>
      import('../content/releases/blog/release-2025-07-22.mdx?collection=blogPosts'),
    'release-2025-09-01.mdx': () =>
      import('../content/releases/blog/release-2025-09-01.mdx?collection=blogPosts'),
    'release-2025-09-30.mdx': () =>
      import('../content/releases/blog/release-2025-09-30.mdx?collection=blogPosts'),
    'release-2025-11-25.mdx': () =>
      import('../content/releases/blog/release-2025-11-25.mdx?collection=blogPosts'),
    'release-2026-02-17.mdx': () =>
      import('../content/releases/blog/release-2026-02-17.mdx?collection=blogPosts'),
  }),
  docs: create.doc('docs', {
    'index.mdx': () => import('../content/index.mdx?collection=docs'),
    'foundations/accessibility.mdx': () =>
      import('../content/foundations/accessibility.mdx?collection=docs'),
    'foundations/design-tokens.mdx': () =>
      import('../content/foundations/design-tokens.mdx?collection=docs'),
    'foundations/elevation.mdx': () =>
      import('../content/foundations/elevation.mdx?collection=docs'),
    'foundations/form-fields.mdx': () =>
      import('../content/foundations/form-fields.mdx?collection=docs'),
    'foundations/icons.mdx': () =>
      import('../content/foundations/icons.mdx?collection=docs'),
    'foundations/layouts.mdx': () =>
      import('../content/foundations/layouts.mdx?collection=docs'),
    'foundations/spacing.mdx': () =>
      import('../content/foundations/spacing.mdx?collection=docs'),
    'foundations/style-props.mdx': () =>
      import('../content/foundations/style-props.mdx?collection=docs'),
    'getting-started/design-principles.mdx': () =>
      import('../content/getting-started/design-principles.mdx?collection=docs'),
    'getting-started/design-token-guidelines.mdx': () =>
      import('../content/getting-started/design-token-guidelines.mdx?collection=docs'),
    'getting-started/faq.mdx': () =>
      import('../content/getting-started/faq.mdx?collection=docs'),
    'getting-started/get-in-touch.mdx': () =>
      import('../content/getting-started/get-in-touch.mdx?collection=docs'),
    'getting-started/governance-principles.mdx': () =>
      import('../content/getting-started/governance-principles.mdx?collection=docs'),
    'getting-started/governance-process.mdx': () =>
      import('../content/getting-started/governance-process.mdx?collection=docs'),
    'getting-started/installation.mdx': () =>
      import('../content/getting-started/installation.mdx?collection=docs'),
    'getting-started/release-phases.mdx': () =>
      import('../content/getting-started/release-phases.mdx?collection=docs'),
    'patterns/admin-master-mark.mdx': () =>
      import('../content/patterns/admin-master-mark.mdx?collection=docs'),
    'patterns/async-data-loading.mdx': () =>
      import('../content/patterns/async-data-loading.mdx?collection=docs'),
    'patterns/feedback-messages.mdx': () =>
      import('../content/patterns/feedback-messages.mdx?collection=docs'),
    'patterns/filter.mdx': () =>
      import('../content/patterns/filter.mdx?collection=docs'),
    'patterns/form-implementation.mdx': () =>
      import('../content/patterns/form-implementation.mdx?collection=docs'),
    'patterns/forms.mdx': () =>
      import('../content/patterns/forms.mdx?collection=docs'),
    'patterns/loading-states.mdx': () =>
      import('../content/patterns/loading-states.mdx?collection=docs'),
    'patterns/multiple-selection.mdx': () =>
      import('../content/patterns/multiple-selection.mdx?collection=docs'),
    'releases/blog-overview.mdx': () =>
      import('../content/releases/blog-overview.mdx?collection=docs'),
    'components/__internal__/component-guidelines.mdx': () =>
      import('../content/components/__internal__/component-guidelines.mdx?collection=docs'),
    'components/__internal__/index.mdx': () =>
      import('../content/components/__internal__/index.mdx?collection=docs'),
    'releases/docs/release.mdx': () =>
      import('../content/releases/docs/release.mdx?collection=docs'),
    'releases/blog/release-2024-10-25.mdx': () =>
      import('../content/releases/blog/release-2024-10-25.mdx?collection=docs'),
    'releases/blog/release-2024-11-27.mdx': () =>
      import('../content/releases/blog/release-2024-11-27.mdx?collection=docs'),
    'releases/blog/release-2025-01-22.mdx': () =>
      import('../content/releases/blog/release-2025-01-22.mdx?collection=docs'),
    'releases/blog/release-2025-02-14.mdx': () =>
      import('../content/releases/blog/release-2025-02-14.mdx?collection=docs'),
    'releases/blog/release-2025-03-19.mdx': () =>
      import('../content/releases/blog/release-2025-03-19.mdx?collection=docs'),
    'releases/blog/release-2025-05-08.mdx': () =>
      import('../content/releases/blog/release-2025-05-08.mdx?collection=docs'),
    'releases/blog/release-2025-07-08.mdx': () =>
      import('../content/releases/blog/release-2025-07-08.mdx?collection=docs'),
    'releases/blog/release-2025-07-22.mdx': () =>
      import('../content/releases/blog/release-2025-07-22.mdx?collection=docs'),
    'releases/blog/release-2025-09-01.mdx': () =>
      import('../content/releases/blog/release-2025-09-01.mdx?collection=docs'),
    'releases/blog/release-2025-09-30.mdx': () =>
      import('../content/releases/blog/release-2025-09-30.mdx?collection=docs'),
    'releases/blog/release-2025-11-25.mdx': () =>
      import('../content/releases/blog/release-2025-11-25.mdx?collection=docs'),
    'releases/blog/release-2026-02-17.mdx': () =>
      import('../content/releases/blog/release-2026-02-17.mdx?collection=docs'),
    'releases/fumadocs/release.mdx': () =>
      import('../content/releases/fumadocs/release.mdx?collection=docs'),
    'components/actions/actionbar/index.mdx': () =>
      import('../content/components/actions/actionbar/index.mdx?collection=docs'),
    'components/actions/button/index.mdx': () =>
      import('../content/components/actions/button/index.mdx?collection=docs'),
    'components/actions/link/index.mdx': () =>
      import('../content/components/actions/link/index.mdx?collection=docs'),
    'components/actions/link-button/index.mdx': () =>
      import('../content/components/actions/link-button/index.mdx?collection=docs'),
    'components/actions/toggle-button/index.mdx': () =>
      import('../content/components/actions/toggle-button/index.mdx?collection=docs'),
    'components/application/routerprovider/index.mdx': () =>
      import('../content/components/application/routerprovider/index.mdx?collection=docs'),
    'components/actions/toggle-button-group/index.mdx': () =>
      import('../content/components/actions/toggle-button-group/index.mdx?collection=docs'),
    'components/application/provider/index.mdx': () =>
      import('../content/components/application/provider/index.mdx?collection=docs'),
    'components/collection/selectlist/index.mdx': () =>
      import('../content/components/collection/selectlist/index.mdx?collection=docs'),
    'components/content/badge/index.mdx': () =>
      import('../content/components/content/badge/index.mdx?collection=docs'),
    'components/collection/tag/index.mdx': () =>
      import('../content/components/collection/tag/index.mdx?collection=docs'),
    'components/collection/table/index.mdx': () =>
      import('../content/components/collection/table/index.mdx?collection=docs'),
    'components/content/card/index.mdx': () =>
      import('../content/components/content/card/index.mdx?collection=docs'),
    'components/content/empty-state/index.mdx': () =>
      import('../content/components/content/empty-state/index.mdx?collection=docs'),
    'components/content/divider/index.mdx': () =>
      import('../content/components/content/divider/index.mdx?collection=docs'),
    'components/content/headline/index.mdx': () =>
      import('../content/components/content/headline/index.mdx?collection=docs'),
    'components/content/icon/index.mdx': () =>
      import('../content/components/content/icon/index.mdx?collection=docs'),
    'components/content/loader/index.mdx': () =>
      import('../content/components/content/loader/index.mdx?collection=docs'),
    'components/content/list/index.mdx': () =>
      import('../content/components/content/list/index.mdx?collection=docs'),
    'components/content/section-message/index.mdx': () =>
      import('../content/components/content/section-message/index.mdx?collection=docs'),
    'components/content/visually-hidden/index.mdx': () =>
      import('../content/components/content/visually-hidden/index.mdx?collection=docs'),
    'components/content/svg/index.mdx': () =>
      import('../content/components/content/svg/index.mdx?collection=docs'),
    'components/content/text/index.mdx': () =>
      import('../content/components/content/text/index.mdx?collection=docs'),
    'components/formatters/dateformat/index.mdx': () =>
      import('../content/components/formatters/dateformat/index.mdx?collection=docs'),
    'components/hooks-and-utils/cn/index.mdx': () =>
      import('../content/components/hooks-and-utils/cn/index.mdx?collection=docs'),
    'components/formatters/numericformat/index.mdx': () =>
      import('../content/components/formatters/numericformat/index.mdx?collection=docs'),
    'components/hooks-and-utils/cva/index.mdx': () =>
      import('../content/components/hooks-and-utils/cva/index.mdx?collection=docs'),
    'components/hooks-and-utils/extendTheme/index.mdx': () =>
      import('../content/components/hooks-and-utils/extendTheme/index.mdx?collection=docs'),
    'components/hooks-and-utils/useAsyncListData/index.mdx': () =>
      import('../content/components/hooks-and-utils/useAsyncListData/index.mdx?collection=docs'),
    'components/hooks-and-utils/useListData/index.mdx': () =>
      import('../content/components/hooks-and-utils/useListData/index.mdx?collection=docs'),
    'components/hooks-and-utils/parseFormData/index.mdx': () =>
      import('../content/components/hooks-and-utils/parseFormData/index.mdx?collection=docs'),
    'components/hooks-and-utils/useResponsiveValue/index.mdx': () =>
      import('../content/components/hooks-and-utils/useResponsiveValue/index.mdx?collection=docs'),
    'components/hooks-and-utils/useTheme/index.mdx': () =>
      import('../content/components/hooks-and-utils/useTheme/index.mdx?collection=docs'),
    'components/form/calendar/index.mdx': () =>
      import('../content/components/form/calendar/index.mdx?collection=docs'),
    'components/form/checkbox/index.mdx': () =>
      import('../content/components/form/checkbox/index.mdx?collection=docs'),
    'components/form/datefield/index.mdx': () =>
      import('../content/components/form/datefield/index.mdx?collection=docs'),
    'components/form/autocomplete/index.mdx': () =>
      import('../content/components/form/autocomplete/index.mdx?collection=docs'),
    'components/form/combobox/index.mdx': () =>
      import('../content/components/form/combobox/index.mdx?collection=docs'),
    'components/form/form/index.mdx': () =>
      import('../content/components/form/form/index.mdx?collection=docs'),
    'components/form/datepicker/index.mdx': () =>
      import('../content/components/form/datepicker/index.mdx?collection=docs'),
    'components/form/file-field/index.mdx': () =>
      import('../content/components/form/file-field/index.mdx?collection=docs'),
    'components/form/multiselect/index.mdx': () =>
      import('../content/components/form/multiselect/index.mdx?collection=docs'),
    'components/form/radio/index.mdx': () =>
      import('../content/components/form/radio/index.mdx?collection=docs'),
    'components/form/number-field/index.mdx': () =>
      import('../content/components/form/number-field/index.mdx?collection=docs'),
    'components/form/search-field/index.mdx': () =>
      import('../content/components/form/search-field/index.mdx?collection=docs'),
    'components/form/select/index.mdx': () =>
      import('../content/components/form/select/index.mdx?collection=docs'),
    'components/form/slider/index.mdx': () =>
      import('../content/components/form/slider/index.mdx?collection=docs'),
    'components/form/textarea/index.mdx': () =>
      import('../content/components/form/textarea/index.mdx?collection=docs'),
    'components/form/switch/index.mdx': () =>
      import('../content/components/form/switch/index.mdx?collection=docs'),
    'components/form/tag-field/index.mdx': () =>
      import('../content/components/form/tag-field/index.mdx?collection=docs'),
    'components/form/textfield/index.mdx': () =>
      import('../content/components/form/textfield/index.mdx?collection=docs'),
    'components/form/timefield/index.mdx': () =>
      import('../content/components/form/timefield/index.mdx?collection=docs'),
    'components/navigation/accordion/index.mdx': () =>
      import('../content/components/navigation/accordion/index.mdx?collection=docs'),
    'components/navigation/pagination/index.mdx': () =>
      import('../content/components/navigation/pagination/index.mdx?collection=docs'),
    'components/navigation/sidebar/index.mdx': () =>
      import('../content/components/navigation/sidebar/index.mdx?collection=docs'),
    'components/navigation/breadcrumbs/index.mdx': () =>
      import('../content/components/navigation/breadcrumbs/index.mdx?collection=docs'),
    'components/navigation/topnavigation/index.mdx': () =>
      import('../content/components/navigation/topnavigation/index.mdx?collection=docs'),
    'components/navigation/tabs/index.mdx': () =>
      import('../content/components/navigation/tabs/index.mdx?collection=docs'),
    'components/layout/app-layout/index.mdx': () =>
      import('../content/components/layout/app-layout/index.mdx?collection=docs'),
    'components/layout/aside/index.mdx': () =>
      import('../content/components/layout/aside/index.mdx?collection=docs'),
    'components/layout/aspect/index.mdx': () =>
      import('../content/components/layout/aspect/index.mdx?collection=docs'),
    'components/layout/center/index.mdx': () =>
      import('../content/components/layout/center/index.mdx?collection=docs'),
    'components/layout/columns/index.mdx': () =>
      import('../content/components/layout/columns/index.mdx?collection=docs'),
    'components/layout/breakout/index.mdx': () =>
      import('../content/components/layout/breakout/index.mdx?collection=docs'),
    'components/layout/container/index.mdx': () =>
      import('../content/components/layout/container/index.mdx?collection=docs'),
    'components/layout/grid/index.mdx': () =>
      import('../content/components/layout/grid/index.mdx?collection=docs'),
    'components/layout/inline/index.mdx': () =>
      import('../content/components/layout/inline/index.mdx?collection=docs'),
    'components/layout/scrollable/index.mdx': () =>
      import('../content/components/layout/scrollable/index.mdx?collection=docs'),
    'components/layout/inset/index.mdx': () =>
      import('../content/components/layout/inset/index.mdx?collection=docs'),
    'components/layout/split/index.mdx': () =>
      import('../content/components/layout/split/index.mdx?collection=docs'),
    'components/layout/stack/index.mdx': () =>
      import('../content/components/layout/stack/index.mdx?collection=docs'),
    'components/layout/tiles/index.mdx': () =>
      import('../content/components/layout/tiles/index.mdx?collection=docs'),
    'components/overlay/drawer/index.mdx': () =>
      import('../content/components/overlay/drawer/index.mdx?collection=docs'),
    'components/overlay/contextual-help/index.mdx': () =>
      import('../content/components/overlay/contextual-help/index.mdx?collection=docs'),
    'components/overlay/dialog/index.mdx': () =>
      import('../content/components/overlay/dialog/index.mdx?collection=docs'),
    'components/overlay/toast/index.mdx': () =>
      import('../content/components/overlay/toast/index.mdx?collection=docs'),
    'components/overlay/menu/index.mdx': () =>
      import('../content/components/overlay/menu/index.mdx?collection=docs'),
    'components/overlay/tooltip/index.mdx': () =>
      import('../content/components/overlay/tooltip/index.mdx?collection=docs'),
    'releases/config/tsconfig/release.mdx': () =>
      import('../content/releases/config/tsconfig/release.mdx?collection=docs'),
    'releases/config/prettier/release.mdx': () =>
      import('../content/releases/config/prettier/release.mdx?collection=docs'),
    'releases/themes/theme-docs/release.mdx': () =>
      import('../content/releases/themes/theme-docs/release.mdx?collection=docs'),
    'releases/themes/theme-rui/release.mdx': () =>
      import('../content/releases/themes/theme-rui/release.mdx?collection=docs'),
    'releases/config/eslint/release.mdx': () =>
      import('../content/releases/config/eslint/release.mdx?collection=docs'),
    'releases/packages/icons/release.mdx': () =>
      import('../content/releases/packages/icons/release.mdx?collection=docs'),
    'releases/packages/components/release.mdx': () =>
      import('../content/releases/packages/components/release.mdx?collection=docs'),
    'releases/packages/system/release.mdx': () =>
      import('../content/releases/packages/system/release.mdx?collection=docs'),
    'releases/packages/types/release.mdx': () =>
      import('../content/releases/packages/types/release.mdx?collection=docs'),
  }),
};
export default browserCollections;
