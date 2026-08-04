'use client';

import { FileText } from 'lucide-react';
import { useState } from 'react';
import {
  Badge,
  Button,
  Description,
  Dialog,
  FileField,
  Inline,
  Link,
  Panel,
  Stack,
  Text,
  Title,
} from '@marigold/components';
import type { ConditionsDocument } from './data';

export interface ConditionsPanelProps {
  document: ConditionsDocument | null;
  onRemove: () => void;
}

/**
 * The terms and conditions that apply to this event.
 *
 * One Panel for the whole topic, and nothing drawn by hand inside it. The
 * things worth copying:
 *
 * - **The file picker is a field on the page, not a dialog.** `<FileField>`
 *   sits in the Panel where the document belongs, and the page's own Save
 *   commits it — see `page.tsx`, which reads the file straight off the form.
 *   Putting it in a dialog cost a click to reach a drop zone, then needed a
 *   second commit button inside the dialog, so the screen had two Saves that
 *   meant different things. A dialog earns its place when it interrupts on
 *   purpose; picking a file is not an interruption, it is filling in a field.
 * - **The empty state *is* the field.** With no document, the Panel has exactly
 *   one job, so its content is the drop zone at full size. `<EmptyState>` would
 *   be right if the fix lived somewhere else — that is how the wizard uses it,
 *   for a list you populate in the step above — but here it would only be a
 *   picture of a task with a button to go and do it in another window.
 * - **Once a document exists, the same field goes quiet.** `size="small"` drops
 *   the drop zone and leaves the trigger button, so the row that matters — the
 *   document you have — stays the loudest thing in the Panel.
 * - **The section's own action lives in `Panel.Header`.** Remove acts on this
 *   section, so it goes in the header, where `Panel.Header` gives every
 *   `<Button>` the ghost, small treatment and its own grid cell. The content
 *   area is left holding only the document and the field.
 * - **No box inside the box.** The document row is `<Inline>` and `<Stack>` on
 *   the Panel's own surface. A bordered, tinted tile around the file icon reads
 *   as a second surface competing with the Panel, and it is the thing that
 *   tempts you into `bg-gray-50` / `border-green-200` in the first place.
 * - **The row says what the document is; the dialog says what removing it
 *   does.** Consequences belong at the point of action. The row used to carry a
 *   third line spelling out the fallback, which pushed it to three lines of
 *   text next to a centred icon — the misalignment you could see was really
 *   duplication: the confirm dialog already says it, at the moment it matters.
 */
export const ConditionsPanel = ({
  document,
  onRemove,
}: ConditionsPanelProps) => {
  const [removeOpen, setRemoveOpen] = useState(false);

  const isInherited =
    document?.origin === 'group' || document?.origin === 'organizer';

  return (
    // No `size="form"`: the page's `<Form maxWidth="container">` already sets the
    // measure for every section, so a Panel-level cap would only add a second,
    // competing edge.
    <Panel>
      <Panel.Header>
        <Title>Terms and conditions</Title>
        <Description>
          The document customers agree to when they sign a contract for this
          event.
        </Description>
        {document?.origin === 'own' && (
          <Button
            variant="destructive-ghost"
            onPress={() => setRemoveOpen(true)}
          >
            Remove
          </Button>
        )}
      </Panel.Header>

      <Panel.Content>
        <Stack space="regular">
          {document && (
            /*
              Two lines of text against a 32px icon, so `alignY="center"` lines
              the icon up with the block. A plain icon at `text-secondary`, not
              an icon in a tinted tile: the Panel is already the surface, and a
              second one inside it only adds a border to explain away.
            */
            <Inline space="group" alignY="center">
              <FileText
                className="text-secondary size-8 shrink-0"
                aria-hidden="true"
              />
              <Stack space="collapsed">
                <Inline space="related" alignY="center">
                  <Link href={document.href} target="_blank" rel="noreferrer">
                    {document.name}
                  </Link>
                  {isInherited && <Badge>Inherited</Badge>}
                </Inline>
                <Text variant="muted" fontSize="sm">
                  {isInherited
                    ? `From ${document.inheritedFrom} · uploaded ${document.uploadedAt}`
                    : `Uploaded for this event on ${document.uploadedAt}`}
                </Text>
              </Stack>
            </Inline>
          )}

          <Stack space="related">
            {/*
              `name` is what makes this a form field rather than a widget: the
              hidden input it renders is how `page.tsx` reads the file on
              submit. `size="small"` collapses the drop zone to its trigger once
              a document is already on the page.

              The hint is a separate `<Text>` wired up with `aria-describedby`,
              because FileField takes `label` but not `description` — every
              other field in this example takes both.
            */}
            <FileField
              label={
                document
                  ? isInherited
                    ? 'Upload a document for this event'
                    : 'Replace this document'
                  : 'Document'
              }
              name="conditions"
              accept={['application/pdf']}
              size={document ? 'small' : undefined}
              width={document ? 64 : undefined}
              aria-describedby="conditions-upload-hint"
            />
            <Text id="conditions-upload-hint" variant="muted" fontSize="sm">
              {!document
                ? 'PDF. Customers agree to this document when they sign a contract.'
                : isInherited
                  ? 'PDF. An own document overrides the inherited one from the moment you save.'
                  : 'PDF. It replaces the document above when you save.'}
            </Text>
          </Stack>
        </Stack>
      </Panel.Content>

      {/*
        This one stays a dialog, and the contrast is the point: it interrupts to
        confirm something destructive and irreversible in one click, and it is
        where the consequence is spelled out.
      */}
      <Dialog open={removeOpen} onOpenChange={setRemoveOpen} size="small">
        <Dialog.Title>Remove this document?</Dialog.Title>
        <Dialog.Content>
          <Text>
            {document?.fallsBackTo
              ? `The event falls back to the document from ${document.fallsBackTo}. Customers signing after that agree to the inherited terms.`
              : 'Customers will not be able to sign a contract for this event until a document is in place.'}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="ghost" onPress={() => setRemoveOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onPress={() => {
              setRemoveOpen(false);
              onRemove();
            }}
          >
            Remove
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Panel>
  );
};
