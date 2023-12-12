import { AriaCheckboxProps } from '@react-types/checkbox';

export interface MapCheckboxProps {
  checkboxProps: AriaCheckboxProps;
}

/**
 * Map `react-aria` props to ours (no "is"-prefix)
 */
export const mapCheckboxProps = ({
  checkboxProps: {
    isIndeterminate,
    isSelected,
    isDisabled,
    defaultSelected,
    ...rest
  },
}: MapCheckboxProps) => {
  const checkboxProps = {
    disabled: isDisabled,
    checked: isSelected,
    defaultChecked: defaultSelected,
    indeterminate: isIndeterminate,
    ...rest,
  } as const;

  return { checkboxProps };
};
