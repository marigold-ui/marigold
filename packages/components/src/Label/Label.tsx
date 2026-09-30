import type RAC from 'react-aria-components';
import { Label } from 'react-aria-components/Label';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';
export interface LabelProps extends Omit<RAC.LabelProps, RemovedProps> {
  size?: string;
  variant?: string;
}

const _Label = ({ size, variant, children, ...props }: LabelProps) => {
  const className = useClassNames({ component: 'Label', size, variant });

  return (
    <Label
      {...props}
      // `wrap-anywhere`: an unbreakable label would otherwise set the field's
      // min-content width and overflow the container. Not themeable on purpose.
      // It also drops the label's min-content width to a single character, so a
      // `Label` in a flex row short on space wraps instead of holding its
      // longest word.
      //
      // `hyphens-auto` breaks at a syllable and adds a hyphen before
      // `wrap-anywhere` cuts mid-word, but only when the page's `lang` matches
      // the text's language. Our docs and Storybook are both `lang="en"`, so a
      // German compound falls straight through to `wrap-anywhere` there. It
      // pays off in a consumer app that sets its own `lang`.
      className={cn(
        className,
        'in-field:mb-1.5 inline-flex wrap-anywhere hyphens-auto'
      )}
    >
      {children}
    </Label>
  );
};

export { _Label as Label };
