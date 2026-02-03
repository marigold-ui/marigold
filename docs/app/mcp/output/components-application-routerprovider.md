# RouterProvider

_Provider for easier handling routing._

The [`<RouterProvider>`](https://react-spectrum.adobe.com/react-aria/routing.html) is a component from `react-aria-components` which we expose to give you something on the hand to handle your routes in your application.

## Usage

The `<RouterProvider>` is a context provider that integrates React Aria's navigation system with your router (like React Router, Next.js, or custom routing). It enables accessibility-aware navigation by informing components (like `<Link>` and `useRouter`) about the current location and navigation methods.

### React Router

You can use the provider with the `useNavigate` hook from `react-router-dom`. The outcome from the function you can pass into the `navigate` prop from the `<RouterProvider>`.

If you want to read more about it visit react arias documentation about it [here](https://react-spectrum.adobe.com/react-aria/routing.html#react-router).

### Next.js

Similar to React Router you can pass in the `navigate` prop the routes you get from the `useRouter` hook.

Also for more information please visit react arias documentation about it [here](https://react-spectrum.adobe.com/react-aria/routing.html#nextjs).

## Props

| Prop                    | Type                                               | Default | Description |
| :---------------------- | :------------------------------------------------- | :------ | :---------- |
| **children (required)** | `ReactNode`                                        | -       |             |
| **navigate (required)** | `(path: string, routerOptions: undefined) => void` | -       |             |
| useHref                 | `((href: string) => string)`                       | -       |             |
