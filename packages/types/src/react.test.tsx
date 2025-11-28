import { render, screen } from '@testing-library/react';
import {
  ComponentProps,
  ElementRef,
  MouseEvent,
  ReactNode,
  createElement,
  forwardRef,
} from 'react';
import { IntrinsicElement, OwnProps, PolymorphicComponent, PropsOf } from '.';

/**********************************************/
/*                                            */
/*                  BOX TEST                  */
/*                                            */
/**********************************************/

type BoxOwnProps = {
  children?: ReactNode;
};

export type BoxProps = PropsOf<typeof Box>;

export const props: BoxProps = {
  title: 'inherited from <div>',
  // @ts-expect-error
  foo: 'bar',
};

export const Box = forwardRef(({ as, children, ...props }, ref) => {
  return createElement(as || 'div', { ...props, ref }, children);
}) as PolymorphicComponent<'div', BoxOwnProps>;

export const SimpleBox = () => <Box>Hello</Box>;
// @ts-expect-error
export const NotAPropBox = () => <Box foo="bar">Hello</Box>;
export const HrefBox = () => <Box as="a" href="http://example.com"></Box>;
// @ts-expect-error
export const BrokenBox = () => <Box as="span" href="http://example.com"></Box>;
// @ts-expect-error
export const BoxHasNoClass = () => <Box className="foo">Hello</Box>;

/**********************************************/
/*                                            */
/*               TEST COMPONENTS              */
/*                                            */
/**********************************************/

type ButtonProps = {
  isDisabled?: boolean;
  another?: number;
};

const Button = forwardRef((props, forwardedRef) => {
  const { isDisabled, ...buttonProps } = props;
  return <Box as="button" {...buttonProps} ref={forwardedRef} />;
}) as PolymorphicComponent<'button', OwnProps<typeof Box> & ButtonProps>;

const ExtendedButtonUsingReactUtils = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button>
>((props, forwardedRef) => {
  return <Button {...props} ref={forwardedRef} />;
});

// Inline component
export const ExtendedButtonUsingReactUtilsWithInternalInlineAs = (
  props: ComponentProps<typeof Button>
) => {
  /* Should not error with inline `as` component */
  return <Button as={props => <button {...props} />} {...props} />;
};

type ExtendedButtonProps = {
  isExtended?: boolean;
};

type ExtendedButtonButtonOwnProps = Omit<
  OwnProps<typeof Button>,
  keyof ExtendedButtonProps | 'another'
>;

const ExtendedButton = forwardRef((props, forwardedRef) => {
  const { isExtended, ...extendedButtonProps } = props;
  return <Button {...extendedButtonProps} ref={forwardedRef} />;
}) as PolymorphicComponent<
  IntrinsicElement<typeof Button>,
  ExtendedButtonProps & ExtendedButtonButtonOwnProps
>;

type LinkProps = ComponentProps<'a'> & {
  isPrimary?: boolean;
  onToggle?(open: boolean): void;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { children, isPrimary, ...linkProps } = props;
  return (
    <a className={isPrimary ? 'primary' : undefined} ref={ref} {...linkProps}>
      {children}
    </a>
  );
});

type AnchorProps = {
  requiredProp: boolean;
};

export const Anchor = forwardRef((props, forwardedRef) => {
  const { as: Comp = 'a', requiredProp, ...anchorProps } = props;
  /* Does not expect requiredProp */
  return <Comp {...anchorProps} ref={forwardedRef} />;
}) as PolymorphicComponent<'a', AnchorProps>;

/**********************************************/
/*                                            */
/*               USE CASE TESTS               */
/*                                            */
/**********************************************/
export const Test = () => (
  <div data-testid="test-wrapper">
    {/* Link accepts onToggle prop */}
    <Link onToggle={open => console.log(open)} />

    {/* Link accepts isPrimary prop */}
    <Link isPrimary />

    {/* Button does not accept href prop */}
    {/* @ts-expect-error */}
    <Button href="#" />

    {/* Button accepts form prop */}
    <Button form="form" />

    {/* Button accepts isDisabled prop */}
    <Button isDisabled />

    {/* Button as "a" accepts href prop */}
    <Button as="a" href="#" />

    {/* Button as "a" does not accept form prop */}
    {/* @ts-expect-error */}
    <Button as="a" form="form" />

    {/* Button as Link accepts href prop */}
    <Button as={Link} href="#" />

    {/* Button as Link accepts isPrimary prop */}
    <Button as={Link} isPrimary />

    {/* Button as Link accepts isDisabled prop */}
    <Button as={Link} />

    {/* Button as Link does not accept form prop */}
    {/* @ts-expect-error */}
    <Button as={Link} form="form" />

    {/* Button accepts onClick prop */}
    <Button onClick={event => event.currentTarget.form} />

    {/* Button as "a" accepts onClick prop */}
    <Button as="a" onClick={event => event.currentTarget.href} />

    {/* Button as Link accepts onClick prop, but it must be explicitly typed */}
    <Button
      as={Link}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => event.altKey}
    />

    {/* ExtendedButton accepts isExtended prop */}
    <ExtendedButton isExtended />

    {/* ExtendedButton accepts isDisabled prop */}
    <ExtendedButton isDisabled />

    {/* ExtendedButton does not accept another prop */}
    {/* @ts-expect-error */}
    <ExtendedButton another={1} />

    {/* ExtendedButton accepts onClick prop */}
    <ExtendedButton onClick={event => event.currentTarget.form} />

    {/* ExtendedButton as "a" accepts isExtended prop */}
    <ExtendedButton as="a" isExtended />

    {/* ExtendedButton as "a" accepts isDisabled prop */}
    <ExtendedButton as="a" isDisabled />

    {/* ExtendedButton as "a" accepts onClick prop */}
    <ExtendedButton as="a" onClick={event => event.currentTarget.href} />

    {/* ExtendedButtonUsingReactUtils accepts isDisabled prop */}
    <ExtendedButtonUsingReactUtils isDisabled />

    {/* ExtendedButtonUsingReactUtils accepts onClick prop */}
    <ExtendedButtonUsingReactUtils
      onClick={event => event.currentTarget.form}
    />

    {/* ExtendedButtonUsingReactUtils does not accept as prop */}
    {/* @ts-expect-error */}
    <ExtendedButtonUsingReactUtils as="a" isDisabled />

    {/* Anchor expects requiredProp prop */}
    {/* @ts-expect-error */}
    <Anchor />

    {/* Button as Anchor (Polymorphic.ForwardRefComponent) expects required prop */}
    {/* @ts-expect-error */}
    <Button as={Anchor} />

    {/* Button as Anchor (Polymorphic.ForwardRefComponent) accepts requiredProp */}
    <Button as={Anchor} requiredProp />
  </div>
);

// Make jest happy since this files ends with *.test.tsx
it('should render', async () => {
  render(<Test />);

  const wrapper = screen.getByTestId('test-wrapper');

  expect(wrapper).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  expect(wrapper.children.length).toBeGreaterThan(0);
});
