# Loader

_Used to indicate the progress of the task._

The `<Loader>` component indicates a task in progress, serving as a placeholder during loading or blocking interactions during processes like data fetching or form submission, keeping users informed and reducing confusion.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                      | Description                                 |
| :-------- | :------------------------ | :------------------------------------------ |
| `variant` | `default \| inverted`     | `The available variants of this component.` |
| `size`    | `default \| large \| fit` | `The available sizes of this component.`    |

## Usage

The `<Loader>` should be used to inform users that a process is currently in progress, particularly when it takes more than a second. They are useful for situations like data fetching, form submissions, or page loads, where visual feedback reassures users that their action is being processed. However, avoid showing a loading indicator for very brief tasks, as it can feel disruptive.

### Fullscreen

A fullscreen loader blocks all interactions with the underlying content, preventing users from interacting with any part of the page until the operation is finished. This can be useful in scenarios such as waiting for critical data to load during the initial app startup, processing a sensitive transaction, or handling an essential authentication step.

However, overuse of fullscreen loaders can lead to a frustrating user experience, so they should be reserved for situations where it's necessary to ensure users can't proceed until the task is fully complete.

```tsx title="loader-fullscreen"
import { useState } from 'react';
import { Button, Loader } from '@marigold/components';

export default () => {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button variant="primary" onPress={handlePress}>
        Submit
      </Button>
      {loading ? <Loader mode="fullscreen" /> : null}
    </>
  );
};
```

### Section

A section loader is used to indicate that a specific section of the page is currently processing or loading data. Unlike a fullscreen loader, it only blocks interaction with that section, allowing users to continue interacting with other parts of the page.

Use section loaders for non-blocking tasks, like loading a list of items. They should ideally not cause layout shifts, ensuring the rest of the page remains stable while the content is being loaded, providing a seamless experience for the user.

```tsx title="loader-section"
import type { Venue } from '@/lib/data/venues';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import {
  Aside,
  Button,
  Card,
  Inline,
  Loader,
  Scrollable,
  SectionMessage,
  Split,
  Stack,
  Text,
} from '@marigold/components';

const Venues = () => {
  const { data, status, isFetching } = useQuery<Venue[]>({
    queryKey: ['venues'],
    queryFn: async () => {
      const response = await fetch(`/api/venues?delay=1500&q=`);
      if (!response.ok) {
        throw new Error('Failed to fetch venues');
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });

  if (status === 'pending' || isFetching) {
    return (
      <div className="h-[300px] w-full">
        <Loader mode="section" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <SectionMessage variant="error">
        <SectionMessage.Title>Whoooops...</SectionMessage.Title>
        <SectionMessage.Content>
          Looks like something went wrong.
        </SectionMessage.Content>
      </SectionMessage>
    );
  }

  return (
    <Scrollable height="300px">
      <Stack space={2}>
        {data.map(v => (
          <Card key={v.id}>
            <Aside sideWidth="160px" space={8}>
              <img alt="" src={v.image} />
              <Stack
                space={6}
                id="venueDetails"
                role="region"
                aria-live="polite"
              >
                <Stack>
                  <Text weight="extrabold" fontSize="2xl">
                    {v.name}
                  </Text>
                  <Text fontStyle="italic">{v.type}</Text>
                </Stack>
                <Stack>
                  <Text weight="bold">Description</Text>
                  <Text>{v.description}</Text>
                </Stack>
              </Stack>
            </Aside>
          </Card>
        ))}
      </Stack>
    </Scrollable>
  );
};

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Stack space={2}>
      <Inline>
        <Text fontSize="lg" weight="bold">
          List of Venues
        </Text>
        <Split />
        <Button
          variant="primary"
          onPress={() =>
            queryClient.invalidateQueries({ queryKey: ['venues'] })
          }
        >
          Trigger reload
        </Button>
      </Inline>
      <Venues />
    </Stack>
  </QueryClientProvider>
);
```

## Props

| Prop             | Type                        | Default       | Description                                                                                                                         |
| :--------------- | :-------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| aria-describedby | `string`                    | -             | Identifies the element (or elements) that describes the object.                                                                     |
| aria-details     | `string`                    | -             | Identifies the element (or elements) that provide a detailed, extended description for the object.                                  |
| aria-label       | `string`                    | -             | Defines a string value that labels the current element.                                                                             |
| aria-labelledby  | `string`                    | -             | Identifies the element (or elements) that labels the current element.                                                               |
| children         | `ReactNode`                 | -             | Children of the component that will make up the label.                                                                              |
| id               | `string`                    | -             | The element's unique identifier. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).              |
| loaderType       | `LoaderVisualType`          | `"cycle"`     | Selects the visual style of the loading indicator shown when loading is true. Accepts \`xloader\` or \`cycle\`.                     |
| mode             | `"fullscreen" \| "section"` | `"undefined"` | Show the loader in \`fullscreen\` to overlay and block interaction with the site or \`section\` to show loading for a certain area. |

## Related

- [Loading States](/patterns/loading-states) - Learn when to use which loading state.
