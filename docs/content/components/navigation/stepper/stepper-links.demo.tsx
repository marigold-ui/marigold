import { useState } from 'react';
import { RouterProvider, Stack, Stepper, Text } from '@marigold/components';

const ROUTES = [
  { id: 'signin', label: 'Sign in', href: '/checkout/signin' },
  { id: 'plan', label: 'Choose plan', href: '/checkout/plan' },
  { id: 'pay', label: 'Pay', href: '/checkout/pay' },
];

export default () => {
  // Stands in for your router. In a real app this is `router.push` from
  // Next.js, React Router, or whichever router the app already uses.
  const [path, setPath] = useState('/checkout/plan');
  // The route says where you are, but not where you have been, and only a
  // reachable step renders as a link. Keep the visited set alongside the route
  // so walking back does not turn the steps ahead into inert text.
  const [visited, setVisited] = useState(['/checkout/signin']);
  const index = ROUTES.findIndex(route => route.href === path);

  const navigate = (href: string) => {
    setVisited(paths => (paths.includes(path) ? paths : [...paths, path]));
    setPath(href);
  };

  return (
    <RouterProvider navigate={navigate}>
      <Stack space={4}>
        <Stepper
          aria-label="Checkout progress"
          selectedKey={ROUTES[index].id}
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
