# Forms

_Guidelines for building a consistent form structure_

Forms are the backbone of data submission, making their design critical to the user experience. Our Form Design Guidelines ensure every form in your application is consistent, usable, and accessible.

This comprehensive guide covers the visual and structural aspects of form design, from overall layout principles and spacing strategies to organizing content with sections and fields. You'll learn how to create intuitive user flows, apply consistent spacing using our design tokens, and leverage components like accordions to manage complex forms effectively.

These design patterns focus on the user experience and visual hierarchy of forms. For technical implementation details, state management, and validation patterns, refer to our [Form Implementation](/patterns/form-implementation) guide.

## Layout & Structure

The foundation of effective form design lies in thoughtful layout and structure. How you arrange elements on the page, use whitespace, and organize content directly impacts user comprehension and completion rates. A well-structured form creates a clear visual hierarchy and logical flow that guides users through the data entry process efficiently.

### Overall form layout

Forms should be left-aligned to follow natural reading flow and maintain consistency across your application. To ensure optimal readability across all devices, limit form width to a maximum of 800px using the `container` spacing token from.

Whitespace plays a crucial role in form usability—it prevents visual clutter, enhances focus, and creates clear separation between sections and fields. Strategic use of whitespace makes forms easier to scan and complete, ultimately improving the user experience. We provide comprehensive [spacing tokens](#spacing-tokens-alpha) to help you apply consistent spacing throughout your forms.

✓ Align form content to the left for better scanning and organization.Use a maximum width of 800px (spacing token container) for forms to ensure readability across devices.Ensure sufficient whitespace around and within the form for a clear visual hierarchy.Group related fields together to provide more context and make the UI easier to scan.

### Available components

We have various components suitable for forms. You can find a detailed guide on the [Form Fields](../../foundations/form-fields) page.

Besides that we have some other components which you may need to build well-structured forms:

- **Layout components**: [`<Stack>`](../../components/layout/stack/), [`<Inline>`](../../components/layout/inline/), and [`<Inset>`](../../components/layout/inset/) to organize fields and sections.
- **Accordion**: Group fields with an [accordion](../../components/navigation/accordion/) for lengthy forms or optional fields. Use accordions for sections that can be collapsed to save space and reduce cognitive load.
- **Buttons**: Use primary [buttons](../../components/actions/button/) for form submission, secondary for additional actions like "View PDF".
- **Links**: Use [links](../../components/navigation/link/) for navigation to privacy policies or terms of service, not for form actions.
- **Feedback components**: You can use feedback components like [`<SectionMessage>`](../../components/content/section-message/) and [`<Toast>`](../../components/overlay/toast/) to provide additional information or context.

## Content Organization

### Sections

Sections help organize related fields together, making forms easier to scan and understand. By providing visual separation and context, they allow users to process information in manageable chunks while transforming overwhelming forms into intuitive experiences.

This organizational approach is particularly effective when your form serves multiple purposes or collects diverse types of data. Sections create logical groupings that match how users naturally think about information, reducing cognitive load and improving completion rates.

Use sections when your form has multiple purposes or collects different types of information. They work especially well for:

- **Complex forms**: When your form has more than 6-8 fields, sections reduce cognitive load and prevent form abandonment by breaking information into manageable chunks.

- **Different data types**: When collecting different categories of information (e.g., personal info, billing details, preferences), sections provide clear context switching and help users mentally prepare for each type of data.

- **Progressive disclosure**: When some fields are conditional based on previous selections, sections help users understand the relationship between their choices and additional requirements.

```tsx title="form-section"
import { Headline, Stack, TextField } from '@marigold/components';

export default () => (
  <Stack space="section">
    <Stack space="group">
      <Headline level={2}>Personal Information</Headline>
      <TextField label="First Name" required />
      <TextField label="Last Name" required />
      <TextField label="Email" required />
    </Stack>
    <Stack space="group">
      <Headline level={2}>Account Details</Headline>
      <TextField label="Username" required />
      <TextField label="Password" type="password" required />
      <TextField label="Confirm Password" type="password" required />
    </Stack>
    <Stack space="group">
      <Headline level={2}>Profile Settings</Headline>
      <TextField label="Bio" />
      <TextField label="Website" type="url" />
      <TextField label="Location" />
    </Stack>
  </Stack>
);
```

#### Spacing between sections

Forms with multiple sections should maintain spacing between sections using `<Stack space='section'>`.

### Fields

Individual fields are the building blocks of your form. Their arrangement, sizing, and presentation directly impact how users navigate and complete the form. Proper field organization reduces cognitive load and creates a logical flow that guides users through the data entry process.

Following a predictable field order helps users build mental models and reduces the time spent deciding what to fill out next. Prioritizing required fields ensures critical information is collected first, while positioning dependent fields near their triggers maintains context and prevents confusion. Field widths that match expected content length provide visual cues about the type and amount of information needed, making forms more intuitive and efficient to complete.

```tsx title="form-spacing-fields"
import {
  Headline,
  Inline,
  Inset,
  NumberField,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <Stack space="group">
    <Headline level={2}>Personal Information</Headline>
    <TextField label="Name" description="Enter your full name" required />
    <TextField
      label="Email"
      description="Enter your email address"
      type="email"
      required
    />
    <NumberField label="Phone" hideStepper width={40} />
    <Inset spaceY="group">
      <Stack space="group">
        <TextField label="Street" />
        <Inline space="related">
          <TextField label="Postcode" width={20} />
          <TextField label="City" width={40} />
        </Inline>
        <Select label="Country" placeholder="Select your country" width={'fit'}>
          <Select.Option id="us">United States</Select.Option>
          <Select.Option id="ca">Canada</Select.Option>
          <Select.Option id="uk">United Kingdom</Select.Option>
          <Select.Option id="de">Germany</Select.Option>
          <Select.Option id="fr">France</Select.Option>
          <Select.Option id="it">Italy</Select.Option>
          <Select.Option id="es">Spain</Select.Option>
          <Select.Option id="au">Australia</Select.Option>
          <Select.Option id="eg">Egypt</Select.Option>
          <Select.Option id="other">Other</Select.Option>
        </Select>
      </Stack>
    </Inset>
  </Stack>
);
```

✓ Follow a predictable order of fields when creating forms. Place required fields before optional ones within each section. Position dependent fields immediately after their parent field.Fields should have a maximum width based on their expected content length.

#### Spacing between fields

Proper spacing between fields creates a clear visual hierarchy and improves form readability. Use the token `fieldY` for vertical spacing between individual fields within a section, and the token `fieldX` for horizontal spacing between fields that are positioned on the same line.

When grouping related field, such as address components or date and time fields, you can create visual associations that make the form easier to understand. Use a `<Stack>` component to organize related fields and apply the `group` spacing token to maintain consistent spacing within the group.

Grouping fields together provides additional context and makes the interface easier to scan:

- **Related information**: When fields share a common context or purpose (e.g. address fields, date and time)
- **Conditional fields**: When certain fields are only relevant based on previous answers

For a complete reference of all available spacing options, see our [spacing tokens](#spacing-tokens-alpha) section.

### Using accordions

Accordions can be used effectively in two ways within forms:

- **As sections themselves**: Use accordions to create collapsible sections that contain multiple related fields. This is particularly useful for optional information or advanced settings that don't need to be visible by default.
- **Within sections**: Use accordions to group content within an existing section, allowing users to focus on the most important fields while keeping additional options easily accessible.

When using accordions, ensure that required fields remain visible and are not hidden within collapsed sections to maintain accessibility and usability.

```tsx title="form-accordion"
import {
  Accordion,
  Button,
  Checkbox,
  DatePicker,
  Headline,
  Inline,
  NumberField,
  Select,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export default () => (
  <Stack space="section">
    <Stack space="group">
      <Headline level={2}>Event Details</Headline>
      <TextField
        label="Event Name"
        description="Enter the event title"
        required
      />
      <TextArea
        label="Description"
        description="Describe what this event is about"
        rows={3}
        required
      />
      <Inline space="related">
        <DatePicker label="Start Date" width="fit" required />
        <DatePicker label="End Date" width="fit" />
      </Inline>
    </Stack>
    <Accordion variant="card">
      <Accordion.Item id="advanced-settings">
        <Accordion.Header>Advanced Event Settings</Accordion.Header>
        <Accordion.Content>
          <Stack space="group">
            <Select
              label="Event Category"
              placeholder="Select category"
              width="fit"
            >
              <Select.Option id="conference">Conference</Select.Option>
              <Select.Option id="workshop">Workshop</Select.Option>
              <Select.Option id="meetup">Meetup</Select.Option>
              <Select.Option id="webinar">Webinar</Select.Option>
            </Select>
            <NumberField
              label="Maximum Attendees"
              description="Leave empty for unlimited capacity"
              width={32}
            />
            <TextField
              label="Event Code"
              description="Optional registration code"
              width="fit"
            />
            <Checkbox label="Require registration approval" />
            <Checkbox label="Send confirmation emails" />
          </Stack>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
    <Stack space="group">
      <Headline level={2}>Location & Capacity</Headline>
      <TextField
        label="Venue Name"
        description="Name of the venue or location"
        required
      />
      <TextField
        label="Address"
        description="Street address of the venue"
        required
      />
      <Inline space="related">
        <TextField label="City" required />
        <TextField label="Postal Code" width={20} />
      </Inline>
      <Accordion variant="card">
        <Accordion.Item id="location-details">
          <Accordion.Header>Additional Location Details</Accordion.Header>
          <Accordion.Content>
            <Stack space="group">
              <TextField
                label="Room Number"
                description="Specific room or area within venue"
              />
              <TextField
                label="Floor"
                description="Which floor of the building"
                width={20}
              />
              <TextArea
                label="Directions"
                description="Specific directions to find the venue"
                rows={3}
              />
              <Checkbox label="Wheelchair accessible" />
              <Checkbox label="Parking available" />
              <TextField
                label="Parking Instructions"
                description="Where to park and any costs"
              />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
    <Stack space="group">
      <Accordion variant="card">
        <Accordion.Item id="contact-info">
          <Accordion.Header>Contact Information</Accordion.Header>
          <Accordion.Content>
            <Stack space="group">
              <TextField
                label="Organizer Name"
                description="Main contact person"
              />
              <TextField
                label="Email"
                type="email"
                description="Contact email for inquiries"
              />
              <TextField
                label="Phone"
                type="tel"
                description="Optional phone number"
              />
              <Checkbox label="Display contact info publicly" />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Accordion variant="card">
        <Accordion.Item id="special-requirements">
          <Accordion.Header>Special Requirements</Accordion.Header>
          <Accordion.Content>
            <Stack space="group">
              <Checkbox label="Catering required" />
              <Checkbox label="Audio/Visual equipment needed" />
              <Checkbox label="Security required" />
              <TextArea
                label="Additional Notes"
                description="Any other special requirements or notes"
                rows={3}
              />
            </Stack>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
    <Inline space="related">
      <Button variant="primary">Create Event</Button>
      <Button variant="secondary">Save as Draft</Button>
    </Inline>
  </Stack>
);
```

### Required vs. optional fields

These fields must be filled out for the form to be submitted. They are clearly indicated with an asterisk (\*) next to the label. Optional fields do not have this indicator, allowing users to skip them if they choose.

## Spacing tokens (alpha)

We provide a set of spacing tokens to help you apply consistent spacing throughout your forms. These tokens are designed to cover spacing needs for form layouts, including spacing between sections, fields, and groups of related fields.

| Token     | Value         | Description                                                                                                      | Relevant components |
| :-------- | :------------ | :--------------------------------------------------------------------------------------------------------------- | :------------------ |
| container | 50rem (800px) | Used width or max-width for the form container.                                                                  | \<div>, \<Form>     |
| section   | 4rem (64px)   | Used for creating space between different form sections.                                                         | \<Stack>            |
| group     | 2rem (32px)   | Used for creating vertical space between individual form fields in a section.                                    | \<Stack>            |
| peer      | 1rem (16px)   | Used for creating horizontal space between individual form fields in a section.                                  | \<Inline>           |
| related   | 0.5rem (8px)  | Used for grouping related fields (address components, date/time fields) or multiple accordion sections together. | \<Stack>, \<Inset>  |

## Actions

Form actions guide users through completion and submission. Every form requires a primary submit action, but many forms benefit from additional secondary actions that provide alternative paths or supplementary functionality.

### Using additional actions in forms

Additional actions can enhance the user experience by providing options like "view PDF", "Reset", or "Save as Draft". These actions should be clearly differentiated from the primary submit action to avoid confusion.

Place the action near the related field where the action is for with that context is given. Links should be placed usually next or below the related field.

```tsx title="form-link"
import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import {
  Button,
  Inline,
  Link,
  Select,
  Split,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0].id);
  const [name, setName] = useState<string>(venues[0].name);
  const [street, setStreet] = useState<string>(venues[0].street);
  const [postcode, setPostcode] = useState<string>(venues[0].postcode);
  const [city, setCity] = useState<string>(venues[0].city);
  const [country, setCountry] = useState<string>(venues[0].country);

  const uniqueCountries = Array.from(
    new Set(venues.map(venue => venue.country))
  );

  const handleVenueChange = (venueId: string) => {
    setSelectedVenueId(venueId);
    const venue = venues.find(v => v.id === venueId);
    if (venue) {
      setName(venue.name);
      setStreet(venue.street);
      setPostcode(venue.postcode);
      setCity(venue.city);
      setCountry(venue.country);
    }
  };

  const handleReset = () => {
    setSelectedVenueId('');
    setName('');
    setStreet('');
    setPostcode('');
    setCity('');
    setCountry('');
  };

  return (
    <Stack space="group">
      <Inline alignY="input" space="related">
        <Select
          label="Venue"
          selectedKey={selectedVenueId}
          onChange={handleVenueChange}
          width={96}
        >
          {venues.map(venue => (
            <Select.Option key={venue.id} id={venue.id}>
              {venue.name}
            </Select.Option>
          ))}
        </Select>
        <Split />
        <Button variant="secondary" onPress={handleReset}>
          Create new venue
        </Button>
      </Inline>
      <TextField label="Name" value={name} onChange={setName} />
      <TextField label="Street" value={street} onChange={setStreet} />
      <Inline space={5}>
        <TextField
          label="Postcode"
          width={20}
          value={postcode}
          onChange={setPostcode}
        />
        <TextField label="City" width={44} value={city} onChange={setCity} />
      </Inline>
      <Stack space="group">
        <Select
          label="Country"
          placeholder="Select country"
          width={40}
          selectedKey={country}
          onChange={key => setCountry(key as string)}
        >
          {uniqueCountries.map(country => (
            <Select.Option key={country} id={country}>
              {country}
            </Select.Option>
          ))}
        </Select>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${name},${city},${country}`}
          target="_blank"
          size="small"
        >
          Open in maps
        </Link>
      </Stack>
    </Stack>
  );
};
```

### Submit placement

The submit button should be positioned at the bottom of the form, aligned to the left to follow the natural reading flow. Place the primary action first, followed by secondary actions with appropriate spacing.

```tsx title="form-action"
import { Button, Inline } from '@marigold/components';

export default () => (
  <Inline space="related" alignY="center">
    <Button variant="primary">Save</Button>
    <Button variant="secondary">Cancel</Button>
  </Inline>
);
```

## Admin- and Mastermark

Some forms may require special fields that are only accessible to users with administrator or master user roles. These fields should be clearly marked and separated from regular fields to avoid confusion.

You can find a complete usage guide on the [Admin- and Mastermark](/patterns/admin-master-mark) page.

## Full demo

Here is a full example of a well-structured form with sections using the guidelines mentioned above. This is a fictional event registration form that includes various field types, sections, and actions.

[View Demo](/pattern/form)

[View
Code](<https://github.com/marigold-ui/marigold/tree/main/docs/app/(examples)/pattern>)

## Related

- [Form Fields](../../foundations/form-fields) - Here you can find a comprehensive guide for working with form fields.

- [Form Implementation Guide](../../patterns/form-implementation) - Learn how to build forms.
