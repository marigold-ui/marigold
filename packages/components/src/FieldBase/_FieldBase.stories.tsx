import type { Meta, StoryObj } from '@storybook/react';
import React, { type ReactNode } from 'react';
import {
  Input,
  Text,
  TextField,
  type TextFieldProps,
} from 'react-aria-components';

import {
  SVG,
  WidthProp,
  cn,
  width as twWidth,
  useClassNames,
} from '@marigold/system';

import { Label } from '../Label';
import { FieldBase } from './_FieldBase';

const meta = {
  title: 'Components/RAC-FieldBase',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The Label',
      defaultValue: 'This is the label',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the field is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'The error message',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
    isInvalid: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    errorMessage: 'Something went wrong',
    description: 'This is a help text description',
  },
} satisfies Meta<typeof FieldBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <MyTextField {...args} />,
};

interface MyTextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
}

interface UseFieldLayoutProps extends WidthProp {
  variant?: string;
  size?: string;
}

const useFieldLayout = ({
  variant,
  size,
  width = 'full',
}: UseFieldLayoutProps) => {
  const classNames = useClassNames({
    component: 'Field',
    variant,
    size,
  });

  return cn('group/field', twWidth[width], classNames);
};

export interface HelpTextProps {
  variant?: string;
  size?: string;
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
}

const HelpText = ({
  variant,
  size,
  description,
  error,
  errorMessage,
}: HelpTextProps) => {
  if (!description && !errorMessage) {
    return null;
  }

  const hasErrorMessage = errorMessage && error;
  const classNames = useClassNames({
    component: 'HelpText',
    variant,
    size,
  });

  return (
    <Text
      slot={hasErrorMessage ? 'errorMessage' : 'description'}
      className={cn('flex items-center gap-1', classNames.container)}
    >
      {hasErrorMessage ? (
        <>
          <SVG
            className={cn('h-4 w-4', classNames.icon)}
            viewBox="0 0 24 24"
            role="presentation"
          >
            <path d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z" />
          </SVG>

          {errorMessage}
        </>
      ) : (
        <>{description}</>
      )}
    </Text>
  );
};

function MyTextField(props: MyTextFieldProps & UseFieldLayoutProps) {
  return (
    <FieldBase as={TextField} {...props} isInvalid={true}>
      <Input className="border" />
    </FieldBase>
  );
}
