# Design Tokens

_Here are all design tokens for each theme listet._

Design tokens are the foundational elements of our design system, defining key aspects of our product's visual language. They enable consistency and flexibility, allowing us to maintain a unified look and feel across all user interfaces.

## Colors

Our color tokens are organized by their functional role, making it easy to apply the right color for backgrounds, text, borders, and more. This structured approach not only maintains a consistent and recognizable palette but also supports dynamic theming and customization.

If you are not sure which token to use, please visit our [design token guideline page](/getting-started/design-token-guidelines).

### Blue

| Name     |
| :------- |
| blue-50  |
| blue-100 |
| blue-200 |
| blue-300 |
| blue-400 |
| blue-500 |
| blue-600 |
| blue-700 |
| blue-800 |
| blue-900 |
| blue-950 |

### Green

| Name      |
| :-------- |
| green-50  |
| green-100 |
| green-200 |
| green-300 |
| green-400 |
| green-500 |
| green-600 |
| green-700 |
| green-800 |
| green-900 |
| green-950 |

### Orange

| Name       |
| :--------- |
| orange-50  |
| orange-100 |
| orange-200 |
| orange-300 |
| orange-400 |
| orange-500 |
| orange-600 |
| orange-700 |
| orange-800 |
| orange-900 |
| orange-950 |

### Purple

| Name       |
| :--------- |
| purple-50  |
| purple-100 |
| purple-200 |
| purple-300 |
| purple-400 |
| purple-500 |
| purple-600 |
| purple-700 |
| purple-800 |
| purple-900 |
| purple-950 |

### Red

| Name    |
| :------ |
| red-50  |
| red-100 |
| red-200 |
| red-300 |
| red-400 |
| red-500 |
| red-600 |
| red-700 |
| red-800 |
| red-900 |
| red-950 |

### Stone

| Name      |
| :-------- |
| stone-50  |
| stone-100 |
| stone-200 |
| stone-300 |
| stone-400 |
| stone-500 |
| stone-600 |
| stone-700 |
| stone-800 |
| stone-900 |
| stone-950 |

### Yellow

| Name       |
| :--------- |
| yellow-50  |
| yellow-100 |
| yellow-200 |
| yellow-300 |
| yellow-400 |
| yellow-500 |
| yellow-600 |
| yellow-700 |
| yellow-800 |
| yellow-900 |
| yellow-950 |

### Base Semantic Tokens

| Name                 |
| :------------------- |
| background           |
| border               |
| brand                |
| brand-foreground     |
| focus                |
| foreground           |
| hover                |
| hover-foreground     |
| link                 |
| scrollbar            |
| scrollbar-hover      |
| scrollbar-track      |
| secondary            |
| secondary-foreground |
| selected             |
| surface              |
| surface-border       |

### Feedback Semantic Tokens

| Name                         |
| :--------------------------- |
| access-admin                 |
| access-admin-foreground      |
| access-master                |
| access-master-foreground     |
| destructive                  |
| destructive-foreground       |
| destructive-muted            |
| destructive-muted-accent     |
| destructive-muted-foreground |
| info                         |
| info-foreground              |
| info-muted                   |
| info-muted-accent            |
| info-muted-foreground        |
| success                      |
| success-foreground           |
| success-muted                |
| success-muted-accent         |
| success-muted-foreground     |
| warning                      |
| warning-foreground           |
| warning-muted                |
| warning-muted-accent         |
| warning-muted-foreground     |

### State Semantic Tokens

| Name                |
| :------------------ |
| disabled            |
| disabled-foreground |
| input               |
| muted               |
| muted-foreground    |
| placeholder         |
| ring                |

## Typography

With a defined font family and various font sizes and weights, our typography maintains readability and hierarchy. The consistent use of typography contributes to a polished and cohesive user experience.
For formatting dates or numbers we already have some helper components: [NumericFormat](../components/formatters/numericformat), [DateFormat](../components/formatters/dateformat).

