import { useState } from 'react';
import { RouterProvider, Stack, Stepper, Text } from '@marigold/components';

const ROUTES = [
  { id: 'signin', label: 'Sign in', href: '/checkout/signin' },
  { id: 'plan', label: 'Choose plan', href: '/checkout/plan' },
  { id: 'pay', label: 'Pay', href: '/checkout/pay' },
];

export default () => {
  const [path, setPath] = useState('/checkout/plan');
  const [visited, setVisited] = useState(['/checkout/signin']);
  const current = ROUTES.find(route => route.href === path) ?? ROUTES[0];

  const navigate = (href: string) => {
    setVisited(paths => (paths.includes(path) ? paths : [...paths, path]));
    setPath(href);
  };

  return (
    <RouterProvider navigate={navigate}>
      <Stack space={4}>
        <Stepper
          aria-label="Checkout progress"
          selectedKey={current.id}
          completedKeys={ROUTES.filter(route =>
            visited.includes(route.href)
          ).map(route => route.id)}
        >
          {ROUTES.map(route => (
            <Stepper.Item key={route.id} id={route.id} href={route.href}>
              {route.label}
            </Stepper.Item>
          ))}
        </Stepper>
        <Text>Current route: {path}</Text>
      </Stack>
    </RouterProvider>
  );
};
