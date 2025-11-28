import { people } from '@/lib/data/people';
import { amenitiesOptions, venueTypes, venues } from '@/lib/data/venues';
import { CalendarDate } from '@internationalized/date';
import {
  CalendarPlus,
  CircleQuestionMark,
  MapPin,
  Share2,
  TicketMinus,
  Tickets,
} from 'lucide-react';
import {
  ActionMenu,
  Badge,
  Button,
  Card,
  Checkbox,
  Columns,
  ComboBox,
  DatePicker,
  Divider,
  FileField,
  Form,
  Headline,
  Inline,
  NumberField,
  NumericFormat,
  Pagination,
  Radio,
  SearchField,
  SectionMessage,
  Select,
  Slider,
  Stack,
  Switch,
  Tag,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

const venue = venues.find(v => v.id === '9')!;

export const Inventory = () => (
  <Form autoComplete="off">
    <Columns columns={[1, 1, 1]} space={8} collapseAt="800px">
      <Stack space="peer">
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
              className="aspect-square size-16 rounded-xl object-cover"
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
        <Inline space={2}>
          <Badge>basic</Badge>
          <Badge variant="success">free</Badge>
          <Badge variant="error">on sale</Badge>
          <Badge variant="info">recommended</Badge>
        </Inline>
        <Inline space="fieldX" noWrap>
          <SearchField
            aria-label="Search products"
            placeholder="Search products..."
          />
          <Button variant="primary">Search</Button>
        </Inline>
        <NumberField label="Quantity" defaultValue={8} />
        <Select
          label="Assign to User"
          placeholder="Select a user"
          defaultValue="crash"
        >
          {people.map(person => (
            <Select.Option
              key={person.id}
              id={person.id}
              textValue={person.name}
            >
              <Inline space={2} alignY="center">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="size-6 rounded-full object-cover"
                />
                <Stack>
                  <Text slot="label">{person.name}</Text>
                  <Text slot="description">{person.position}</Text>
                </Stack>
              </Inline>
            </Select.Option>
          ))}
        </Select>
        <Slider
          label="Price Range"
          minValue={0}
          maxValue={1000}
          step={10}
          defaultValue={[150, 700]}
          description="Set your preferred budget range."
          formatOptions={{
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
          }}
        />
        <SectionMessage>
          <SectionMessage.Title>Note</SectionMessage.Title>
          <SectionMessage.Content>
            Remember to review your order details before submitting to ensure
            accuracy.
          </SectionMessage.Content>
        </SectionMessage>
        <Switch label="Gift Wrap" defaultSelected />
      </Stack>
      <Stack space={6}>
        <Pagination page={2} pageSize={1} totalItems={4} />
        <Tag.Group label="Venue types" onRemove={() => {}}>
          {venueTypes.map(type => (
            <Tag key={type} id={type}>
              {type}
            </Tag>
          ))}
        </Tag.Group>
        <Checkbox
          label="Include sold items"
          defaultChecked
          description="Show items that are sold out"
        />
        <DatePicker
          label="Event Date"
          defaultValue={new CalendarDate(2026, 6, 3)}
        />
        <Inline space={2} noWrap>
          <Button variant="primary">
            <Tickets /> View tickets
          </Button>
          <Button>
            <MapPin /> Get directions
          </Button>
          <ActionMenu>
            <ActionMenu.Item id="share">
              <Share2 /> Share event
            </ActionMenu.Item>
            <ActionMenu.Item id="calendar">
              <CalendarPlus /> Add to calendar
            </ActionMenu.Item>
            <ActionMenu.Item id="support">
              <CircleQuestionMark /> Contact support
            </ActionMenu.Item>
            <ActionMenu.Item id="cancel" variant="destructive">
              <TicketMinus /> Cancel event
            </ActionMenu.Item>
          </ActionMenu>
        </Inline>
        <TextField
          label="Venue name"
          defaultValue={venue.name}
          error
          errorMessage="A venue with that name already exists."
        />
        <FileField label="Upload venue image" />
      </Stack>
    </Columns>
  </Form>
);
