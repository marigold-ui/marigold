import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from 'react';
import { useTagGroup, AriaTagGroupProps } from '@react-aria/tag';
import { useListState } from '@react-stately/list';
import { LabelableProps, HelpTextProps } from '@react-types/shared';

import { Box, useStateProps } from '@marigold/system';
import { FieldBase } from '../FieldBase';
import { Tag } from './Tag';
import { useObjectRef } from '@react-aria/utils';

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
export const TagGroup = forwardRef<HTMLInputElement, TagGroupProps>(
  ({ width, required, error, ...rest }, ref) => {
    const props = {
      isRequired: required,
      validationState: error ? 'invalid' : 'valid',
      ...rest,
    } satisfies AriaTagGroupProps<object>;

    const inputRef = useObjectRef(ref);

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
          labelProps={{ as: 'span', ...labelProps }}
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
              flexDirection: 'column',
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
  }
) as TagGroupComponent;

TagGroup.Tag = Tag;

/**
 * We need this so that TypeScripts allows us to add
 * additional properties to the component (function).
 */
export interface TagGroupComponent
  extends ForwardRefExoticComponent<
    TagGroupProps & RefAttributes<HTMLInputElement>
  > {
  Tag: typeof Tag;
}
