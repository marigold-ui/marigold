import { Accordion, Checkbox, Radio, Slider } from '@marigold/components';

export default () => (
  <Accordion allowsMultipleExpanded defaultExpandedKeys={['category']}>
    <Accordion.Item id="category">
      <Accordion.Header>Category</Accordion.Header>
      <Accordion.Content>
        <Checkbox.Group aria-label="Category" defaultValue={['concert']}>
          <Checkbox value="concert" label="Concerts" />
          <Checkbox value="festival" label="Festivals" />
          <Checkbox value="theater" label="Theater" />
          <Checkbox value="workshop" label="Workshops" />
        </Checkbox.Group>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="price">
      <Accordion.Header>Max. Price</Accordion.Header>
      <Accordion.Content>
        <Slider
          aria-label="Maximum price"
          thumbLabels="price"
          maxValue={500}
          step={10}
          defaultValue={500}
          formatOptions={{
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
          }}
        />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="status">
      <Accordion.Header>Status</Accordion.Header>
      <Accordion.Content>
        <Radio.Group aria-label="Status">
          <Radio value="published">Published</Radio>
          <Radio value="draft">Draft</Radio>
          <Radio value="archived">Archived</Radio>
        </Radio.Group>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="channel">
      <Accordion.Header>Sales Channel</Accordion.Header>
      <Accordion.Content>
        <Checkbox.Group aria-label="Sales channel">
          <Checkbox value="web" label="Web shop" />
          <Checkbox value="boxoffice" label="Box office" />
          <Checkbox value="partner" label="Partner network" />
        </Checkbox.Group>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);
