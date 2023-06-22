import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  argTypes: {
    contentType: {
      control: {
        type: 'select',
      },
      options: ['content', 'header'],
      description: 'choose between content and header',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      description: 'choose between small, medium and large size',
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
      description: 'set alignment the content inside the container',
    },
    alignItems: {
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right', 'none'],
      description: 'set alignment of the items inside the container',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Content: Story = {
  render: args => (
    <Container {...args}>
      <p>
        It is a dark time for the Rebellion. Although the Death Star has been
        destroyed, Imperial troops have driven the Rebel forces from their
        hidden base and pursued them across the galaxy. Evading the dreaded
        Imperial Starfleet, a group of freedom fighters led by Luke Skywalker
        has established a new secret base on the remote ice world of Hoth. The
        evil lord Darth Vader, obsessed with finding young Skywalker, has
        dispatched thousands of remote probes into the far reaches of space....
      </p>
    </Container>
  ),
};

export const Header: Story = {
  render: args => (
    <Container contentType="header" {...args}>
      <h1>Star Wars - The Empire Strikes Back</h1>
    </Container>
  ),
};

export const InnerContent: Story = {
  render: args => (
    <div className="bg-blue-100 p-1">
      <Container {...args}>
        <h2>Star Wars - The Empire Strikes Back</h2>
        <div className="w-full pt-1">
          <p>
            It is a dark time for the Rebellion. Although the Death Star has
            been destroyed, Imperial troops have driven the Rebel forces from
            their hidden base and pursued them across the galaxy. Evading the
            dreaded Imperial Starfleet, a group of freedom fighters led by Luke
            Skywalker has established a new secret base on the remote ice world
            of Hoth. The evil lord Darth Vader, obsessed with finding young
            Skywalker, has dispatched thousands of remote probes into the far
            reaches of space....
          </p>
        </div>
        <div className="width-[20ch]">
          <ul>
            <li>Luke</li>
            <li>Leia</li>
            <li>Han Solo</li>
            <li>Chewbacca</li>
            <li>R2D2</li>
            <li>C3PO</li>
            <li>Darth Vader</li>
          </ul>
        </div>
      </Container>
    </div>
  ),
};
