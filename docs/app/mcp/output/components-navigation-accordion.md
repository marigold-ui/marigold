# Accordion

_Component to show and hide related content from the main page._

An `<Accordion>` is a component that allows you to organizing content into collapsible sections. Accordions are commonly used in website and application designs to present information in a compact and organized way, allowing users to focus on the specific information they are interested in without being overwhelmed by excessive content.

## Anatomy

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type              | Description                                 |
| :-------- | :---------------- | :------------------------------------------ |
| `variant` | `default \| card` | `The available variants of this component.` |
| `size`    | `-`               | `The available sizes of this component.`    |

## Usage

An `<Accordion>` is a UI component that allows users to expand and collapse sections of content. It helps in organizing information efficiently, improving navigation, and reducing visual clutter. Common use cases include FAQs, structured data presentation, and collapsible navigation menus.

While accordions are a great tool for managing content, they are not always the best solution. In cases where users need frequent access to key information, hiding it behind an interaction can create unnecessary friction. Similarly, for long or complex content, expanding a section may lead to overwhelming amounts of text rather than improving readability. Navigation menus with only a few items may not benefit from collapsible sections, as this adds clicks rather than streamlining access. Finally, for processes requiring users to follow a specific sequence, a step-by-step layout is often more effective than collapsible sections.

### Content Organization

Accordions help structure content by breaking it into collapsible sections, making navigation easier while preventing cognitive overload. They are particularly useful when dealing with large amounts of information that do not need to be viewed all at once.

```tsx title="accordion-content"
import { Accordion } from '@marigold/components';

export default () => {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Is here a large amount of text?</Accordion.Header>
        <Accordion.Content>
          This is a large amount of text. When we say "large amount," we mean a
          substantial, considerable, and voluminous quantity of words,
          sentences, and paragraphs that stretch on in a way that one might
          describe as lengthy, extensive, or even exhaustive. This text will
          meander through ideas, concepts, and descriptions, filling space with
          a sheer abundance of verbiage meant to illustrate just how much text
          can be included in a single response. To begin, let's explore the
          nature of large texts. What makes a text large? Is it simply the
          number of words, or is there an element of density that contributes to
          its perceived length? A novel, for instance, is often regarded as
          long, but the complexity of its content can make it feel either longer
          or shorter depending on the reader's engagement. A technical manual,
          despite having fewer words than a novel, might seem insurmountably
          long due to the complexity of the information it conveys. If we
          consider word count alone, we might look at examples such as epic
          poems—Homer's Iliad and Odyssey, Dante’s Inferno, or Paradise Lost by
          John Milton—each containing thousands of lines of intricate poetry. In
          contrast, modern novels like War and Peace by Leo Tolstoy, Les
          Misérables by Victor Hugo, or Infinite Jest by David Foster Wallace
          are all known for their massive word counts, often surpassing several
          hundred thousand words. Beyond literature, let’s think about other
          forms of text that can be considered large. Scientific research
          papers, encyclopedic entries, legal documents, and government
          regulations all contribute to the vast sea of extensive writings that
          exist in the world. Consider the IRS tax code, a document so long and
          convoluted that even experts struggle to fully comprehend it. Or
          Wikipedia, a massive and continuously expanding online encyclopedia
          with millions of articles covering every conceivable topic. Another
          interesting example of lengthy texts is programming documentation.
          Developers and engineers often rely on massive collections of text to
          understand how software and programming languages function. The Python
          documentation, for example, spans thousands of pages when printed,
          detailing every function, method, and library available to users.
          Similarly, legal contracts, privacy policies, and terms of service
          agreements are infamous for their verbosity, often discouraging
          readers from fully engaging with them due to their overwhelming size.
          Returning to literature, serialization is another method that produces
          large texts over time. Charles Dickens, for instance, published many
          of his novels in serialized form, gradually compiling them into
          lengthy books. Modern web novels and fan fiction follow a similar
          trend, with some stories reaching millions of words as authors
          continuously add new chapters over time. History, too, is filled with
          examples of large texts. Ancient religious scriptures such as the
          Bible, the Quran, and the Mahabharata are all extensive, spanning
          numerous books, chapters, and verses. Historians and scholars have
          devoted lifetimes to studying these works, analyzing their meaning,
          historical context, and impact on civilizations. The digital age has
          only increased the prevalence of large texts. Social media, despite
          favoring short-form content, has led to the proliferation of long
          threads, deep-dive articles, and detailed blog posts. Online forums
          such as Reddit contain countless lengthy discussions, debates, and
          personal stories, often surpassing the length of traditional written
          works. The rise of self-publishing has further contributed to an
          explosion of large texts, as authors no longer need to adhere to the
          constraints imposed by traditional publishers. Even in everyday life,
          we encounter large amounts of text more often than we realize. Think
          about the fine print on contracts, instruction manuals for household
          appliances, and the endless documentation required for bureaucratic
          processes. We are surrounded by vast quantities of written
          information, whether we engage with it fully or merely skim its
          surface. To conclude, a large amount of text is more than just a high
          word count—it’s a reflection of complexity, density, and the human
          need to document, explain, and communicate. From literature to legal
          documents, from programming guides to social media discussions, the
          world is full of extensive writings that serve countless purposes. And
          with that, this response itself has become a testament to the sheer
          possibility of generating a large amount of text, filling space with
          words, phrases, and ideas that continue to flow as long as there is
          something to say.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>What is your return policy?</Accordion.Header>
        <Accordion.Content>
          We offer a 30-day return policy with a full refund.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>How do I track my order?</Accordion.Header>
        <Accordion.Content>
          You can track your order through our tracking portal.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
```

