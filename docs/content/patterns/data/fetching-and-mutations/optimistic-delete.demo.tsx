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
const initialProducts: Product[] = [
  { id: '1', name: 'Standing Ticket' },
  { id: '2', name: 'Seated Ticket' },
  { id: '3', name: 'VIP Package' },
];
let products: Product[] = [...initialProducts];
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
  reset: async () => {
    products = [...initialProducts];
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
    mutationFn: (product: Product) => api.remove(product.id),
    // Optimistically remove the row, snapshotting for rollback.
    onMutate: async (product: Product) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });
      const previous = queryClient.getQueryData<Product[]>(productKeys.all);
      queryClient.setQueryData<Product[]>(productKeys.all, old =>
        old?.filter(item => item.id !== product.id)
      );
      return { previous };
    },
    // Name the item in every toast so the feedback is specific, not generic.
    onError: (_error, product, context) => {
      queryClient.setQueryData(productKeys.all, context?.previous);
      addToast({
        title: 'Couldn’t delete product',
        description: `“${product.name}” could not be deleted. Please try again.`,
        variant: 'error',
      });
    },
    // `success` auto-dismisses and `error` stays until dismissed, both by
    // default, so the recovery step on a failure stays readable.
    onSuccess: (_data, product) =>
      addToast({
        title: 'Product deleted',
        description: `“${product.name}” was removed.`,
        variant: 'success',
      }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: productKeys.all }),
  });

  return async (product: Product) => {
    const result = await confirm({
      variant: 'destructive',
      title: 'Delete product?',
      content: `This will remove “${product.name}”. This action cannot be undone.`,
      confirmationLabel: 'Delete',
      cancelLabel: 'Cancel',
    });
    if (result === 'confirmed') {
      mutation.mutate(product);
    }
  };
};

const Products = () => {
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const resetDemo = async () => {
    await api.reset();
    queryClient.invalidateQueries({ queryKey: productKeys.all });
  };

  if (isLoading) {
    return <Text>Loading products…</Text>;
  }

  return (
    <Stack space={4} alignX="left">
      <Table aria-label="Products" size="compact">
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
      <Button variant="secondary" size="small" onPress={resetDemo}>
        Reset demo
      </Button>
    </Stack>
  );
};

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider position="bottom-right" />
    <Products />
  </QueryClientProvider>
);
