import { AriaCheckboxProps } from '@react-types/checkbox';

// Define the interface for the props to map
export interface MapCheckboxProps {
  checkboxProps: AriaCheckboxProps;
}

// Define the interface for the mapped checkbox props
interface MappedCheckboxProps {
  checkboxProps: {
    disabled?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    // Include any other properties from AriaCheckboxProps as needed
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
