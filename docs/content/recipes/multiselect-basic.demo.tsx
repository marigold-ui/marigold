import { Multiselect } from '@marigold/components';

export default () => {
  return (
    <Multiselect label="Select a country">
      <Multiselect.Item id="Germany">🇩🇪 Germany</Multiselect.Item>
      <Multiselect.Item id="France">🇫🇷 France</Multiselect.Item>
      <Multiselect.Item id="India">🇮🇳 India</Multiselect.Item>
      <Multiselect.Item id="Brazil">🇧🇷 Brazil</Multiselect.Item>
      <Multiselect.Item id="Canada">🇨🇦 Canada</Multiselect.Item>
      <Multiselect.Item id="Australia">🇦🇺 Australia</Multiselect.Item>
    </Multiselect>
  );
};
