'use client';

import { Pagination, PaginationProps } from '@marigold/components';

export default (props: PaginationProps) => (
  <Pagination {...props} totalItems={100} pageSize={10} defaultPage={5} />
);
