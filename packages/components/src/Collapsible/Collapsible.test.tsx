import { composeStories } from '@storybook/testing-react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Collapsible } from './Collapsible';
import * as stories from './Collapsible.stories';

const { Default, WithContent, WithVariantAndSize } = composeStories(stories);

describe('Collapsible', () => {
  it('renders children', () => {
    render(
      <Collapsible>
        <span>Test Content</span>
      </Collapsible>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant and size classNames', () => {
    render(
      <Collapsible variant="primary" size="large">
        <span>Content</span>
      </Collapsible>
    );
    const container = screen.getByText('Content').closest('[class]');
    expect(container?.className).toMatch(/Collapsible/);
    expect(container?.className).toMatch(/primary/);
    expect(container?.className).toMatch(/large/);
  });

  it('renders Collapsible.Trigger and Collapsible.Content', () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Panel Content</Collapsible.Content>
      </Collapsible>
    );
    expect(screen.getByText('Toggle')).toBeInTheDocument();
    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('toggles content visibility when trigger is clicked', async () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Open</Collapsible.Trigger>
        <Collapsible.Content>Hidden Content</Collapsible.Content>
      </Collapsible>
    );
    const trigger = screen.getByText('Open');
    const content = screen.getByText('Hidden Content');
    expect(content).toHaveAttribute('hidden');
    fireEvent.click(trigger);
    expect(content).not.toHaveAttribute('hidden');
  });

  it('renders Default story', () => {
    render(<Default />);
    expect(screen.getByText(/trigger/i)).toBeInTheDocument();
  });

  it('renders WithContent story', () => {
    render(<WithContent />);
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('renders WithVariantAndSize story', () => {
    render(<WithVariantAndSize />);
    expect(screen.getByText(/trigger/i)).toBeInTheDocument();
  });
});