The `Value` corresponds to the class name from [Tailwind CSS](https://tailwindcss.com/docs/font-size).

We have tokens for:

#### Font Size

| Name | Value     |
| :--- | :-------- |
| xs   | text-xs   |
| sm   | text-sm   |
| base | text-base |
| lg   | text-lg   |
| xl   | text-xl   |
| 2xl  | text-2xl  |
| 3xl  | text-3xl  |
| 4xl  | text-4xl  |
| 5xl  | text-5xl  |
| 6xl  | text-6xl  |
| 7xl  | text-7xl  |
| 8xl  | text-8xl  |
| 9xl  | text-9xl  |

#### Font Weight

| Name       | Value           |
| :--------- | :-------------- |
| thin       | font-thin       |
| extralight | font-extralight |
| light      | font-light      |
| regular    | font-normal     |
| medium     | font-medium     |
| semibold   | font-semibold   |
| bold       | font-bold       |
| extrabold  | font-extrabold  |
| black      | font-black      |

#### Font Style

| Name   | Value      |
| :----- | :--------- |
| italic | italic     |
| normal | not-italic |

#### Text Align

| Name   | Value       |
| :----- | :---------- |
| none   | undefined   |
| left   | text-left   |
| center | text-center |
| right  | text-right  |

### Headlines

The `<Headline>` component supports by default certain styles. They are listed as Tailwind class names.

| Level   | Styles                  |
| :------ | :---------------------- |
| level-1 | text-3xl font-extrabold |
| level-2 | text-2xl font-bold      |
| level-3 | text-xl font-semibold   |
| level-4 | text-lg font-semibold   |
| level-5 | text-base font-medium   |
| level-6 | text-base font-normal   |

## Spacing

Consistent spacing ensures harmonious layouts and enhances visual flow. The defined spacing scale helps create balanced and accessible interfaces across different screen sizes. It's used for `gap`, `padding`, `width` and `margin`.

| Name | Value |
| :--- | :---- |
| 0    | 0px   |
| 0.5  | 2px   |
| 1    | 4px   |
| 1.5  | 6px   |
| 2    | 8px   |
| 2.5  | 10px  |
| 3    | 12px  |
| 3.5  | 14px  |
| 4    | 16px  |
| 5    | 20px  |
| 6    | 24px  |
| 7    | 28px  |
| 8    | 32px  |
| 9    | 36px  |
| 10   | 40px  |
| 11   | 44px  |
| 12   | 48px  |
| 14   | 56px  |
| 16   | 64px  |
| 20   | 80px  |
| 24   | 96px  |
| 28   | 112px |
| 32   | 128px |
| 36   | 144px |
| 40   | 160px |
| 44   | 176px |
| 48   | 192px |
| 52   | 208px |
| 56   | 224px |
| 60   | 240px |
| 64   | 256px |
| 72   | 288px |
| 80   | 320px |
| 96   | 384px |

Besides this there are percentage values available for `width` property, which is found in form components. You can use them similar to the tokens above. Here is a list of the values: [Tailwind percentage tokens](https://tailwindcss.com/docs/width#percentage-widths)

## Radius

Standardized border radius contribute to a clean and modern design. These properties are applied to components, ensuring a cohesive appearance throughout our product.

| Name         | Value  |
| :----------- | :----- |
| rounded-sm   | 2px    |
| rounded-md   | 6px    |
| rounded-lg   | 8px    |
| rounded-xl   | 12px   |
| rounded-2xl  | 16px   |
| rounded-full | 9999px |

## Alignment

Consistent alignment ensures that elements are arranged in a purposeful manner, enhancing clarity and user comprehension.

#### Horizontal

| Value   |
| :------ |
| left    |
| center  |
| right   |
| between |
| around  |
| evenly  |

#### Vertical

| Value   |
| :------ |
| top     |
| center  |
| bottom  |
| between |
| around  |
| evenly  |
