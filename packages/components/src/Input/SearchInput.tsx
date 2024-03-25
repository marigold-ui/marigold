import { forwardRef } from 'react';
import { Button } from 'react-aria-components';

import { useLocalizedStringFormatter } from '@react-aria/i18n';

import { cn } from '@marigold/system';

import type { InputProps } from './Input';
import { Input } from './Input';

const intlMessages = {
  'de-DE': {
    'Clear search': 'Suche zurücksetzen',
  },
  'en-US': {
    'Clear search': 'Clear search',
  },
  'fr-FR': {
    'Clear search': 'Effacer la recherche',
  },
};

// Icon
// ---------------
const SearchIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
    {...props}
  >
    <path d="M16.1865 14.5142H15.3057L14.9936 14.2131C16.0862 12.9421 16.744 11.292 16.744 9.497C16.744 5.49443 13.4996 2.25 9.497 2.25C5.49443 2.25 2.25 5.49443 2.25 9.497C2.25 13.4996 5.49443 16.744 9.497 16.744C11.292 16.744 12.9421 16.0862 14.2131 14.9936L14.5142 15.3057V16.1865L20.0888 21.75L21.75 20.0888L16.1865 14.5142ZM9.49701 14.5142C6.72085 14.5142 4.47986 12.2732 4.47986 9.49701C4.47986 6.72085 6.72085 4.47986 9.49701 4.47986C12.2732 4.47986 14.5142 6.72085 14.5142 9.49701C14.5142 12.2732 12.2732 14.5142 9.49701 14.5142Z" />
  </svg>
);

// Props
// ---------------
export interface SearchInputProps
  extends Omit<InputProps, 'icon' | 'className'> {
  className?: {
    input?: string;
    action?: string;
  };
  onClear?: () => void;
}

// Component
// ---------------
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, ...props }, ref) => {
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    return (
      <Input
        type="search"
        className={cn(
          '[&::-webkit-search-cancel-button]:hidden',
          className?.input
        )}
        ref={ref}
        icon={<SearchIcon />}
        action={
          <Button
            className={className?.action}
            onPress={() => onClear?.()}
            aria-label={stringFormatter.format('Clear search')}
            excludeFromTabOrder={true}
            // @ts-ignore
            preventFocusOnPress={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width={20}
              height={20}
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </Button>
        }
        {...props}
      />
    );
  }
);
