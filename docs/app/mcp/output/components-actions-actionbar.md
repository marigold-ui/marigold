# ActionBar

_Used for single and bulk actions_

The `<ActionBar>` component...

## Anatomy

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type | Description                                 |
| :-------- | :--- | :------------------------------------------ |
| `variant` | `-`  | `The available variants of this component.` |
| `size`    | `-`  | `The available sizes of this component.`    |

## Usage

## Props

| Prop              | Type              | Default | Description                                                                                            |
| :---------------- | :---------------- | :------ | :----------------------------------------------------------------------------------------------------- |
| children          | `ReactNode`       | -       | A list of ActionButtons to display.                                                                    |
| id                | `string`          | -       | The element's unique identifier.                                                                       |
| onClearSelection  | `(() => void)`    | -       | Handler that is called when the ActionBar clear button is pressed.                                     |
| selectedItemCount | `number \| "all"` | `0`     | The number of selected items that the ActionBar is currently linked to. If 0, the ActionBar is hidden. |

## Related
