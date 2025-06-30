import { IconMore } from '@marigold/icons';
import { cn } from '@marigold/system';

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(className)}
      {...props}
    >
      <IconMore size="small" />
      <span className="sr-only">More</span>
    </span>
  );
};
