import { Inline } from '@marigold/components';
import { FadeContainer } from '@/ui/FadeContainer';
import { VisualSpacing } from '@/ui/VisualSpacing';
import { Box } from '@/ui/Wireframe';

/**
 * Wrapper div:
 * - bottom margin so the spacing guides show up
 * - define a width and height and stretch children to fill the height on
 *   inline so horizontal spacing works
 */

export default () => (
  <div className="mb-8 grid place-items-center *:h-12 *:w-10/12 *:items-stretch">
    <Inline alignX="left" space="group" noWrap>
      <FadeContainer fade="left">
        <Box className="w-32" />
      </FadeContainer>
      <VisualSpacing orientation="horizontal" space="group" />
      <Box className="w-20" />
      <VisualSpacing orientation="horizontal" space="group" />
      <Box className="w-32" />
      <VisualSpacing orientation="horizontal" space="group" />
      <FadeContainer fade="right">
        <Box className="w-24" />
      </FadeContainer>
    </Inline>
  </div>
);
