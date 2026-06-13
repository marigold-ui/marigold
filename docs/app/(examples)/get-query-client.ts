import { QueryClient, isServer } from '@tanstack/react-query';

// QueryClient factory following the TanStack Query App Router recommendation.
//
// The naive options are both wrong:
//   - a module-scope `new QueryClient()` is shared across every server request,
//     leaking one user's cache into another's response;
//   - `new QueryClient()` inside render creates a fresh client (empty cache) on
//     every re-render.
// `useState(() => new QueryClient())` fixes the second but React can still
// discard the client on a suspended initial render when there is no Suspense
// boundary below it. The robust, idiomatic answer is: a new client per request
// on the server, and a single reused client in the browser.
// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Avoid an immediate refetch on the client right after hydration.
        staleTime: 60 * 1000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    // Server: always a fresh client so requests never share a cache.
    return makeQueryClient();
  }
  // Browser: reuse one client across renders (and Fast Refresh).
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};
