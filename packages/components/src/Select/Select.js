import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { useMessageFormatter } from '@react-aria/i18n';
import { DismissButton, useOverlayPosition } from '@react-aria/overlays';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { useSelectState } from '@react-stately/select';
import { Item, Section } from '@react-stately/collections';
import { mergeProps } from '@react-aria/utils';
import { Box, useComponentStyles, useStateProps } from '@marigold/system';
import { FieldBase } from '../FieldBase';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { messages } from './intl';
const Chevron = ({ css }) =>
  React.createElement(
    Box,
    {
      as: 'svg',
      __baseCSS: { width: 16, height: 16 },
      css: css,
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      strokeWidth: 2,
    },
    React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      d: 'M19 9l-7 7-7-7',
    })
  );
// Component
// ---------------
export const Select = ({
  variant,
  size,
  width,
  open,
  disabled,
  required,
  error,
  ...rest
}) => {
  // Set up i18n
  const formatMessage = useMessageFormatter(messages);
  const props = {
    isOpen: open,
    isDisabled: disabled,
    isRequired: required,
    validationState: error ? 'invalid' : 'valid',
    placeholder: rest.placeholder || formatMessage('placeholder'),
    ...rest,
  };
  const state = useSelectState(props);
  const buttonRef = useRef(null);
  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
  } = useSelect(props, state, buttonRef);
  const { buttonProps } = useButton(
    { isDisabled: disabled, ...triggerProps },
    buttonRef
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const overlayRef = useRef(null);
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: buttonRef,
    overlayRef,
    isOpen: state.isOpen,
    placement: 'bottom left',
  });
  const styles = useComponentStyles(
    'Select',
    { variant, size },
    { parts: ['container', 'button', 'icon'] }
  );
  const stateProps = useStateProps({
    disabled,
    error,
    focusVisible: isFocusVisible,
    expanded: state.isOpen,
  });
  return React.createElement(
    FieldBase,
    {
      variant: variant,
      size: size,
      width: width,
      label: props.label,
      labelProps: { as: 'span', ...labelProps },
      description: props.description,
      descriptionProps: descriptionProps,
      error: error,
      errorMessage: props.errorMessage,
      errorMessageProps: errorMessageProps,
      stateProps: stateProps,
      disabled: disabled,
      required: required,
    },
    React.createElement(HiddenSelect, {
      state: state,
      triggerRef: buttonRef,
      label: props.label,
      name: props.name,
      isDisabled: disabled,
    }),
    React.createElement(
      Box,
      {
        as: 'button',
        __baseCSS: {
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        },
        css: styles.button,
        ref: buttonRef,
        ...mergeProps(buttonProps, focusProps),
        ...stateProps,
      },
      React.createElement(
        Box,
        {
          css: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          },
          ...valueProps,
        },
        state.selectedItem ? state.selectedItem.rendered : props.placeholder
      ),
      React.createElement(Chevron, { css: styles.icon })
    ),
    React.createElement(
      Popover,
      {
        open: state.isOpen,
        onClose: state.close,
        dismissable: true,
        shouldCloseOnBlur: true,
        minWidth: buttonRef.current ? buttonRef.current.offsetWidth : undefined,
        ref: overlayRef,
        ...positionProps,
      },
      React.createElement(
        FocusScope,
        { restoreFocus: true },
        React.createElement(DismissButton, { onDismiss: state.close }),
        React.createElement(ListBox, {
          state: state,
          variant: variant,
          size: size,
          ...menuProps,
        }),
        React.createElement(DismissButton, { onDismiss: state.close })
      )
    )
  );
};
Select.Option = Item;
Select.Section = Section;
//# sourceMappingURL=Select.js.map
