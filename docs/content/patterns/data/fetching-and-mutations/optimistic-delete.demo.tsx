import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  Button,
  Stack,
  Table,
  Text,
  ToastProvider,
  useConfirmation,
  useToast,
} from '@marigold/components';
import { Trash2 } from '@marigold/icons';

interface Product {
  id: string;
  name: string;
}

// Pretend backend. In a real app these would be `fetch` calls.
let products: Product[] = [
  { id: '1', name: 'Standing Ticket' },
  { id: '2', name: 'Seated Ticket' },
  { id: '3', name: 'VIP Package' },
];
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const api = {
  list: async () => {
    await wait(400);
    return [...products];
  },
  remove: async (id: string) => {
    await wait(700);
    products = products.filter(product => product.id !== id);
  },
};

// Centralized query key — never inline raw strings in components.
const productKeys = { all: ['products'] as const };

// Encapsulated data hooks. The component stays presentational.
const useProducts = () =>
  useQuery({ queryKey: productKeys.all, queryFn: api.list });

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const confirm = useConfirmation();

  const mutation = useMutation({
    mutationFn: api.remove,
    // Optimistically remove the row, snapshotting for rollback.
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });
      const previous = queryClient.getQueryData<Product[]>(productKeys.all);
      queryClient.setQueryData<Product[]>(productKeys.all, old =>
        old?.filter(product => product.id !== id)
      );
      return { previous };
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(productKeys.all, context?.previous);
      addToast({ title: 'Could not delete product', variant: 'error' });
    },
    onSuccess: () => addToast({ title: 'Product deleted', variant: 'success' }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: productKeys.all }),
  });

  return async (product: Product) => {
    const result = await confirm({
      variant: 'destructive',
      title: 'Delete product?',
      content: `This will remove “${product.name}”. This action cannot be undone.`,
      confirmationLabel: 'Delete',
    });
    if (result === 'confirmed') {
      mutation.mutate(product.id);
    }
  };
};

const Products = () => {
  const { data = [], isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  if (isLoading) {
    return <Text>Loading products…</Text>;
  }

  return (
    <Table aria-label="Products">
      <Table.Header>
        <Table.Column id="name" rowHeader>
          Name
        </Table.Column>
        <Table.Column id="actions" alignX="right">
          Actions
        </Table.Column>
      </Table.Header>
      <Table.Body emptyState={() => <Text>All products deleted.</Text>}>
        {data.map(product => (
          <Table.Row id={product.id} key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>
              <Button
                variant="ghost"
                size="small"
                aria-label={`Delete ${product.name}`}
                onPress={() => deleteProduct(product)}
              >
                <Trash2 size={16} />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider position="bottom-right" />
    <Stack space={4}>
      <Products />
    </Stack>
  </QueryClientProvider>
);
