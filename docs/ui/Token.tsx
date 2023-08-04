import { Card, Inline, Stack, alignment } from '@/ui';

export const AlignmentsX = () => {
  return (
    <Card>
      <Stack space={3}>
        {Object.entries(alignment.horizontal.alignmentX).map(([key]) => (
          <div className="h-full bg-[hsl(29,_37%,_95%)] p-2">
            <Stack
              alignX={key as keyof typeof alignment.horizontal.alignmentX}
              space={2}
            >
              <code className="before:content-none after:content-none">
                {key}
              </code>
              <div className=" h-14 w-14 rounded bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
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
          <div className="h-44 bg-[hsl(29,_37%,_95%)] p-2">
            <Stack
              stretch
              alignY={key as keyof typeof alignment.vertical.alignmentY}
              space={2}
            >
              <code className="before:content-none after:content-none">
                {key}
              </code>
              <div className=" h-14 w-14 rounded bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
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
        <div className="h-14 w-full rounded-sm bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded 4px
        </code>
        <div className="h-14 w-full rounded bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-md 6px
        </code>
        <div className="h-14 w-full rounded-md bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-lg 8px
        </code>
        <div className="h-14 w-full rounded-lg bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-xl 12px
        </code>
        <div className="h-14 w-full rounded-xl bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-2xl 16px
        </code>
        <div className="h-14 w-full rounded-2xl bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
      <Stack alignX="center" space={2}>
        <code className="before:content-none after:content-none">
          rounded-full 9999px
        </code>
        <div className="h-14 w-full rounded-full bg-gradient-to-r from-[hsl(29,_37%,_70%)] to-[hsl(29,_37%,_40%)] px-3 py-2 shadow"></div>
      </Stack>
    </Inline>
  </Card>
);
