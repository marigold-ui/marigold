import { forwardRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTextField } from '@react-aria/textfield';
import { useObjectRef } from '@react-aria/utils';

import { AriaTextFieldProps } from '@react-types/textfield';

import { WidthProp, useClassNames, useStateProps } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { FieldBase, FieldBaseProps } from '../FieldBase';

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for the above events.
 * Thus, we adjust our regular props to match them.
 */
export type CustomTextAreaEvents =
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onCopy'
  | 'onSelect'
  | 'onPaste'
  | 'onCut'
  | 'onCompositionStart'
  | 'onCompositionUpdate'
  | 'onCompositionEnd'
  | 'onBeforeInput'
  | 'onInput'
  | 'onKeyDown'
  | 'onKeyUp';

export interface TextAreaProps
  extends Omit<
      HtmlProps<'textarea'>,
      'value' | 'defaultValue' | 'size' | CustomTextAreaEvents | 'className'
    >,
    Pick<AriaTextFieldProps, CustomTextAreaEvents>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  value?: string;
  defaultValue?: string;
}

// Component
// ---------------
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant,
      size,
      width,
      disabled,
      required,
      readOnly,
      error,
      rows,
      ...props
    },
    ref
  ) => {
    const { label, description, errorMessage } = props;
    const textAreaRef = useObjectRef(ref);

    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField(
        {
          inputElementType: 'textarea',
          isDisabled: disabled,
          isRequired: required,
          isReadOnly: readOnly,
          validationState: error ? 'invalid' : 'valid',
          ...props,
        },
        textAreaRef
      );

    const { hoverProps, isHovered } = useHover({});
    const { focusProps, isFocusVisible } = useFocusRing();
    const stateProps = useStateProps({
      hover: isHovered,
      focus: isFocusVisible,
      disabled,
      readOnly,
      required,
      error,
    });

    const classNames = useClassNames({ component: 'TextArea', variant, size });
    return (
      <FieldBase
        label={label}
        labelProps={labelProps}
        description={description}
        descriptionProps={descriptionProps}
        error={error}
        errorMessage={errorMessage}
        errorMessageProps={errorMessageProps}
        stateProps={stateProps}
        variant={variant}
        size={size}
        width={width}
      >
        <textarea
          className={classNames}
          ref={textAreaRef}
          rows={rows}
          {...inputProps}
          {...focusProps}
          {...hoverProps}
        />
      </FieldBase>
    );
  }
);
