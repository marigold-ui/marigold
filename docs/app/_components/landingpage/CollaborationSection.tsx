import { Card } from '@/ui';
import { colors } from '@marigold/theme-core/tokens';
import { BlurFade } from '@/ui/BlurFade';

const Token = ({ name, value }: { name: string; value: string }) => (
  <>
    <code className="block text-xs">--{name}</code>
    <div
      className="size-5 rounded-full bg-[--token] shadow-md"
      style={{ '--token': value } as any}
    />
  </>
);

export const CollaborationSection = () => {
  /**
   * Note: can not use Tailwind's "group" feature here for the hover effect,
   * since our custom "group" matcher only works with data attributes.
   */
  return (
    <BlurFade
      className="group col-span-3 grid items-end justify-center [&:hover>:nth-child(1)]:rotate-[-21deg] [&:hover>:nth-child(2)]:rotate-[-10deg] [&:hover>:nth-child(3)]:rotate-[7deg]"
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
      <div className="col-start-1 row-start-1 w-[300px] origin-bottom rotate-6 transition-transform duration-700">
        <Card px={6} py={4}>
          <div className="grid grid-cols-[max-content,auto] items-center justify-between gap-5">
            <Token name="text-base" value={colors.text.base.DEFAULT} />
            <Token name="text-base-hover" value={colors.text.base.hover} />
            <Token
              name="text-base-disabled"
              value={colors.text.base.disabled}
            />
            <Token name="text-inverted" value={colors.text.inverted.DEFAULT} />
            <Token
              name="text-inverted-hover"
              value={colors.text.inverted.hover}
            />
            <Token
              name="text-inverted-disabled"
              value={colors.text.inverted.disabled}
            />
            <Token name="text-info" value={colors.text.info.DEFAULT} />
            <Token name="text-info-hover" value={colors.text.info.hover} />
            <Token name="text-success" value={colors.text.success.DEFAULT} />
            <Token
              name="text-success-hover"
              value={colors.text.success.hover}
            />
            <Token name="text-warning" value={colors.text.warning.DEFAULT} />
            <Token
              name="text-warning-hover"
              value={colors.text.warning.hover}
            />
          </div>
        </Card>
      </div>
    </BlurFade>
  );
};
