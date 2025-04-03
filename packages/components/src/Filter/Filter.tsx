import type { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../Button';

export const useFilters = () => ({});

export interface FilterProps {
  children?: ReactNode;
}

export const Filter = ({ children }: FilterProps) => <div>{children}</div>;

// Provides the context to update filter
Filter.Provider = ({ children }: PropsWithChildren) => <div>{children}</div>;

// Display applied filter -> Tags + TagGroup
Filter.List = ({ children }: PropsWithChildren) => <div>{children}</div>;

// Basically the drawer parts?
Filter.Title = ({ children }: PropsWithChildren) => <div>{children}</div>;
Filter.Content = ({ children }: PropsWithChildren) => <div>{children}</div>;
Filter.Actions = ({ children }: PropsWithChildren) => <div>{children}</div>;
Filter.Button = () => <Button>Filter</Button>;
