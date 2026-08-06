'use client';

import { cn } from '@/lib/cn';
import {
  CONSENT_BANNER_ID,
  type ConsentChoice,
  getServerConsent,
  readBannerState,
  subscribeConsent,
  writeConsent,
} from '@/lib/consent';
import Link from 'fumadocs-core/link';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { ChartColumn } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const declineClassName = cn(buttonVariants({ color: 'secondary' }), 'flex-1');
const acceptClassName = cn(buttonVariants({ color: 'primary' }), 'flex-1');

export const ConsentBanner = () => {
  const state = useSyncExternalStore(
    subscribeConsent,
    readBannerState,
    getServerConsent
  );
  const reopened = state === 'reopened';

  const choose = (choice: ConsentChoice) => writeConsent(choice);

  if (state !== 'unset' && !reopened) return null;

  return (
    <div
      id={CONSENT_BANNER_ID}
      data-reopened={reopened || undefined}
      role="dialog"
      aria-labelledby={`${CONSENT_BANNER_ID}-title`}
      className={cn(
        'bg-fd-popover text-fd-popover-foreground border-fd-border fixed bottom-4 left-4 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-lg border p-4 shadow-lg',
        'lg:ring-fd-ring/20 lg:bottom-6 lg:left-6 lg:w-[28rem] lg:rounded-xl lg:p-5 lg:shadow-2xl lg:ring-1'
      )}
    >
      <div className="flex items-start gap-3">
        <ChartColumn
          aria-hidden
          className="text-fd-primary mt-0.5 size-4 shrink-0 lg:size-5"
        />
        <div className="min-w-0 flex-1">
          <p
            id={`${CONSENT_BANNER_ID}-title`}
            className="text-sm font-medium lg:text-base"
          >
            Analytics
          </p>
          <p className="text-fd-muted-foreground mt-1.5 text-xs lg:mt-2 lg:text-sm">
            We measure which pages get used so we can improve the documentation.
            No cookies, no cross-site tracking. See our{' '}
            <Link
              href="/datenschutz"
              className="hover:text-fd-foreground underline underline-offset-2"
            >
              privacy notice
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2 lg:mt-5">
            <button
              type="button"
              onClick={() => choose('denied')}
              className={declineClassName}
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className={acceptClassName}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
