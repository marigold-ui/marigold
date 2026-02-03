# Headline

_The title of a content section_

The `<Headline>` component is used to create headings for different sections of content. It is a versatile component that can be styled and structured to fit various design needs while maintaining semantic HTML structure for accessibility and SEO.

## Anatomy

A `<Headline>` component typically consists of a headline element (like `<h1>`, `<h2>`, etc.) that serves as the title for a section of content.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                                                             | Description                                 |
| :-------- | :--------------------------------------------------------------- | :------------------------------------------ |
| `variant` | `-`                                                              | `The available variants of this component.` |
| `size`    | `level-1 \| level-2 \| level-3 \| level-4 \| level-5 \| level-6` | `The available sizes of this component.`    |

## Usage

You should use a `<Headline>` when introducing a new section or page, establishing a clear visual hierarchy, or structuring content with proper semantic headlines like `<h1>` to `<h6>`. It helps guide the reader, improves accessibility for screen readers, and ensures consistent styling across the application. Use it whenever a piece of text needs to stand out as a title or headline within your layout.

```tsx title="headline"
import { Headline, Text } from '@marigold/components';

export default () => (
  <div>
    <Headline level="3">Your Tickets for Summer Festival 2025</Headline>
    <Text>
      Below you’ll find all your purchased tickets and event details. Please
      present your QR code at the entrance. If you have any questions, contact
      our support team.
    </Text>
  </div>
);
```

### Hierarchy

The hierarchy in the `<Headline>` component is essential for both usability and accessibility. Visually, it guides users through the content by clearly indicating the structure of a page—larger, more prominent headlines signal more important sections, while smaller ones denote subsections.

You should use the `level` prop (or `size`) to define the headline level, which corresponds to HTML headline tags (`h1`, `h2`, etc.).

✓ Use headline levels in sequential order that matches the content structure.

✗ Avoid skipping headline levels (e.g., from \<h1> directly to \<h4>) to keep your content hierarchy meaningful and accessible.

## Props

| Prop             | Type                                                                   | Default  | Description                                                                                                            |
| :--------------- | :--------------------------------------------------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| align            | `"none" \| "left" \| "center" \| "right"`                              | `"left"` | Set the text alignment for the element.                                                                                |
| aria-describedby | `string`                                                               | -        | Identifies the element (or elements) that describes the object.                                                        |
| aria-details     | `string`                                                               | -        | Identifies the element (or elements) that provide a detailed, extended description for the object.                     |
| aria-label       | `string`                                                               | -        | Defines a string value that labels the current element.                                                                |
| aria-labelledby  | `string`                                                               | -        | Identifies the element (or elements) that labels the current element.                                                  |
| children         | `ReactNode`                                                            | -        | Children of the component.                                                                                             |
| color            | `string`                                                               | -        | Set the color of the headline.                                                                                         |
| id               | `string`                                                               | -        | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| level            | `"1" \| "2" \| "3" \| "4" \| "5" \| "6" \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1`      | Set a different level.                                                                                                 |
| lineHeight       | `"none" \| "tight" \| "snug" \| "normal" \| "relaxed" \| "loose"`      | -        | Set the line height for the text element.                                                                              |
| slot             | `string`                                                               | -        | A slot to place the element in.                                                                                        |

## Alternative components

- `<Text>`: If you want to display a simple text without any headline structure.
