import { Breakout, Container } from '@marigold/components';

export default () => (
  <Container align="center">
    <div className="h-20 w-full border border-slate-300 bg-slate-200" />
    <Breakout alignX="right">
      <div>BREAKOUT with right aligned content</div>
    </Breakout>
    <div className="h-20 w-full border border-slate-300 bg-slate-200" />
  </Container>
);
