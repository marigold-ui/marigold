import { Suspense } from 'react';
import { PostList } from './PostList';

// Wrapper component for MDX - MDX components cannot be async
export const PostListWrapper = () => {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostList />
    </Suspense>
  );
};
