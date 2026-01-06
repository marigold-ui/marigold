import { SectionMessage } from '@marigold/components';

export default () => (
  <SectionMessage closeButton>
    <SectionMessage.Title>
      Configuration of the hardware key
    </SectionMessage.Title>
    <SectionMessage.Content>
      Activating the function allows you to change the scanning direction. Keep
      in mind to have the correct settings set to "changeable".
    </SectionMessage.Content>
  </SectionMessage>
);
