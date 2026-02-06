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
