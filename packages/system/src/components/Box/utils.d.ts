import { StyleObject } from '../../types';
/**
 * Transform a states (hover, focus, ...) in a StyleObject to
 * our format (pseudo selector plus corresponding data-attribute).
 *
 * We stole this idea from https://chakra-ui.com/.
 */
export declare const transformPseudos: (
  styles: StyleObject
) => import('@theme-ui/css').ThemeUICSSObject;
//# sourceMappingURL=utils.d.ts.map
