'use client';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from '../../lib/cn';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      side="bottom"
      className={cn(
        'bg-fd-popover/60 text-fd-popover-foreground data-[state=closed]:animate-fd-popover-out data-[state=open]:animate-fd-popover-in z-50 max-h-(--radix-popover-content-available-height) max-w-[98vw] min-w-[240px] origin-(--radix-popover-content-transform-origin) overflow-y-auto rounded-xl border p-2 text-sm shadow-lg backdrop-blur-lg focus-visible:outline-none',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverClose = PopoverPrimitive.PopoverClose;

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
