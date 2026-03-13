import { Button, EmptyState, Inline } from '@marigold/components';

export default () => (
  <EmptyState
    title="No products in your cart"
    description="Start adding items to your cart to see them here."
    action={
      <Inline space="2">
        <Button variant="primary" size="small">
          Browse Products
        </Button>
        <Button variant="secondary" size="small">
          View Wishlist
        </Button>
      </Inline>
    }
  />
);
