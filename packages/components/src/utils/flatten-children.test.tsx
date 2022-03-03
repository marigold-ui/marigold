import React, { Fragment } from 'react';
import { isElement } from 'react-is';
import { render, screen } from '@testing-library/react';

import { flattenChildren } from './flatten-children';

const Assert: React.FC<{ spy: jest.Mock }> = ({ spy, children }) => {
  const result = flattenChildren(children);
  spy(result);
  return <div data-testid="assert">{result}</div>;
};

test('simple children', () => {
  const spy = jest.fn();
  render(
    <Assert spy={spy}>
      <span>one</span>
      two
      <span>three</span>
      10
    </Assert>
  );

  const result = spy.mock.calls[0][0];

  expect(result.length).toEqual(4);
  expect(isElement(result[0]) && result[0].key).toEqual('.0');
  expect(result[1]).toEqual('two');
  expect(isElement(result[2]) && result[2].key).toEqual('.2');
  expect(result[3]).toEqual('10');
});

test('conditional children', () => {
  const spy = jest.fn();
  render(
    <Assert spy={spy}>
      <span>one</span>
      {false}
      <span>three</span>
      {null}
      <span>five</span>
    </Assert>
  );

  const result = spy.mock.calls[0][0];

  expect(result.length).toEqual(3);

  expect(isElement(result[0]) && result[0].key).toEqual('.0');
  expect(isElement(result[1]) && result[1].key).toEqual('.2');
  expect(isElement(result[2]) && result[2].key).toEqual('.4');
});

test('keyed children', () => {
  const spy = jest.fn();
  render(
    <Assert spy={spy}>
      <span key="one">one</span>
      <span key="two">two</span>
      three
      <span key="four">four</span>
      <span>five</span>
    </Assert>
  );

  const result = spy.mock.calls[0][0];

  expect(result.length).toEqual(5);
  expect(result.map((c: any) => c.key)).toMatchInlineSnapshot(`
    [
      ".$one",
      ".$two",
      undefined,
      ".$four",
      ".4",
    ]
  `);
});

test('fragment children', () => {
  const spy = jest.fn();
  render(
    <Assert spy={spy}>
      <>
        <span key="one">one</span>
        <span key="two">two</span>
      </>
      <>
        <span key="three">three</span>
      </>
    </Assert>
  );

  const result = spy.mock.calls[0][0];

  expect(result.length).toEqual(3);
  expect(result.map((c: any) => c.key)).toMatchInlineSnapshot(`
    [
      ".0..$one",
      ".0..$two",
      ".1..$three",
    ]
  `);
});

test('keyed fragment children', () => {
  const spy = jest.fn();
  render(
    <Assert spy={spy}>
      <Fragment key="apple">
        <span key="one">one</span>
        <span key="two">two</span>
      </Fragment>
      <Fragment key="banana">
        <span key="three">three</span>
      </Fragment>
    </Assert>
  );

  const result = spy.mock.calls[0][0];

  expect(result.length).toEqual(3);
  expect(result.map((c: any) => c.key)).toMatchInlineSnapshot(`
    [
      ".$apple..$one",
      ".$apple..$two",
      ".$banana..$three",
    ]
  `);
});

test('array children', () => {
  const spy = jest.fn();
  render(
    <Assert spy={spy}>
      <span>one</span>
      {[
        'two',
        42,
        <span key="apple">three</span>,
        <span key="banana">four</span>,
      ]}
      <span>five</span>
    </Assert>
  );

  const result = spy.mock.calls[0][0];

  expect(result.length).toEqual(6);
  expect(result.map((c: any) => c.key)).toMatchInlineSnapshot(`
    [
      ".0",
      undefined,
      undefined,
      ".1:$apple",
      ".1:$banana",
      ".2",
    ]
  `);
});

test('renders correctly through react', () => {
  const spy = jest.fn();
  render(
    <Assert spy={spy}>
      <span>head</span>
      <Fragment key="apple">
        <span key="one">one</span>
        <span key="two">two</span>
      </Fragment>
      <span>body</span>
      {false}
      <Fragment key="banana">
        <span key="three">three</span>
      </Fragment>
      <span>foot</span>
    </Assert>
  );

  const result = spy.mock.calls[0][0];
  const element = screen.getByTestId('assert');

  expect(element.children.length).toEqual(6);
  expect(result.map((c: any) => c.key)).toMatchInlineSnapshot(`
    [
      ".0",
      ".$apple..$one",
      ".$apple..$two",
      ".2",
      ".$banana..$three",
      ".5",
    ]
  `);
  expect(element.innerHTML).toMatchInlineSnapshot(
    `"<span>head</span><span>one</span><span>two</span><span>body</span><span>three</span><span>foot</span>"`
  );
});
