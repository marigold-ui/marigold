# Badge

_Component for short notes with one color as status messages_

A `<Badge>` is a content component. This component can be used to reflect status messages via a short note and a color.

## Anatomy

It consists of a container and the content can either be a text or an icon.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                                                                           | Description                                 |
| :-------- | :----------------------------------------------------------------------------- | :------------------------------------------ |
| `variant` | `default \| primary \| success \| warning \| info \| error \| admin \| master` | `The available variants of this component.` |
| `size`    | `-`                                                                            | `The available sizes of this component.`    |

## Usage

A `<Badge>` is a component used to provide information on new updates and notifications. It is used with other components and cannot be used alone. The content of a badge can be arbitrary, but it is preferred to use a string and/or a icon.

### Text Label Length

The Badge is a simple and compact component for use in a limited space in the context of more complex components. When it includes a text label, make sure it fits into the dedicated space.

✓ Use short and precise text labels.

✗ Don't use long descriptions for labels.

### Color

As the Badge is used as an indicator, its color must be precise and relevant to the message that the badge conveys.

✓ Use the colors wisely and according to the meaning that the Badge implies.

✗ Avoid using arbitrary colors that would not match the message that the Badge conveys.

## Props

| Prop     | Type        | Default | Description               |
| :------- | :---------- | :------ | :------------------------ |
| children | `ReactNode` | -       | Children of the component |

## Related

- [Admin- & master mark](/patterns/admin-master-mark) - Used for marking internal-only features.
