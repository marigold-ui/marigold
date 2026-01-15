import { Card } from '@/ui';
import { BlurFade } from '@/ui/BlurFade';

const Token = ({ name, value }: { name: string; value: string }) => (
  <>
    <code className="block text-xs">--{name}</code>
    <div
      data-theme="rui"
      className="size-5 rounded-full bg-(--token) shadow-md"
      style={{ '--token': value } as any}
    />
  </>
);

const tokens = [
  'muted',
  'hover',
  'disabled',
  'brand',
  'destructive',
  'destructive-muted',
  'success',
  'success-muted',
  'warning',
  'warning-muted',
  'info',
  'info-muted',
];

export const CollaborationSection = () => {
  /**
   * Note: can not use Tailwind's "group" feature here for the hover effect,
   * since our custom "group" matcher only works with data attributes.
   */
  return (
    <BlurFade
      className="grid items-end justify-center md:col-span-3 [&:hover>:nth-child(1)]:rotate-[-21deg] [&:hover>:nth-child(2)]:rotate-[-10deg] [&:hover>:nth-child(3)]:rotate-[7deg]"
      inView
      yOffset={16}
      inViewMargin="-180px"
    >
      <div className="col-start-1 row-start-1 w-[300px] origin-bottom rotate-[-17deg] transition-transform duration-700">
        <Card variant="image">
          <div className="h-[500px] w-[300px] bg-[url(/ui-kit.jpg)] bg-[length:350px_auto]" />
        </Card>
      </div>
      <div className="col-start-1 row-start-1 w-[300px] origin-bottom rotate-[-8deg] transition-transform duration-700">
        <Card variant="image">
          <div className="h-[500px] w-[300px] origin-bottom bg-[url(/storybook-sidebar.png)] bg-[length:350px_auto]" />
        </Card>
      </div>
      <div
        data-theme="rui"
        className="col-start-1 row-start-1 w-[300px] origin-bottom rotate-6 transition-transform duration-700"
      >
        <Card px={6} py={4}>
          <div className="grid grid-cols-[max-content_auto] items-center justify-between gap-5">
            {tokens.map(token => (
              <Token
                key={token}
                name={`bg-${token}`}
                value={`var(--color-${token})`}
              />
            ))}
          </div>
        </Card>
      </div>
    </BlurFade>
  );
};
