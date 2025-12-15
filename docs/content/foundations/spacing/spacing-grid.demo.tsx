import { Inline, Stack } from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="mx-auto mb-8 w-54">
    <Stack alignX="left" space="tight">
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="tight" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
        </Inline>
      </div>
      <VisualSpacing orientation="vertical" space="tight" />
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="tight" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" hideGuide />
          <Box className="size-12" />
        </Inline>
      </div>
      <VisualSpacing orientation="vertical" space="tight" />
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="tight" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="tight" />
          <Box className="size-12" />
        </Inline>
      </div>
    </Stack>
  </div>
);
