import { Accordion, Headline, TextField } from '@marigold/components';

export default () => (
  <Accordion defaultExpandedKeys={['1']}>
    <Accordion.Item key={1} title="Informations">
      {/* just to test scroll */}
      <Headline level={3}>
        Some Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        voluptatem minima hic ex ullam, asperiores quaerat quas eveniet, magnam
        quisquam dolores. Beatae eaque eveniet error ipsa veniam vero culpa
        recusandae?
      </Headline>
      <TextField label="Name" />
    </Accordion.Item>
    <Accordion.Item key={2} title="Personal Settings">
      two
    </Accordion.Item>
    <Accordion.Item key={3} title="Billing Adress">
      <Headline level={3}>Some Imformations</Headline>
    </Accordion.Item>
  </Accordion>
);
