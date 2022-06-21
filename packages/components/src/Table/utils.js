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
}) => {
  const checkboxProps = {
    disabled: isDisabled,
    checked: isSelected,
    defaultChecked: defaultSelected,
    indeterminate: isIndeterminate,
    ...rest,
  };
  return { checkboxProps };
};
//# sourceMappingURL=utils.js.map
