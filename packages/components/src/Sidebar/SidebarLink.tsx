import type { ReactNode, Ref } from 'react';
import {
  handleLinkClick,
  useLinkProps,
  useObjectRef,
  useRouter,
} from '@react-aria/utils';

export interface SidebarLinkProps {
  href?: string;
  'data-key'?: string;
  'aria-current'?: 'page';
  'data-active'?: boolean;
  className?: string;
  onPress?: () => void;
  tabIndex?: number;
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

export const SidebarLink = ({
  href,
  className,
  onPress,
  tabIndex,
  children,
  ref: forwardedRef,
  'aria-current': ariaCurrent,
  ...dataProps
}: SidebarLinkProps) => {
  const ref = useObjectRef(forwardedRef);
  const router = useRouter();
  const routerLinkProps = useLinkProps({ href });

  return (
    <a
      {...routerLinkProps}
      {...dataProps}
      ref={ref}
      href={href}
      role={href ? undefined : 'link'}
      className={className}
      tabIndex={tabIndex}
      aria-current={ariaCurrent}
      onClick={e => {
        onPress?.();
        handleLinkClick(e, router, href, undefined);
      }}
    >
      {children}
    </a>
  );
};