### Using Forms

For complex forms, accordions can group related fields into sections, reducing visual clutter and making the completion process more intuitive. This is particularly beneficial for multi-step or conditional forms where not all fields need to be shown at once.

```tsx title="accordion-form"
import { Accordion, TextField } from '@marigold/components';

export default function FormAccordion() {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Personal Information</Accordion.Header>
        <Accordion.Content>
          <TextField type="text" label="Name" />
          <TextField type="email" label="Email" />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Billing Details</Accordion.Header>
        <Accordion.Content>
          <TextField type="text" label="Card Number" />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
```

### Multiple expanded

With the multiple expanded mode, you can collapse and hide items as needed while keeping several sections open at the same time. You can also set one or more `defaultExpandedKeys`. Use a multiple expanded accordion when users need to view several sections simultaneously, such as comparing information or accessing related FAQs. It works best when the content is concise and users benefit from having multiple sections open at once without losing context.

```tsx title="multi-select-accordion"
import {
  Accordion,
  Inline,
  NumberField,
  Stack,
  Text,
  TextField,
} from '@marigold/components';
import { Accessible, Parking, SettingDots } from '@marigold/icons';

export default () => {
  const items = [
    {
      id: 'one',
      key: 'one',
      textValue: 'Parking passes',
      title: (
        <Inline space={2} alignY="center">
          <Parking />
          <Text fontStyle="normal">Parking passes</Text>
        </Inline>
      ),
      children: (
        <Stack space={2}>
          <TextField
            label="Parking Slots"
            description="Available parking passes"
          />
          <NumberField
            label="Costs"
            description="Amount in euros"
            defaultValue={5}
            formatOptions={{
              style: 'currency',
              currency: 'EUR',
            }}
          />
        </Stack>
      ),
    },
    {
      id: 'two',
      key: 'two',
      textValue: 'Handicapped parking spaces',
      title: (
        <Inline space={2} alignY="center">
          <Accessible />
          <Text fontStyle="normal">Handicapped parking spaces</Text>
        </Inline>
      ),
      children: (
        <Stack space={2}>
          <TextField
            label="Parking Slots"
            description="Available parking passes"
          />
          <NumberField
            label="Costs"
            description="Amount in euros"
            defaultValue={5}
            formatOptions={{
              style: 'currency',
              currency: 'EUR',
            }}
          />
        </Stack>
      ),
    },
    {
      id: 'tree',
      key: 'tree',
      textValue: 'Settings',
      title: (
        <Inline space={2} alignY="center">
          <SettingDots />
          <Text fontStyle="normal">Settings</Text>
        </Inline>
      ),
      children: (
        <TextField
          label="Parking Stations"
          description="Available parking stations"
        />
      ),
    },
  ];

  return (
    <Accordion allowsMultipleExpanded defaultExpandedKeys={['two']}>
      {items.map(item => (
        <Accordion.Item id={item.id} key={item.key}>
          <Accordion.Header>{item.title} </Accordion.Header>
          <Accordion.Content>{item.children}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
```

### Controlled Accordion

A controlled `Accordion` can be expanded and collapsed using expandedKeys and onExpandedChange. The expandedKeys must match the id on the `Accordion.Item` component(s) that you wish to expand.

```tsx title="accordion-controlled-expanded"
import { useState } from 'react';
import { Key } from '@react-types/shared';
import { Accordion, TextField } from '@marigold/components';

export default () => {
  let [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
    new Set(['personal'])
  );

  return (
    <>
      <Accordion expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
        <Accordion.Item id="personal">
          <Accordion.Header>Personal Information</Accordion.Header>
          <Accordion.Content>
            <TextField type="text" label="Name" />
            <TextField type="email" label="Email" />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="billing">
          <Accordion.Header>Billing Details</Accordion.Header>
          <Accordion.Content>
            <TextField type="text" label="Card Number" />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <div style={{ marginTop: '20px' }}>You have expanded: {expandedKeys}</div>
    </>
  );
};
```

