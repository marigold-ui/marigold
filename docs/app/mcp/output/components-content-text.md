# Text

_Component for displaying text paragraphs_

The `<Text>` component is a fundamental part of Marigold's content components. It is designed to display text in a structured and visually appealing way, making it easy to read and understand.

## Anatomy

The `<Text>` consists of a single element that can be rendered as a `<div>`, `<p>`, or `<span>`. It supports various text properties such as alignment, size, weight, and color.

## AppearanceTable

This component has multiple appearance variants and sizes available.

| Property  | Type                                                                                              | Description                                 |
| :-------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------ |
| `variant` | `default \| muted`                                                                                | `The available variants of this component.` |
| `size`    | `default \| xs \| sm \| base \| lg \| xl \| 2xl \| 3xl \| 4xl \| 5xl \| 6xl \| 7xl \| 8xl \| 9xl` | `The available sizes of this component.`    |

## Usage

The `<Text>` component is intended for all non-heading text, such as main content, detailed descriptions, and text within other components. Use it whenever you need to display standard paragraph text.

✓ Use \<Text> component for paragraphs or other body text.

✗ Don't use the \<Text> component for headings or titles. Use the \<Heading> component instead.

### Rendering as other HTML elements

The `<Text>` component can be rendered as different HTML elements by using the `as` prop. This allows you to change the underlying element without losing the styling and behavior of the `<Text>` component.

- Use a `<p>` tag for paragraphs of text.
- Use a `<span>` for inline text inside a sentence or heading.
- Use a `<div>` for block-level layout elements without paragraph semantics.

### Customizing text

Sometimes you want to highlight text or make it stand out from the rest of the content. The `<Text>` component supports a `color` prop that allows you to change the text color. Also you can set the `weight` and `size` of the text to make it more prominent.

```tsx title="text-color"
import { Text } from '@marigold/components';

export default () => (
  <>
    <Text weight="bold">Ticket #47213 —</Text>
    <Text color="destructive"> Payment not processed</Text>
  </>
);
```

## Props

| Prop             | Type                                                                       | Default          | Description                                                                                                                           |
| :--------------- | :------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| align            | `"none" \| "left" \| "center" \| "right"`                                  | -                | Set the text alignment for the element.                                                                                               |
| aria-describedby | `string`                                                                   | -                | Identifies the element (or elements) that describes the object.                                                                       |
| aria-details     | `string`                                                                   | -                | Identifies the element (or elements) that provide a detailed, extended description for the object.                                    |
| aria-label       | `string`                                                                   | -                | Defines a string value that labels the current element.                                                                               |
| aria-labelledby  | `string`                                                                   | -                | Identifies the element (or elements) that labels the current element.                                                                 |
| as               | `"div" \| "span" \| "p"`                                                   | `"div"`          | Element to render                                                                                                                     |
| children         | `ReactNode`                                                                | -                | The children of the component                                                                                                         |
| color            | `string`                                                                   | `"currentColor"` | Set the text color.                                                                                                                   |
| cursor           | `CursorProp`                                                               | -                | Set the cursor for the element. You can see allowed tokens \[here]\(https\://tailwindcss.com/docs/cursor).                            |
| fontSize         | `FontSizeProp`                                                             | -                | Set the font size for the text element. You can see allowed tokens \[here]\(../../foundations/design-tokens?theme=core#typography).   |
| fontStyle        | `"italic" \| "normal"`                                                     | -                | Set the font style for the text element.                                                                                              |
| id               | `string`                                                                   | -                | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                |
| lineHeight       | `"none" \| "normal" \| "tight" \| "snug" \| "relaxed" \| "loose"`          | -                | Set the line height for the text element.                                                                                             |
| slot             | `string`                                                                   | -                | A slot name for the component. Slots allow the component to receive props from a parent component.                                    |
| weight           | `FontWeightProp`                                                           | -                | Set the font weight for the text element. You can see allowed tokens \[here]\(../../foundations/design-tokens?theme=core#typography). |
| whiteSpace       | `"normal" \| "nowrap" \| "pre" \| "preLine" \| "preWrap" \| "breakSpaces"` | -                | Set how white space inside the element is handled.                                                                                    |
| wrap             | `"wrap" \| "noWrap" \| "balance" \| "pretty"`                              | -                | Set text wrapping behavior.                                                                                                           |

## Alternative Component

- **Headline**: Use the `<Headline>` component for titles and headings. It provides a more semantic structure for text that serves as a title or heading, ensuring better accessibility and SEO.
