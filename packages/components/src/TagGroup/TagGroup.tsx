import React, { useRef } from 'react';
import { useTagGroup, AriaTagGroupProps } from '@react-aria/tag';
import { useListState } from '@react-stately/list';
import { LabelableProps, HelpTextProps } from '@react-types/shared';

import { Box, useStateProps } from '@marigold/system';
import { FieldBase } from '../FieldBase';
import { Tag } from './Tag';

// Props
// ---------------
export interface TagGroupProps
  extends Omit<AriaTagGroupProps<object>, 'isRequired' | 'validationState'>,
    LabelableProps,
    HelpTextProps {
  width?: string;
  required?: boolean;
  error?: boolean;
}

// Component
// ---------------
export const TagGroup = ({
  width,
  required,
  error,
  ...rest
}: TagGroupProps) => {
  const props: AriaTagGroupProps<object> = {
    isRequired: required,
    validationState: error ? 'invalid' : 'valid',
    ...rest,
  };

  const inputRef = useRef(null);

  const state = useListState(props);

  const { gridProps, labelProps, descriptionProps, errorMessageProps } =
    useTagGroup(props, state, inputRef);

  const stateProps = useStateProps({
    error,
  });

  return (
    <div ref={inputRef}>
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
        required={required}
        {...gridProps}
      >
        <Box
          role="presentation"
          __baseCSS={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
          }}
        >
          {[...state.collection].map(item => (
            <Tag
              {...item.props}
              key={item.key}
              item={item}
              state={state}
              allowsRemoving={props.allowsRemoving}
              onRemove={props.onRemove}
            >
              {item.rendered}
            </Tag>
          ))}
        </Box>
      </FieldBase>
    </div>
  );
};
