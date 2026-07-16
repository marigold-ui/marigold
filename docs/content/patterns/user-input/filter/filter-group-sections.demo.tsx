import {
  Accordion,
  Badge,
  Checkbox,
  Inline,
  Radio,
  Slider,
} from '@marigold/components';

// The badge on a header counts the active filters inside the section, so a
// collapsed section still reveals that it holds state.
const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <Accordion.Header>
    <Inline space={2} alignY="center">
      {title}
      {count ? <Badge>{count}</Badge> : null} {/* [!code highlight] */}
    </Inline>
  </Accordion.Header>
);

export default () => (
  <Accordion allowsMultipleExpanded defaultExpandedKeys={['category']}>
    <Accordion.Item id="category">
      <SectionHeader title="Category" count={1} />
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
      <SectionHeader title="Max. Price" />
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
      <SectionHeader title="Status" count={1} />
      <Accordion.Content>
        <Radio.Group aria-label="Status" defaultValue="draft">
          <Radio value="published">Published</Radio>
          <Radio value="draft">Draft</Radio>
          <Radio value="archived">Archived</Radio>
        </Radio.Group>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="channel">
      <SectionHeader title="Sales Channel" />
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
