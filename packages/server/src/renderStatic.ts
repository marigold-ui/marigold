import { cache } from '@marigold/system';
import createEmotionServer from '@emotion/server/create-instance';

const key = cache.key;

export const renderStatic = (html: string) => {
  const { extractCritical } = createEmotionServer(cache);
  const { ids, css } = extractCritical(html);
  return { ids, css, html, key };
};
