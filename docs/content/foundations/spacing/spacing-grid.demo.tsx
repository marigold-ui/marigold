import { Inline, Stack } from '@marigold/components';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

export default () => (
  <div className="mx-auto mb-8 w-72">
    <Stack alignX="left" space="group">
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="group" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" hideGuide />
          <Box className="size-12" />
        </Inline>
      </div>
      <VisualSpacing orientation="vertical" space="group" />
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="group" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" hideGuide />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" hideGuide />
          <Box className="size-12" />
        </Inline>
      </div>
      <VisualSpacing orientation="vertical" space="group" />
      <div className="*:h-12 *:items-stretch">
        <Inline alignX="left" space="group" noWrap>
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" />
          <Box className="size-12" />
          <VisualSpacing orientation="horizontal" space="group" />
          <Box className="size-12" />
        </Inline>
      </div>
    </Stack>
  </div>
);
