'use client';

import { ContextualHelp } from '@marigold/components';

export default () => (
  <div className="flex flex-wrap gap-6">
    <ContextualHelp placement="top">Top Placement</ContextualHelp>
    <ContextualHelp placement="bottom">Bottom Placement</ContextualHelp>
    <ContextualHelp placement="left">Left Placement</ContextualHelp>
    <ContextualHelp placement="right">Right Placement</ContextualHelp>
    <ContextualHelp placement="bottom start">Bottom Start</ContextualHelp>
  </div>
);
