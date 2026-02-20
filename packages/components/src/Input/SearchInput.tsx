import { forwardRef } from 'react';
import { Button } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn } from '@marigold/system';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { Search } from '../icons/Search';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';
import type { InputProps } from './Input';
import { Input } from './Input';

// Props
// ---------------
export interface SearchInputProps extends Omit<
  InputProps,
  'icon' | 'className'
> {
  loading?: boolean;
  className?: {
    input?: string;
    action?: string;
  };
  onClear?: () => void;
}

// Component
// ---------------
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, loading, onClear, ...props }, ref) => {
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    return (
      <Input
        type="search"
        className={cn(
          '[&::-webkit-search-cancel-button]:hidden',
          className?.input
        )}
        ref={ref}
        icon={<Search aria-hidden="true" size="16" />}
        action={
          loading ? (
            <ProgressCircle />
          ) : (
            <Button
              className={className?.action}
              onPress={() => onClear?.()}
              aria-label={stringFormatter.format('clearSearch')}
              excludeFromTabOrder={true}
              preventFocusOnPress={true}
            >
              <X size="16" />
            </Button>
          )
        }
        {...props}
      />
    );
  }
);
