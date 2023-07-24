import { Breakout, Container } from '@marigold/components';

export default () => (
  <Container align="center">
    <div className="h-20 w-full border border-slate-300 bg-slate-200" />
    <Breakout height="100px" alignY="bottom">
      <div className="border border-slate-300 bg-slate-200">
        BREAKOUT with bottom alignment
      </div>
    </Breakout>
    <div className="h-20 w-full border border-slate-300 bg-slate-200" />
  </Container>
);
