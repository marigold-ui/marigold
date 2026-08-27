import type { Key, ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import { Button } from 'react-aria-components/Button';
import { Link } from 'react-aria-components/Link';
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useControlledState } from '@react-stately/utils';
import { useClassNames } from '@marigold/system';
import { Check } from '../icons/Check';
import { TriangleAlert } from '../icons/TriangleAlert';
import { intlMessages } from '../intl/messages';
import { StepperItem, type StepperItemProps } from './StepperItem';

type StepState = 'completed' | 'current' | 'error' | 'disabled' | 'upcoming';

const STATE_MESSAGE: Record<StepState, string> = {
  completed: 'stepCompleted',
  current: 'stepCurrent',
  error: 'stepError',
  disabled: 'stepDisabled',
  upcoming: 'stepNotCompleted',
};

export interface StepperProps {
  /**
   * The steps, as `<Stepper.Item>` children. Order is JSX order.
   */
  children: ReactNode;

  /**
   * The step the user is on. (controlled)
   */
  selectedKey?: Key;

  /**
   * The step to start on. (uncontrolled)
   * @default the first item's id
   */
  defaultSelectedKey?: Key;

  /**
   * Handler that is called when the user activates a selectable step.
   */
  onSelectionChange?: (key: Key) => void;

  /**
   * The steps that are done. A set, not a high-water mark, so non-contiguous
   * completion is expressible. Never inferred by the component.
   */
  completedKeys?: Iterable<Key>;

  /**
   * The steps that failed. Selectable by default, so the user can go back and
   * fix them, unless `selectableKeys` is given: that replaces the default rule
   * outright and an errored key left out of it is no longer reachable.
   */
  errorKeys?: Iterable<Key>;

  /**
   * The steps that are unavailable. Never selectable, whatever else says.
   */
  disabledKeys?: Iterable<Key>;

  /**
   * The steps the user may jump to. Replaces the default rule
   * (`completedKeys` + `errorKeys` + the selected step) entirely.
   */
  selectableKeys?: Iterable<Key>;

  /**
   * Renders markers only, keeping the labels for screen readers. Use it when
   * there are too many steps for labels to fit.
   * @default false
   */
  hideLabels?: boolean;

  /**
   * Selects a themed appearance.
   * @default 'default'
   */
  variant?: 'default' | (string & {});

  /**
   * Selects a themed size.
   * @default 'default'
   */
  size?: 'default' | (string & {});

  /**
   * Labels the navigation landmark.
   * @default a localized "Progress"
   */
  'aria-label'?: string;
}

interface StepContentProps {
  className?: string;
  isCurrent: boolean;
  isSelectable: boolean;
  href?: string;
  onSelect: () => void;
  children: ReactNode;
}

const StepContent = ({
  className,
  isCurrent,
  isSelectable,
  href,
  onSelect,
  children,
}: StepContentProps) => {
  const ariaCurrent = isCurrent ? ('step' as const) : undefined;

  if (!isSelectable) {
    return (
      <span className={className} aria-current={ariaCurrent}>
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        aria-current={ariaCurrent}
        onPress={onSelect}
      >
        {children}
      </Link>
    );
  }

  return (
    <Button className={className} aria-current={ariaCurrent} onPress={onSelect}>
      {children}
    </Button>
  );
};

const _Stepper = ({
  children,
  selectedKey: selectedKeyProp,
  defaultSelectedKey,
  onSelectionChange,
  completedKeys,
  errorKeys,
  disabledKeys,
  selectableKeys,
  hideLabels,
  variant,
  size,
  'aria-label': ariaLabel,
}: StepperProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({ component: 'Stepper', variant, size });

  const items = Children.toArray(children).filter(
    (child): child is ReactElement<StepperItemProps> =>
      isValidElement(child) && child.type === StepperItem
  );

  const [selectedKey, setSelectedKey] = useControlledState(
    selectedKeyProp,
    defaultSelectedKey ?? items[0]?.props.id,
    onSelectionChange
  );

  const completed = new Set(completedKeys);
  const errors = new Set(errorKeys);
  const disabled = new Set(disabledKeys);
  const selectable = selectableKeys ? new Set(selectableKeys) : undefined;

  const getState = (key: Key): StepState => {
    if (disabled.has(key)) return 'disabled';
    if (errors.has(key)) return 'error';
    if (key === selectedKey) return 'current';
    if (completed.has(key)) return 'completed';
    return 'upcoming';
  };

  const isSelectable = (key: Key) => {
    const state = getState(key);
    if (state === 'disabled') return false;
    if (selectable) return selectable.has(key);
    return state !== 'upcoming';
  };

  const currentIndex = items.findIndex(item => item.props.id === selectedKey);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={ariaLabel ?? stringFormatter.format('progress')}
      className="flex items-center gap-3"
    >
      {hideLabels && currentIndex >= 0 && (
        <span aria-hidden="true" className={classNames.count}>
          {stringFormatter.format('stepPosition', {
            current: currentIndex + 1,
            total: items.length,
          })}
        </span>
      )}
      <ol role="list" className={classNames.container}>
        {items.map((item, index) => {
          const { id, children: label, href } = item.props;
          const state = getState(id);
          const position = stringFormatter.format('stepPosition', {
            current: index + 1,
            total: items.length,
          });
          const stateText = stringFormatter.format(STATE_MESSAGE[state]);

          return (
            <li
              key={id}
              className={classNames.item}
              data-state={state}
              data-current={id === selectedKey || undefined}
              data-completed={completed.has(id) || undefined}
            >
              <StepContent
                className={classNames.link}
                isCurrent={id === selectedKey}
                isSelectable={isSelectable(id)}
                href={href}
                onSelect={() => setSelectedKey(id)}
              >
                <span aria-hidden="true" className={classNames.marker}>
                  {state === 'completed' ? (
                    <Check />
                  ) : state === 'error' ? (
                    <TriangleAlert />
                  ) : (
                    index + 1
                  )}
                </span>
                {hideLabels ? (
                  <VisuallyHidden elementType="span">{label}</VisuallyHidden>
                ) : (
                  <span className={classNames.label}>{label}</span>
                )}
                <VisuallyHidden elementType="span">
                  {`${position}, ${stateText}`}
                </VisuallyHidden>
              </StepContent>
              {index < items.length - 1 && (
                <span
                  aria-hidden="true"
                  data-testid="stepper-connector"
                  className={classNames.connector}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

_Stepper.Item = StepperItem;

export { _Stepper as Stepper };
