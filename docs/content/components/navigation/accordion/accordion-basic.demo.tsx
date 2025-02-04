import { Accordion, Headline, TextField } from '@marigold/components';

export default () => (
  <Accordion defaultExpandedKeys={['1']}>
    <Accordion.Item id={1} key={1}>
      <Accordion.Header title="Informations" />
      <Accordion.Content>
        {/* just to test scroll */}
        <Headline level={3}>
          Some Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          voluptatem minima hic ex ullam, asperiores quaerat quas eveniet,
          magnam quisquam dolores. Beatae eaque eveniet error ipsa veniam vero
          culpa recusandae?
        </Headline>
        <TextField label="Name" />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id={2} key={2}>
      <Accordion.Header title="Personal Settings" />
      <Accordion.Content>two</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id={3} key={3}>
      <Accordion.Header title="Billing Adress" />
      <Accordion.Content>
        <Headline level={3}>Some Imformations</Headline>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);
