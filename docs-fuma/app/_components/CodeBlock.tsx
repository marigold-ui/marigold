'use client';

import { CodeBlockProps } from 'fumadocs-ui/components/codeblock';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { ComponentProps, RefObject, useMemo, useRef } from 'react';
import { cn } from '@marigold/system';
import { FullsizeView } from '@/ui/FullsizeViewDemo';

const CopyButton = ({
  className,
  containerRef,
  ...props
}: ComponentProps<'button'> & {
  containerRef: RefObject<HTMLElement | null>;
}) => {
  const [checked, onClick] = useCopyButton(() => {
    const pre = containerRef.current?.getElementsByTagName('pre').item(0);
    if (!pre) return;

    const clone = pre.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.nd-copy-ignore').forEach(node => {
      node.replaceWith('\n');
    });

    void navigator.clipboard.writeText(clone.textContent ?? '');
  });

  return (
    <button
      type="button"
      data-checked={checked || undefined}
      aria-label={checked ? 'Copied Text' : 'Copy Text'}
      onClick={onClick}
      className="flex translate-y-0.5 gap-2 rounded-xs border-none p-0 outline-none"
      {...props}
    >
      {checked ? (
        <svg className="size-5 fill-white" viewBox="0 0 24 24">
          <path d="M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z" />
        </svg>
      ) : (
        <svg className="size-5 fill-white" viewBox="0 0 16 16">
          <path d="M8.8421 0H1.26316C0.568421 0 0 0.568421 0 1.26316V10.1053H1.26316V1.26316H8.8421V0ZM10.7368 2.52632H3.78947C3.09474 2.52632 2.52632 3.09474 2.52632 3.78947V12.6316C2.52632 13.3263 3.09474 13.8947 3.78947 13.8947H10.7368C11.4316 13.8947 12 13.3263 12 12.6316V3.78947C12 3.09474 11.4316 2.52632 10.7368 2.52632ZM10.7368 12.6316H3.78947V3.78947H10.7368V12.6316Z" />
        </svg>
      )}
    </button>
  );
};

export const CustomCodeBlock = ({
  ref,
  allowCopy = true,
  keepBackground = false,
  viewportProps = {},
  children,
  Actions = props => (
    <div {...props} className={cn('empty:hidden', props.className)} />
  ),
  ...props
}: CodeBlockProps) => {
  const areaRef = useRef<HTMLDivElement>(null);

  /**
   * Extract html, text, and line count
   * (EXACT same logic as preview)
   */
  const fullsizeData = useMemo(() => {
    const pre = areaRef.current?.querySelector('pre');
    const text = pre?.textContent ?? '';

    const lines = text.replace(/\r\n|\r|\n$/, '').split(/\r\n|\r|\n/).length;

    return {
      html: pre?.outerHTML ?? '',
      text,
      lines,
    };
  }, [children]);

  return (
    <figure
      ref={ref}
      dir="ltr"
      tabIndex={-1}
      {...props}
      className={cn(
        'not-prose shiki bg-fd-card relative my-4 overflow-hidden rounded-lg border text-sm shadow-sm',
        keepBackground && 'bg-(--shiki-light-bg) dark:bg-(--shiki-dark-bg)',
        props.className
      )}
    >
      {/* Actions (Copy + Fullsize) */}
      {Actions({
        className: 'absolute top-4 right-2 flex items-center gap-2 z-10',
        children: (
          <>
            {fullsizeData.lines >= 5 && fullsizeData.html && (
              <FullsizeView
                code={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fullsizeData.html,
                    }}
                  />
                }
                codeString={fullsizeData.text}
              />
            )}
            {allowCopy && <CopyButton containerRef={areaRef} />}
          </>
        ),
      })}

      <div
        ref={areaRef}
        {...viewportProps}
        role="region"
        tabIndex={0}
        className={cn(
          'text-md fd-scroll-container focus-visible:ring-fd-ring max-h-[600px] overflow-auto py-3.5 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
          viewportProps.className
        )}
        style={{
          counterSet: props['data-line-numbers']
            ? `line ${Number(props['data-line-numbers-start'] ?? 1) - 1}`
            : undefined,
          ...viewportProps.style,
        }}
      >
        {children}
      </div>
    </figure>
  );
};
