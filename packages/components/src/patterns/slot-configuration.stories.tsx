import { ReactNode } from 'react';
import { HeadingContext, Provider, TextContext } from 'react-aria-components';
import preview from '.storybook/preview';
import { ActionButton } from '../ActionButton/ActionButton';
import { ActionButtonContext } from '../ActionButton/Context';
import { Description } from '../Description/Description';
import { Stack } from '../Stack/Stack';
import { TextValue } from '../TextValue/TextValue';
import { Title } from '../Title/Title';

const meta = preview.meta({
  title: 'Patterns/Slot Configuration',
});

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-2 text-xl font-bold">{children}</h2>
);

const Prose = ({ children }: { children: ReactNode }) => (
  <p className="text-secondary mb-4 max-w-prose">{children}</p>
);

const Code = ({ children }: { children: ReactNode }) => (
  <pre className="bg-surface-subtle text-foreground my-3 overflow-x-auto rounded p-3 font-mono text-sm">
    <code>{children}</code>
  </pre>
);

export const WhyDuplication = meta.story({
  render: () => (
    <Stack space={4} alignX="left">
      <SectionHeading>Why a unified slot pattern?</SectionHeading>
      <Prose>
        Seven container components in Marigold (Panel, Dialog, Drawer, Tray,
        ContextualHelp, SectionMessage, EmptyState) each re-implement the same
        "title + description (+ optional actions)" structure with bespoke
        wrappers. The result: three different shapes for the same mental model,
        surfaced through three different APIs to consumers.
      </Prose>
      <Prose>
        Phase 0 introduces three text-bearing primitives — Title, Description,
        TextValue — and three action primitives — ActionButton,
        ActionButton.Group, ActionMenu. Containers configure them through
        context; consumers drop the same components in everywhere.
      </Prose>
    </Stack>
  ),
});

export const TheRule = meta.story({
  render: () => (
    <Stack space={4} alignX="left">
      <SectionHeading>The rule</SectionHeading>
      <Prose>
        Use RAC's existing contexts (HeadingContext, TextContext) wherever they
        apply. Introduce Marigold-owned contexts only where RAC has no
        equivalent (action buttons, action button groups, action menus).
      </Prose>
      <Code>{`Title  (default slot="title")        → RAC HeadingContext
Description (default slot="description") → RAC TextContext
TextValue (default slot="label")        → RAC TextContext
ActionButton                            → ActionButtonContext (Marigold)
ActionButton.Group                      → ActionButtonGroupContext (Marigold)
ActionMenu                              → ActionMenuContext (Marigold)`}</Code>
      <Prose>
        Title, Description, and TextValue ship with sensible default slot names,
        so consumers don't need to remember to wire them up. The container
        configures the slot — passing the heading level, layout classes (e.g. a
        grid area), or default ActionButton variant — and the consumer drops the
        primitives in unaware.
      </Prose>
      <Prose>
        RAC's <code>useContextProps</code> uses <code>mergeProps</code>{' '}
        internally, which concatenates classNames rather than overwriting. So
        context-injected layout classes and the canonical theme typography
        compose cleanly via <code>tailwind-merge</code>.
      </Prose>
    </Stack>
  ),
});

export const AnatomyHandBuilt = meta.story({
  render: () => (
    <Stack space={4} alignX="left">
      <SectionHeading>Anatomy: a hand-built example container</SectionHeading>
      <Prose>
        The container below configures HeadingContext, TextContext, and
        ActionButtonContext via a single Provider. The consumer drops in{' '}
        <code>&lt;Title&gt;</code>, <code>&lt;Description&gt;</code>, and{' '}
        <code>&lt;ActionButton&gt;</code> — no <code>slot</code> prop required —
        and the container supplies the heading level plus layout via context.
      </Prose>

      <div className="rounded border p-4">
        <Provider
          values={[
            [
              HeadingContext,
              {
                slots: {
                  title: { level: 3 },
                },
              },
            ],
            [
              TextContext,
              {
                slots: {
                  description: { className: 'text-sm' },
                },
              },
            ],
            [ActionButtonContext, { variant: 'ghost', size: 'small' }],
          ]}
        >
          <Title>Storage usage</Title>
          <Description>
            42% of your storage quota is currently in use.
          </Description>
          <div className="mt-3 flex gap-2">
            <ActionButton>Manage storage</ActionButton>
            <ActionButton>Upgrade plan</ActionButton>
          </div>
        </Provider>
      </div>

      <Code>{`<Provider
  values={[
    [HeadingContext, { slots: { title: { level: 3 } } }],
    [TextContext,    { slots: { description: { className: 'text-sm' } } }],
    [ActionButtonContext, { variant: 'ghost', size: 'small' }],
  ]}
>
  <Title>Storage usage</Title>
  <Description>42% of your storage quota is currently in use.</Description>
  <ActionButton>Manage storage</ActionButton>
  <ActionButton>Upgrade plan</ActionButton>
</Provider>`}</Code>
    </Stack>
  ),
});

export const TextValueInItems = meta.story({
  render: () => (
    <Stack space={4} alignX="left">
      <SectionHeading>
        TextValue inside selection-container items
      </SectionHeading>
      <Prose>
        TextValue renders <code>&lt;Text slot="label" as="span"&gt;</code> and
        participates in RAC's TextContext. Inside a ListBoxItem, MenuItem, or
        ComboBoxItem, RAC derives the item's accessible <code>textValue</code>{' '}
        from the children — so screen readers and keyboard typeahead work
        correctly.
      </Prose>

      <div className="flex gap-4">
        <TextValue>Apple</TextValue>
        <TextValue>Banana</TextValue>
        <TextValue>Cherry</TextValue>
      </div>
    </Stack>
  ),
});

export const BuildingANewPrimitive = meta.story({
  render: () => (
    <Stack space={4} alignX="left">
      <SectionHeading>
        Building a new slot-configurable primitive
      </SectionHeading>
      <Prose>
        When wrapping a RAC primitive that has its own context (Heading, Text,
        Button), reuse RAC's context. When introducing a new Marigold-owned
        primitive (ActionButton), declare your own context with{' '}
        <code>
          createContext&lt;ContextValue&lt;Props, Element&gt;&gt;(null)
        </code>
        .
      </Prose>
      <Code>{`// 1. Declare the context (Marigold-owned only)
export const ActionButtonContext =
  createContext<ContextValue<ActionButtonProps, HTMLButtonElement>>(null);

// 2. Inside the component, consume via useContextProps
const _ActionButton = ({ ref: refProp, ...inputProps }: ActionButtonProps) => {
  const [merged, ref] = useContextProps(
    inputProps,
    refProp,
    ActionButtonContext
  );
  // Compose theme classNames with the merged context className via cn()
  // and forward the merged props + ref to the inner RAC primitive.
};

// 3. Container providers cascade defaults
<Provider values={[
  [ActionButtonContext, { variant: 'ghost', size: 'small' }],
]}>
  {children}
</Provider>`}</Code>
    </Stack>
  ),
});

export const ForwardLinkPanel = meta.story({
  render: () => (
    <Stack space={4} alignX="left">
      <SectionHeading>What's next: Phase 1</SectionHeading>
      <Prose>
        Phase 1 (DST-1367) refactors Panel to consume these primitives as the
        canonical real-world example. Subsequent phases migrate
        Dialog/Drawer/Tray (DST-1369) and ContextualHelp/SectionMessage/
        EmptyState (DST-1370). ListBox item migration follows the same pattern
        via DST-1364.
      </Prose>
    </Stack>
  ),
});
