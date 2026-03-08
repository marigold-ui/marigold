import type { ReactNode, Ref } from 'react';
import {
  handleLinkClick,
  useLinkProps,
  useObjectRef,
  useRouter,
} from '@react-aria/utils';
import { useRovingItem } from './useSidebarNav';

export interface SidebarLinkProps {
  href?: string;
  'data-key'?: string;
  'aria-current'?: 'page';
  'data-active'?: boolean;
  className?: string;
  onPress?: () => void;
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

export const SidebarLink = ({
  href,
  className,
  onPress,
  children,
  ref: forwardedRef,
  'aria-current': ariaCurrent,
  'data-key': dataKey,
  ...dataProps
}: SidebarLinkProps) => {
  const ref = useObjectRef(forwardedRef);
  const router = useRouter();
  const routerLinkProps = useLinkProps({ href });
  const { tabIndex, onFocus } = useRovingItem(dataKey!);

  return (
    <a
      {...routerLinkProps}
      {...dataProps}
      data-key={dataKey}
      ref={ref}
      href={href}
      role={href ? undefined : 'button'}
      className={className}
      tabIndex={tabIndex}
      aria-current={ariaCurrent}
      onFocus={onFocus}
      onClick={e => {
        onPress?.();
        handleLinkClick(e, router, href, undefined);
      }}
    >
      {children}
    </a>
  );
};
