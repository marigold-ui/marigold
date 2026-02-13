export const REMOVE_COMPONENTS = new Set([
  'Image',
  'ImageZoom',
  'TeaserCard',
  'StorybookHintMessage',
  'Toc',
  'Logo',
  'FullsizeView',
  'CopyButton',
  'LatestPost',
  'PostList',
  'iframe',
  'p',
  'svg',
]);

export const UNWRAP_COMPONENTS = new Set([
  'GuidelineTiles',
  'Stack',
  'Inline',
  'Center',
  'Columns',
  'Tiles',
  'Scrollable',
  'Inset',
  'Split',
  'div',
  'ul',
  'li',
]);

export const VARIANT_EMOJI: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
};

export const UNWRAP_SUB_COMPONENTS = new Set([
  'Do.Description',
  'Dont.Description',
  'SectionMessage.Content',
  'DoDescription',
  'DontDescription',
]);

export const REMOVE_SUB_COMPONENTS = new Set([
  'Do.Figure',
  'Dont.Figure',
  'DoFigure',
  'DontFigure',
]);

export const HTML_TABLE_ELEMENTS = new Set([
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
]);
