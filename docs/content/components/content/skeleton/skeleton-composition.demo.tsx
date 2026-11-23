import { Card, Inline, Skeleton, Stack } from '@marigold/components';

export default () => (
  <Stack space="group">
    {/* A form field: label, then input */}
    <Stack space="tight">
      <Skeleton width={32} height={5} />
      <Skeleton height={9} />
    </Stack>
    {/* A card: avatar beside a title and two lines of text */}
    <div className="w-80">
      <Card aria-hidden="true" stretch>
        <Card.Content>
          <Inline space="related" alignY="center" noWrap>
            <Skeleton width={12} height={12} variant="rounded" />
            <Stack space="related" stretch>
              <Skeleton width="1/2" height={5} />
              <Skeleton />
              <Skeleton width="3/4" />
            </Stack>
          </Inline>
        </Card.Content>
      </Card>
    </div>
  </Stack>
);
