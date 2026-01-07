'use client';

import { Radio } from '@marigold/components';

export default () => (
  <Radio.Group
    label="Preferred Event Activity"
    defaultValue="no-preference"
    collapseAt={5}
  >
    <Radio value="no-preference">No Preference</Radio>
    <Radio value="networking">Networking Session</Radio>
    <Radio value="workshop">Workshop</Radio>
    <Radio value="panel">Panel Discussion</Radio>
    <Radio value="keynote">Keynote Speech</Radio>
    <Radio value="qna">Q&amp;A Session</Radio>
    <Radio value="roundtable">Roundtable</Radio>
    <Radio value="team-building">Team Building</Radio>
    <Radio value="hackathon">Hackathon</Radio>
    <Radio value="social">Social Gathering</Radio>
  </Radio.Group>
);
