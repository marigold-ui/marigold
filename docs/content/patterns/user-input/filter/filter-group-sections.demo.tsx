import {
  Accordion,
  Badge,
  Checkbox,
  Inline,
  Radio,
  Slider,
  Stack,
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

// Each section is a theme holding several related filters. The fields keep
// their own labels, so a header never has to restate them.
export default () => (
  <Accordion allowsMultipleExpanded defaultExpandedKeys={['essentials']}>
    <Accordion.Item id="essentials">
      <SectionHeader title="Essentials" count={1} />
      <Accordion.Content>
        <Stack space="group">
          <Checkbox.Group label="Category" defaultValue={['concert']}>
            <Checkbox value="concert" label="Concerts" />
            <Checkbox value="festival" label="Festivals" />
            <Checkbox value="theater" label="Theater" />
          </Checkbox.Group>
          <Slider
            label="Max. Price"
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
        </Stack>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="sales">
      <SectionHeader title="Sales" count={2} />
      <Accordion.Content>
        <Stack space="group">
          <Radio.Group label="Status" defaultValue="draft">
            <Radio value="published">Published</Radio>
            <Radio value="draft">Draft</Radio>
            <Radio value="archived">Archived</Radio>
          </Radio.Group>
          <Checkbox.Group label="Sales channel" defaultValue={['web']}>
            <Checkbox value="web" label="Web shop" />
            <Checkbox value="boxoffice" label="Box office" />
            <Checkbox value="partner" label="Partner network" />
          </Checkbox.Group>
        </Stack>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item id="venue">
      <SectionHeader title="Venue" />
      <Accordion.Content>
        <Stack space="group">
          <Checkbox.Group label="Type">
            <Checkbox value="indoor" label="Indoor" />
            <Checkbox value="outdoor" label="Outdoor" />
          </Checkbox.Group>
          <Radio.Group label="Seating">
            <Radio value="standing">Standing</Radio>
            <Radio value="seated">Seated</Radio>
            <Radio value="mixed">Mixed</Radio>
          </Radio.Group>
        </Stack>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);
