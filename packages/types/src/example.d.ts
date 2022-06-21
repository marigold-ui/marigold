import { ReactNode } from 'react';
import {
  PolymorphicProps,
  PolymorphicComponentWithRef,
  PolymorphicComponent,
} from '.';
export declare type BoxOwnProps = {
  className?: string;
};
export declare const Box: PolymorphicComponentWithRef<BoxOwnProps, 'div'>;
export declare const SimpleBox: () => JSX.Element;
export declare const HrefBox: () => JSX.Element;
export declare const BrokenBox: () => JSX.Element;
export declare type LinkOwnProps = {
  disabled?: boolean;
} & BoxOwnProps;
export declare type LinkProps = PolymorphicProps<LinkOwnProps, 'a'>;
export declare const Link: PolymorphicComponent<LinkOwnProps, 'a'>;
export declare const SimpleLink: () => JSX.Element;
export interface RouterLinkProps {
  children?: ReactNode;
  to: string;
}
export declare const IntegrateLinkWithRouter: () => JSX.Element;
//# sourceMappingURL=example.d.ts.map
