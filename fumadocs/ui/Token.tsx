'use client';

import { Card, Inline, Stack, Table, alignment, cn, paddingSpace } from '@/ui';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { Rectangle } from './Rectangle';

export const AlignmentsX = () => {
  return (
    <Card>
      <Stack space={3}>
        {Object.entries(alignment.horizontal.alignmentX).map(([key]) => (
          <div className="h-full bg-slate-200 p-2" key={key}>
            <Stack
              alignX={key as ComponentProps<typeof Stack>['alignX']}
              space={2}
            >
              <code className="before:content-none after:content-none">
                {key}
              </code>
              <Rectangle width="3.5rem" height="3.5rem" />
            </Stack>
          </div>
        ))}
      </Stack>
    </Card>
  );
};

export const AlignmentsY = () => {
  return (
    <Card>
      <Stack space={3}>
        {Object.entries(alignment.vertical.alignmentY).map(([key]) => (
          <div className="h-44 bg-slate-200 p-2" key={key}>
            <Stack
              stretch
              alignY={key as keyof typeof alignment.vertical.alignmentY}
              space={2}
            >
              <code className="before:content-none after:content-none">
                {key}
              </code>
              <Rectangle width="3.5rem" height="3.5rem" />
            </Stack>
          </div>
        ))}
      </Stack>
    </Card>
  );
};

export const BorderRadius = () => (
  <Card>
    <Inline space={8}>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-sm 2px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-xs border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded 4px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-xs border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-md 6px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-md border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-lg 8px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-lg border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-xl 12px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-xl border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-2xl 16px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-2xl border-2 border-dashed px-3 py-2"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-full 9999px
        </code>
        <div className="bg-bg-body h-14 w-full rounded-full border-2 border-dashed px-3 py-2"></div>
      </Stack>
    </Inline>
  </Card>
);

export const Breakpoints = () => {
  const [breakpoints, setBreakpoints] = useState<Record<string, string>>({});

  useEffect(() => {
    const breakpointKeys = ['sm', 'md', 'lg', 'xl', '2xl'];
    const breakpointValues: Record<string, string> = {};

    breakpointKeys.forEach(key => {
      breakpointValues[key] = getComputedStyle(
        document.querySelector('[data-theme="rui"]')!
      ).getPropertyValue(`--breakpoint-${key}`);
    });

    queueMicrotask(() => setBreakpoints(breakpointValues));
  }, []);

  return (
    <div data-theme="rui">
      <Table aria-label="breakpoints" stretch>
        <Table.Header>
          <Table.Column key={'name'}>Name</Table.Column>
          <Table.Column key={'value'}>Breaks at</Table.Column>
        </Table.Header>
        <Table.Body>
          {Object.entries(breakpoints).map(([key, value]) => (
            <Table.Row key={key}>
              <Table.Cell>
                <code className="before:content-none after:content-none">
                  {key}
                </code>
              </Table.Cell>
              <Table.Cell>{value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const Spacing = () => {
  return (
    <Table aria-label="spaces" stretch>
      <Table.Header>
        <Table.Column key={'name'}>Name</Table.Column>
        <Table.Column key={'value'}>Value</Table.Column>
        <Table.Column key={'example'}>Example</Table.Column>
      </Table.Header>
      <Table.Body>
        {Object.keys(paddingSpace)
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .map(key => (
            <Table.Row key={key}>
              <Table.Cell>
                <code className="before:content-none after:content-none">
                  {key}
                </code>
              </Table.Cell>
              <Table.Cell>{Number(key) * 4}px</Table.Cell>
              <Table.Cell>
                <div className={cn(`pl-${key}`, 'bg-slate-300')}>
                  <div className="h-3 bg-white"></div>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};
