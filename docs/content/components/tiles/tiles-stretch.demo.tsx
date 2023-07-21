import { Divider, Headline, Stack, Tiles } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Headline>Without stretch:</Headline>
    <Tiles tilesWidth="150px" space={4}>
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
    </Tiles>
    <Divider />
    <Tiles tilesWidth="150px" space={4}>
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
    </Tiles>
    <Headline>With stretch:</Headline>
    <Tiles tilesWidth="150px" space={4} stretch>
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
    </Tiles>
    <Divider />
    <Tiles tilesWidth="150px" space={4} stretch>
      <div className="h-24 border border-slate-300 bg-slate-200" />
      <div className="h-24 border border-slate-300 bg-slate-200" />
    </Tiles>
  </Stack>
);
