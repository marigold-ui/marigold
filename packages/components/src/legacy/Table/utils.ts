import { AriaCheckboxProps } from '@react-types/checkbox';

export interface MapCheckboxProps {
  checkboxProps: AriaCheckboxProps;
}

interface MappedCheckboxProps {
  checkboxProps: {
    disabled?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
  };
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
}: MapCheckboxProps): MappedCheckboxProps => {
  const checkboxProps = {
    disabled: isDisabled,
    checked: isSelected,
    defaultChecked: defaultSelected,
    indeterminate: isIndeterminate,
    ...rest,
  } as const;

  return { checkboxProps };
};
