'use client';

import type { ToastContentProps } from '@marigold/components';
import { Toast } from '@marigold/components';

const variantContent: Record<string, { title: string; description: string }> = {
  success: {
    title: 'Booking Confirmed!',
    description:
      'Your ticket has been successfully booked. Check your email for details.',
  },
  error: {
    title: 'Booking Failed',
    description:
      'There was a problem processing your booking. Please try again.',
  },
  warning: {
    title: 'Limited Availability',
    description: 'Hurry! Only a few tickets are left for your selected event.',
  },
  info: {
    title: 'Booking Information',
    description: 'You can book up to 5 tickets per transaction.',
  },
  default: {
    title: 'Notification',
    description: 'Here is a general notification about your booking.',
  },
};
// This is only a demo to show the appearance of the Toast component
// This is not how you would typically use the Toast component in your application
export default ({ variant }: ToastContentProps) => {
  const { title, description } = variantContent[variant ?? 'info'];

  return (
    <div className="z-1">
      <Toast
        toast={{
          content: {
            title,
            description,
            variant,
          },
          key: 'toast-key',
        }}
      />
    </div>
  );
};
