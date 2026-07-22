import type { AriaRole, ReactNode, Ref } from 'react';
import { useMemo } from 'react';
import { HeadingContext } from 'react-aria-components/Heading';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useClassNames } from '@marigold/system';
import { ButtonContext, RESET_BUTTON_CONTEXT } from '../Button/Context';
import { Description } from '../Description/Description';
import { Title } from '../Title/Title';

// Props
// ---------------
export interface ErrorStateProps {
  /**
   * Title of the error state. Rendered inside a heading element, so pass
   * inline content (not another heading).
   */
  title: ReactNode;
  /**
   * Description text for the error state. Explain what went wrong and what
   * the user can do about it. No apologies, no stack traces.
   */
  description?: ReactNode;
  /**
   * Optional action element, typically a retry button wired to the host
   * error boundary's reset, or an escape route for non-transient failures.
   */
  action?: ReactNode;
  /**
   * Heading level of the title (h2 to h6). Adjust it so the title fits into
   * the surrounding document outline.
   * @default 3
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /**
   * ARIA role of the container. Set `role="alert"` at region tier so the
   * failure is announced without moving focus.
   */
  role?: AriaRole;
  /**
   * Tab index of the container. A page-tier error boundary fallback sets
   * `tabIndex={-1}` and moves focus here on mount; the component itself
   * never manages focus.
   */
  tabIndex?: number;
  ref?: Ref<HTMLDivElement>;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const ErrorState = ({
  title,
  description,
  action,
  headingLevel = 3,
  variant,
  size,
  ...props
}: ErrorStateProps) => {
  const classNames = useClassNames({ component: 'ErrorState', variant, size });

  // Internal use of the slot-configuration vocabulary: the title renders as
  // a semantic heading through the `<Title>` primitive, the description
  // through `<Description>`. `elementType: 'div'` keeps the description's
  // DOM identical to `EmptyState` (`description` is a `ReactNode` and may
  // contain block-level elements).
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: classNames.title,
          level: headingLevel,
        },
      },
    }),
    [classNames.title, headingLevel]
  );

  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: classNames.description,
          elementType: 'div' as const,
        },
      },
    }),
    [classNames.description]
  );

  return (
    <div className={classNames.container} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="151"
        height="84"
        viewBox="0 0 151 84"
        fill="none"
        className="mb-6"
        data-testid="error-state-illustration"
        aria-hidden="true"
      >
        <ellipse cx="75.5" cy="70.8" rx="75.5" ry="13.16" fill="#EDECEC" />
        <rect
          x="36.25"
          y="9.25"
          width="78.5"
          height="53.5"
          rx="4"
          fill="#F7F7F7"
          stroke="#C8C8C8"
          strokeWidth="2.5"
        />
        <path d="M36.25 21h78.5" stroke="#C8C8C8" strokeWidth="2.5" />
        <circle cx="43" cy="15" r="1.75" fill="#C8C8C8" />
        <circle cx="49.5" cy="15" r="1.75" fill="#C8C8C8" />
        <path
          d="M75.5 29 89 52.5H62L75.5 29Z"
          fill="white"
          stroke="#C8C8C8"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M75.5 37.5v7"
          stroke="#C8C8C8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="75.5" cy="48.75" r="1.5" fill="#C8C8C8" />
      </svg>
      <Provider
        values={[
          [HeadingContext, headingProps],
          [TextContext, textProps],
          // Scope the action(s) to a clean baseline so they never inherit a
          // surrounding container's button cascade. The `action` wrapper keeps
          // owning placement (it positions any `ReactNode`, not just buttons).
          [ButtonContext, RESET_BUTTON_CONTEXT],
        ]}
      >
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        {action && <div className={classNames.action}>{action}</div>}
      </Provider>
    </div>
  );
};
