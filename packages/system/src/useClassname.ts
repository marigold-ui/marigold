import { css as emotion } from '@emotion/css';
import { StyleObject } from './types';
import { useTheme } from './useTheme';

// 🤫 https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
// lodash.isEmpty is tooo much KBs!
const isEmpty = (val: any) =>
  val && Object.keys(val).length === 0 && val.constructor === Object;

export const useClassname = (...styles: StyleObject[]) => {
  const { css } = useTheme();
  return styles
    .map(style => {
      /**
       * emotion will create a `css-0` class whenever an empty object is
       * passed. Since this makes debugging harder we'll do not pass empty
       * objects to emotion.
       */
      const themedStyle = css(style);
      return isEmpty(themedStyle) ? '' : emotion(themedStyle);
    })
    .join(' ');
};
