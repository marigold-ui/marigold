/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { useStyles } from '@marigold/system';

import { createStyleTag, createStyleTagString } from './createStyleTag';

// Setup
// ---------------
const Box: React.FC<{ css: any }> = ({ css, children }) => {
  const className = useStyles({ css });
  return <div className={className}>{children}</div>;
};

const setup = () => {
  const app = (
    <div>
      <Box css={{ color: 'blue', textDecoration: 'underline' }}>Box!</Box>
    </div>
  );

  return { app };
};

test('create a <style> tag, which can be added to the head for client hydration', () => {
  const { app } = setup();
  const Style = createStyleTag(renderToString(app));

  const head = <Style />;
  const result = renderToString(head);

  expect(result).toMatch(/^<style/);
  expect(result).toMatch('data-emotion');
});

test('create a <style> tag as string, which can be added to the head for client hydration', () => {
  const { app } = setup();
  const style = createStyleTagString(renderToString(app));

  expect(style).toMatch(/^<style/);
  expect(style).toMatch('data-emotion');
});
