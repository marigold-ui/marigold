import { Description, ListView, Switch, TextValue } from '@marigold/components';

export default () => (
  <ListView aria-label="Notification settings">
    <ListView.Item id="email" textValue="Email notifications">
      <TextValue>Email notifications</TextValue>
      <Description>Receive updates by email.</Description>
      <Switch aria-label="Email notifications" />
    </ListView.Item>
    <ListView.Item id="push" textValue="Push notifications">
      <TextValue>Push notifications</TextValue>
      <Description>Receive updates on this device.</Description>
      <Switch aria-label="Push notifications" selected />
    </ListView.Item>
    <ListView.Item id="sms" textValue="SMS notifications">
      <TextValue>SMS notifications</TextValue>
      <Description>Receive updates by text message.</Description>
      <Switch aria-label="SMS notifications" />
    </ListView.Item>
  </ListView>
);
