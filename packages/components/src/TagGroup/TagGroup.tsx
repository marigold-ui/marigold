import React, { useRef } from 'react';
import { useTagGroup, AriaTagGroupProps } from '@react-aria/tag';
import { useListState } from '@react-stately/list';
import { LabelableProps, HelpTextProps } from '@react-types/shared';

import { WidthProp, useStateProps } from '@marigold/system';
import { FieldBase } from '../FieldBase';
import { Tag } from './Tag';

// Props
// ---------------
export interface TagGroupProps
  extends Omit<AriaTagGroupProps<object>, 'isRequired' | 'validationState'>,
    LabelableProps,
    HelpTextProps {
  width?: WidthProp['width'];
  required?: boolean;
  error?: boolean;
  allowsRemoving?: boolean;
}

// Component
// ---------------
export const TagGroup = ({
  width,
  required,
  error,
  allowsRemoving,
  ...rest
}: TagGroupProps) => {
  const props = {
    isRequired: required,
    validationState: error ? 'invalid' : 'valid',
    ...rest,
  } as const;

  const inputRef = useRef(null);

  const state = useListState(props);

  const { gridProps, labelProps, descriptionProps, errorMessageProps } =
    useTagGroup(props, state, inputRef);

  const stateProps = useStateProps({
    error,
    required,
  });

  return (
    <FieldBase
      width={width}
      label={props.label}
      labelProps={labelProps}
      description={props.description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={props.errorMessage}
      errorMessageProps={errorMessageProps}
      stateProps={stateProps}
      {...gridProps}
    >
      <div
        role="presentation"
        ref={inputRef}
        className="flex flex-wrap items-start gap-1"
      >
        {[...state.collection].map(item => (
          <Tag
            {...item.props}
            key={item.key}
            item={item}
            state={state}
            allowsRemoving={allowsRemoving}
            onRemove={props.onRemove}
          >
            {item.rendered}
          </Tag>
        ))}
      </div>
    </FieldBase>
  );
};