### Long-form content

For Accordions with a lot of content inside it is handy to use the prop `stickyHeader` to provide context. While scrolling through the content the headline stays fixed at the top of the viewport.
The `stickyHeader`applies to the entire Accordion: `<Accordion stickyHeader={true}>...</Accordion>`.

### Icon position

The icon or chevron in the Header of the `Accordion` can be positioned `right` and `left`. Especially when you use action in the header the position should be on the `left` side.
The icon position also applied to the whole Accordion: `<Accordion iconPositon={'left'}>...</Accordion>`.

```tsx title="accordion-icon-position"
import { Accordion, Stack } from '@marigold/components';

export default () => {
  return (
    <Stack space={8}>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Default icon placement</Accordion.Header>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Default icon placement #2</Accordion.Header>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Accordion iconPosition="left">
        <Accordion.Item>
          <Accordion.Header>Left icon placement</Accordion.Header>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Left icon placement #2</Accordion.Header>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
};
```

## Props

### Accordion

| Prop                        | Type                     | Default                        | Description                                                                                                                                                                           |
| :-------------------------- | :----------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allowsMultipleExpanded      | `boolean`                | -                              | Whether multiple items can be expanded at the same time.                                                                                                                              |
| children                    | `ChildrenOrFunction`     | -                              | The children of the component. A function may be provided to alter the children based on component state.                                                                             |
| className                   | `ClassNameOrFunction`    | `'react-aria-DisclosureGroup'` | The CSS \[className]\(https\://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| defaultExpandedKeys         | `Iterable`               | -                              | The initial expanded keys in the group (uncontrolled).                                                                                                                                |
| dir                         | `string`                 | -                              |                                                                                                                                                                                       |
| disabled                    | `boolean`                | -                              | Whether all items are disabled.                                                                                                                                                       |
| expandedKeys                | `Iterable`               | -                              | The currently expanded keys in the group (controlled).                                                                                                                                |
| hidden                      | `boolean`                | -                              |                                                                                                                                                                                       |
| iconPosition                | `"right" \| "left"`      | `"right"`                      | Position of the icon in the header.                                                                                                                                                   |
| id                          | `string`                 | -                              | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                |
| inert                       | `boolean`                | -                              |                                                                                                                                                                                       |
| lang                        | `string`                 | -                              |                                                                                                                                                                                       |
| onAnimationEnd              | `AnimationEventHandler`  | -                              |                                                                                                                                                                                       |
| onAnimationEndCapture       | `AnimationEventHandler`  | -                              |                                                                                                                                                                                       |
| onAnimationIteration        | `AnimationEventHandler`  | -                              |                                                                                                                                                                                       |
| onAnimationIterationCapture | `AnimationEventHandler`  | -                              |                                                                                                                                                                                       |
| onAnimationStart            | `AnimationEventHandler`  | -                              |                                                                                                                                                                                       |
| onAnimationStartCapture     | `AnimationEventHandler`  | -                              |                                                                                                                                                                                       |
| onAuxClick                  | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onAuxClickCapture           | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onClick                     | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onClickCapture              | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onContextMenu               | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onContextMenuCapture        | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onDoubleClick               | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onDoubleClickCapture        | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onExpandedChange            | `((keys: Set) => any)`   | -                              | Handler that is called when items are expanded or collapsed.                                                                                                                          |
| onGotPointerCapture         | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onGotPointerCaptureCapture  | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onLostPointerCapture        | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onLostPointerCaptureCapture | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onMouseDown                 | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseDownCapture          | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseEnter                | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseLeave                | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseMove                 | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseMoveCapture          | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseOut                  | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseOutCapture           | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseOver                 | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseOverCapture          | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseUp                   | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onMouseUpCapture            | `MouseEventHandler`      | -                              |                                                                                                                                                                                       |
| onPointerCancel             | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerCancelCapture      | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerDown               | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerDownCapture        | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerEnter              | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerLeave              | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerMove               | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerMoveCapture        | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerOut                | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerOutCapture         | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerOver               | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerOverCapture        | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerUp                 | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onPointerUpCapture          | `PointerEventHandler`    | -                              |                                                                                                                                                                                       |
| onScroll                    | `UIEventHandler`         | -                              |                                                                                                                                                                                       |
| onScrollCapture             | `UIEventHandler`         | -                              |                                                                                                                                                                                       |
| onTouchCancel               | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTouchCancelCapture        | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTouchEnd                  | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTouchEndCapture           | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTouchMove                 | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTouchMoveCapture          | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTouchStart                | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTouchStartCapture         | `TouchEventHandler`      | -                              |                                                                                                                                                                                       |
| onTransitionCancel          | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onTransitionCancelCapture   | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onTransitionEnd             | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onTransitionEndCapture      | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onTransitionRun             | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onTransitionRunCapture      | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onTransitionStart           | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onTransitionStartCapture    | `TransitionEventHandler` | -                              |                                                                                                                                                                                       |
| onWheel                     | `WheelEventHandler`      | -                              |                                                                                                                                                                                       |
| onWheelCapture              | `WheelEventHandler`      | -                              |                                                                                                                                                                                       |
| stickyHeader                | `boolean`                | `"false"`                      | Whether the header should stick to the top when scrolling.                                                                                                                            |
| translate                   | `"yes" \| "no"`          | -                              |                                                                                                                                                                                       |

### Accordion.Item

| Prop                        | Type                              | Default                   | Description                                                                                                                                                                                                        |
| :-------------------------- | :-------------------------------- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                    | `ChildrenOrFunction`              | -                         | The children of the component. A function may be provided to alter the children based on component state.                                                                                                          |
| className                   | `ClassNameOrFunction`             | `'react-aria-Disclosure'` | The CSS \[className]\(https\://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state.                              |
| defaultExpanded             | `boolean`                         | -                         | Whether the disclosure is expanded by default (uncontrolled).                                                                                                                                                      |
| dir                         | `string`                          | -                         |                                                                                                                                                                                                                    |
| disabled                    | `boolean`                         | -                         | Whether the item is disabled.                                                                                                                                                                                      |
| expanded                    | `boolean`                         | -                         | Whether the item is expanded (controlled).                                                                                                                                                                         |
| hidden                      | `boolean`                         | -                         |                                                                                                                                                                                                                    |
| id                          | `Key`                             | -                         | An id for the disclosure when used within a DisclosureGroup, matching the id used in \`expandedKeys\`.                                                                                                             |
| inert                       | `boolean`                         | -                         |                                                                                                                                                                                                                    |
| lang                        | `string`                          | -                         |                                                                                                                                                                                                                    |
| onAnimationEnd              | `AnimationEventHandler`           | -                         |                                                                                                                                                                                                                    |
| onAnimationEndCapture       | `AnimationEventHandler`           | -                         |                                                                                                                                                                                                                    |
| onAnimationIteration        | `AnimationEventHandler`           | -                         |                                                                                                                                                                                                                    |
| onAnimationIterationCapture | `AnimationEventHandler`           | -                         |                                                                                                                                                                                                                    |
| onAnimationStart            | `AnimationEventHandler`           | -                         |                                                                                                                                                                                                                    |
| onAnimationStartCapture     | `AnimationEventHandler`           | -                         |                                                                                                                                                                                                                    |
| onAuxClick                  | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onAuxClickCapture           | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onClick                     | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onClickCapture              | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onContextMenu               | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onContextMenuCapture        | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onDoubleClick               | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onDoubleClickCapture        | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onExpandedChange            | `((isExpanded: boolean) => void)` | -                         | Handler that is called when the disclosure's expanded state changes.                                                                                                                                               |
| onGotPointerCapture         | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onGotPointerCaptureCapture  | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onLostPointerCapture        | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onLostPointerCaptureCapture | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onMouseDown                 | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseDownCapture          | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseEnter                | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseLeave                | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseMove                 | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseMoveCapture          | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseOut                  | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseOutCapture           | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseOver                 | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseOverCapture          | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseUp                   | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onMouseUpCapture            | `MouseEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onPointerCancel             | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerCancelCapture      | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerDown               | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerDownCapture        | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerEnter              | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerLeave              | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerMove               | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerMoveCapture        | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerOut                | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerOutCapture         | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerOver               | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerOverCapture        | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerUp                 | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onPointerUpCapture          | `PointerEventHandler`             | -                         |                                                                                                                                                                                                                    |
| onScroll                    | `UIEventHandler`                  | -                         |                                                                                                                                                                                                                    |
| onScrollCapture             | `UIEventHandler`                  | -                         |                                                                                                                                                                                                                    |
| onTouchCancel               | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTouchCancelCapture        | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTouchEnd                  | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTouchEndCapture           | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTouchMove                 | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTouchMoveCapture          | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTouchStart                | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTouchStartCapture         | `TouchEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onTransitionCancel          | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onTransitionCancelCapture   | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onTransitionEnd             | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onTransitionEndCapture      | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onTransitionRun             | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onTransitionRunCapture      | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onTransitionStart           | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onTransitionStartCapture    | `TransitionEventHandler`          | -                         |                                                                                                                                                                                                                    |
| onWheel                     | `WheelEventHandler`               | -                         |                                                                                                                                                                                                                    |
| onWheelCapture              | `WheelEventHandler`               | -                         |                                                                                                                                                                                                                    |
| slot                        | `string \| null`                  | -                         | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit \`null\` value indicates that the local props completely override all props received from a parent. |
| translate                   | `"yes" \| "no"`                   | -                         |                                                                                                                                                                                                                    |
