# Installation

_How to setup and get started with Marigold._

To integrate Marigold into your React app, follow the steps outlined below. Marigold provides a wide range of pre-designed UI components. However, Marigold's components come with no styling by default. To ensure a perfect fit with your product's appearance, you must also install one of the predefined themes.

Please bear in mind that certain steps may vary depending on your specific setup. You can find examples for the most common setups down below.

> ℹ️ Good to know!: Experience Marigold right away by trying it out in our interactive
> playground!

## Installation

Begin by instaling the core Marigold package (`@marigold/components`) into your app using your preferred package manager. This package is always required, regardless of the theme you choose to apply later.

Execute the following command in your project's directory:

#### npm

```bash
npm install @marigold/components --save
```

#### pnpm

```bash
pnpm add @marigold/components
```

#### yarn

```bash
yarn add @marigold/components
```

## Tooling

Marigold effortlessly integrates with popular bundlers such as [webpack](https://webpack.js.org/), [rollup](https://rollupjs.org/), [esbuild](https://esbuild.github.io/), and [vite](https://vitejs.dev/), as well as frameworks like [Next.js](https://nextjs.org/), without requiring any additional configurations.

That being said, we strongly recommend adhering to the guidance provided by the React Team. If you are creating a new app or a site entirely with React, it is advisable to use a framework. You can find more details about this recommendation in the [React
docs](https://react.dev/learn/start-a-new-react-project).

Furthermore, if you are using TypeScript, ensure that you add `@types/react` and `@types/react-dom` to your project. Marigold's components are fully typed, enabling you to benefit from static type checking and IDE autocomplete features for enhanced development efficiency.

## Bootstrapping

To set up Marigold in your project, you have two options based on the scale and needs of your app. Regardless of the chosen setup, it is essential to add the `<MarigoldProvider>` to your application's root. This ensures that components can access the theme and apply their corresponding styles.

### Using the provided CSS file

The easiest way to start is by using the provided CSS file that comes with each theme. While this method allows for a quick start, it does not offer customization options beyond using the provided design tokens. This setup is sufficient for smaller and simpler applications.

```jsx
/**
 * 1. Import the CSS file and theme
 */
import theme from '@marigold/theme-rui';
import '@marigold/theme-rui/styles.css';

/**
 * 2. Import the MarigoldProvider
 */
import { MarigoldProvider } from '@marigold/components';

/**
 * 3. Wrap your app into the MarigoldProvider
 *    and pass it the selected theme
 */
export const App = () => (
  <MarigoldProvider theme={theme}>{/* Your App */}}</MarigoldProvider>
);
```

### Using Tailwind CSS

However, if you want to maximize the benefits of Marigold, you should install Tailwind CSS alongside Marigold. This combination not only enables customization and extension of the selected theme but also allows you to take full advantage of Tailwind's features while staying true to our design system.

To set up Tailwind CSS, please refer to the official [installation guide](https://tailwindcss.com/docs/installation). Once you have completed the installation, you should create a CSS file with the following informations:

```css
@import 'tailwindcss';

/* Import the theme from Marigold */
@import '../node_modules/@marigold/theme-rui/theme.css';

/* You need to add the path to the marigold packages */
@source '../node_modules/@marigold/components';
/* If Tailwind does not automatically detect classnames, dont forget to add the glob for your app here */
@source '../path/to/your/app';
```

If you are using `Vite` you also need to add the `tailwindcss` plugin to your `vite.config.ts`, you can find all installation steps in the [tailwind documentation](https://tailwindcss.com/docs/installation/using-vite).

When you have a `Next.js` or other framework based application make sure that you have a `postcss.config.js` file with the following content in your project:

```js
module.exports = {
  plugins: {
    tailwindcss(),
  },
};
```

> ℹ️ TypeScript Configuration: If you are using TypeScript, make sure to set the module
> resolution to
> `'nodenext'` since the theme packages are using ESM.

After configuring Tailwind CSS, wrap your app with the MarigoldProvider. Unlike before, you no longer have to import the CSS file of the selected theme separately you only need to import your own created CSS file in the project.

Tailwind CSS will automatically generate the required CSS for you. However, remember to import the generated CSS file somewhere in your project. Depending on your setup, this is typically done in the root file where you bootstrap React or, in case of Next.js in our root [layout file](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts).

```jsx
/**
 * 1. Import the CSS file and theme
 */
/**
 * 2. Import the MarigoldProvider
 */
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

/**
 * 3. Wrap your app into the MarigoldProvider
 *    and pass it the selected theme
 */
export const App = () => (
  <MarigoldProvider theme={theme}>{/* Your App */}}</MarigoldProvider>
);
```

### Adding fonts

The RUI theme is designed to utilize custom web fonts. To incorporate these fonts, you have two options:

1. Use [Font Source](https://fontsource.org/) to add them.
1. If you are using Next.js, take advantage of `next/font`, which not only takes care of loading the font but also optimizes the used fonts. You can find more information on loading custom web fonts in Next.js [here](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts).

To load the Inter font with Font Source when using with the RUI theme, you can follow the steps below:

First, add the font as a dependency to your project:

#### npm

```bash
npm install @fontsource-variable/inter --save
```

#### pnpm

```bash
pnpm add @fontsource-variable/inter
```

#### yarn

```bash
yarn add @fontsource-variable/inter
```

Afterwards, import the package into your project.

```js
// Supports weights 100-900
import '@fontsource-variable/inter';
```

## Next steps

Now that you've bootstrapped your app, you can dive into the documentation to [explore the available components](/components/overview) in detail. Additionally, you can read about our principles to understand the driving factors behind our decisions and the constraints associated with our approach.
