import {
  ReactNode,
  ReactChild,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import { isFragment } from 'react-is';

/**
 * Similar to [React's built-in `Children.toArray` method](https://reactjs.org/docs/react-api.html#reactchildrentoarray),
 * this utility takes children and returns them as an array for introspection or filtering.
 *
 * Different from `Children.toArray`, it will flatten arrays and `React.Fragment`s into a regular, one-dimensional
 * array while ensuring element and fragment keys are preserved, unique, and stable between renders.
 *
 * Copied from https://github.com/grrowl/react-keyed-flatten-children (since ESM import doesn't work with the module)
 */
export const flattenChildren = (
  children: ReactNode,
  depth: number = 0,
  keys: (string | number)[] = []
): ReactChild[] =>
  Children.toArray(children).reduce((acc: ReactChild[], node, nodeIndex) => {
    if (isFragment(node)) {
      acc.push.apply(
        acc,
        flattenChildren(
          node.props.children,
          depth + 1,
          keys.concat(node.key || nodeIndex)
        )
      );
    } else {
      if (isValidElement(node)) {
        acc.push(
          cloneElement(node, {
            key: keys.concat(String(node.key)).join('.'),
          })
        );
      } else if (typeof node === 'string' || typeof node === 'number') {
        acc.push(node);
      }
    }
    return acc;
  }, []);
