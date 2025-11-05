import { amenitiesOptions, venues } from '@/lib/data/venues';
import {
  Badge,
  Button,
  Card,
  Columns,
  ComboBox,
  Divider,
  Form,
  Headline,
  Inline,
  NumericFormat,
  Radio,
  SearchField,
  Select,
  Slider,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

const venue = venues.find(v => v.id === '9')!;

export const FormExample = () => (
  <Form autoComplete="off">
    <Columns columns={[1, 1, 1]} space={8} collapseAt="800px">
      <Stack space="fieldY">
        <Headline level="4">Shipping Address</Headline>
        <TextField label="Full name" required />
        <TextField label="Street" required />
        <Inline space="fieldX" noWrap>
          <TextField label="ZIP code" required maxLength={5} width="1/4" />
          <TextField label="City" required />
        </Inline>
        <ComboBox
          label="State"
          placeholder="Select your state"
          menuTrigger="focus"
        >
          <ComboBox.Option id="BW">Baden-Wuerttemberg</ComboBox.Option>
          <ComboBox.Option id="BY">Bavaria</ComboBox.Option>
          <ComboBox.Option id="BE">Berlin</ComboBox.Option>
          <ComboBox.Option id="BB">Brandenburg</ComboBox.Option>
          <ComboBox.Option id="HB">Bremen</ComboBox.Option>
          <ComboBox.Option id="HH">Hamburg</ComboBox.Option>
          <ComboBox.Option id="HE">Hesse</ComboBox.Option>
          <ComboBox.Option id="MV">
            Mecklenburg-Western Pomerania
          </ComboBox.Option>
          <ComboBox.Option id="NI">Lower Saxony</ComboBox.Option>
          <ComboBox.Option id="NW">North Rhine-Westphalia</ComboBox.Option>
          <ComboBox.Option id="RP">Rhineland-Palatinate</ComboBox.Option>
          <ComboBox.Option id="SL">Saarland</ComboBox.Option>
          <ComboBox.Option id="SN">Saxony</ComboBox.Option>
          <ComboBox.Option id="ST">Saxony-Anhalt</ComboBox.Option>
          <ComboBox.Option id="SH">Schleswig-Holstein</ComboBox.Option>
          <ComboBox.Option id="TH">Thuringia</ComboBox.Option>
        </ComboBox>
        <Divider />
        <Headline level="4">Shipping Options</Headline>
        <Radio.Group label="Shipping method" defaultValue="standard">
          <Radio value="standard">
            <Inline alignY="center" alignX="between">
              <Text>Standard Shipping</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (3-5 days)
              </Text>
            </Inline>
          </Radio>
          <Radio value="express">
            <Inline alignY="center" alignX="between">
              <Text>Express Shipping</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (1-2 days)
              </Text>
            </Inline>
          </Radio>
          <Radio value="overnight">
            <Inline alignY="center" alignX="between">
              <Text>Overnight Shipping</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (next day)
              </Text>
            </Inline>
          </Radio>
          <Radio value="pickup">
            <Inline alignY="center" alignX="between">
              <Text>In-Store Pickup</Text>
              <Text variant="muted" fontSize="sm" weight="light">
                (in 2 hours)
              </Text>
            </Inline>
          </Radio>
        </Radio.Group>
        <TextArea
          label="Delivery Instructions"
          description="Tricky delivery spot? Add a gate code, building access info, or a safe place to leave your package."
        />
        <Inline alignY="center" space="fieldX">
          <Button variant="primary">Submit</Button>
          <Button>Cancel</Button>
        </Inline>
      </Stack>
      <Stack space={6}>
        <Card space={6}>
          <Inline noWrap space={5}>
            <img
              src={venue.image}
              alt=""
              className="aspect-square size-16 rounded-full"
            />
            <Stack>
              <Headline level="4">{venue.name}</Headline>
              <Text variant="muted" fontSize="sm" weight="light">
                {venue.city}, {venue.country}
              </Text>
            </Stack>
          </Inline>
          <Columns columns={['fit', 1]} space={4}>
            <Stack alignX="right" space={1}>
              <Text fontSize="sm" weight="semibold">
                Capacity:
              </Text>
              <Text fontSize="sm" weight="semibold">
                Price:
              </Text>
              <Text fontSize="sm" weight="semibold">
                Amenities:
              </Text>
            </Stack>
            <Stack space={1}>
              <Text fontSize="sm">{venue.capacity}</Text>
              <Text fontSize="sm">
                <NumericFormat
                  value={[venue.price.from, venue.price.to]}
                  style="currency"
                  currency="EUR"
                  minimumFractionDigits={0}
                />
              </Text>
              <Text fontSize="sm">
                {venue.amenities
                  .map(amenity => amenitiesOptions[amenity])
                  .join(', ')}
              </Text>
            </Stack>
          </Columns>
        </Card>
        <Inline space="fieldX" noWrap>
          <SearchField
            aria-label="Search products"
            placeholder="Search products..."
          />
          <Button variant="primary">Search</Button>
        </Inline>
        <Inline space={2}>
          <Badge>basic</Badge>
          <Badge variant="success">free</Badge>
          <Badge variant="error">on sale</Badge>
          <Badge variant="info">recommended</Badge>
        </Inline>
        <Slider
          label="Price Range"
          minValue={0}
          maxValue={1000}
          step={10}
          defaultValue={[300, 500]}
          description="Set your preferred budget range."
          formatOptions={{
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
          }}
        />
      </Stack>
      <Stack>asd</Stack>
    </Columns>
  </Form>
);
