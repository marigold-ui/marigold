import { Link, Text } from '@marigold/components';

export const NavItem = ({ children }: any) => (
  <div className="vistited:border-[#fa8005] border-b-8 pb-2">
    <Link>
      <Text color="#374151">{children}</Text>
    </Link>
  </div>
);
