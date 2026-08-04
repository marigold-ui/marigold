'use client';

import { FileText } from 'lucide-react';
import { useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Description,
  Dialog,
  EmptyState,
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
  onUpload: () => void;
  onRemove: () => void;
}

/**
 * The terms and conditions that apply to this event.
 *
 * One Panel for the whole topic, and nothing drawn by hand inside it. The
 * things worth copying:
 *
 * - **The section's actions live in `Panel.Header`.** Replace / Remove act on
 *   this section, so the Panel header is where they belong — grouped in a
 *   `<ButtonGroup>` so they stay together. `Panel.Header` gives every
 *   `<Button>` inside it the ghost, small treatment and its own grid cell, so
 *   the actions align with the title instead of floating somewhere in the
 *   content. Keeping them there also means the content area holds only the
 *   document, whatever state it is in.
 * - **No box inside the box.** The document row is `<Inline>` and `<Stack>` on
 *   the Panel's own surface. A bordered, tinted tile around the file icon reads
 *   as a second surface competing with the Panel, and it is the thing that
 *   tempts you into `bg-gray-50` / `border-green-200` in the first place.
 * - **`<EmptyState>` for "nothing here yet".** It already centres the message
 *   and places the action; a dashed border and a hand-set `text-gray-500` is
 *   re-implementing it with worse contrast.
 * - **The file picker is `<FileField>`, in a `<Dialog>`.** Not a hidden
 *   `<input type="file">` behind a Button. FileField brings the drop zone, the
 *   accepted-types filter, and the selected-file list with it.
 */
export const ConditionsPanel = ({
  document,
  onUpload,
  onRemove,
}: ConditionsPanelProps) => {
  const [uploadOpen, setUploadOpen] = useState(false);
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
        {document && (
          <ButtonGroup>
            <Button onPress={() => setUploadOpen(true)}>
              {isInherited ? 'Upload own document' : 'Replace'}
            </Button>
            {document.origin === 'own' && (
              <Button
                variant="destructive-ghost"
                onPress={() => setRemoveOpen(true)}
              >
                Remove
              </Button>
            )}
          </ButtonGroup>
        )}
      </Panel.Header>

      <Panel.Content>
        {document ? (
          <Inline space="group" alignY="center">
            {/*
              A plain icon at `text-secondary`, not an icon in a tinted tile.
              The Panel is already the surface; a second one inside it only
              adds a border to explain away.
            */}
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
              {document.fallsBackTo && (
                <Text variant="muted" fontSize="sm">
                  {`Removing it falls back to the document from ${document.fallsBackTo}.`}
                </Text>
              )}
            </Stack>
          </Inline>
        ) : (
          <EmptyState
            title="No terms and conditions"
            description="Customers cannot sign a subscription contract until a document is in place."
            action={
              <Button variant="primary" onPress={() => setUploadOpen(true)}>
                Upload document
              </Button>
            }
          />
        )}
      </Panel.Content>

      <Dialog open={uploadOpen} onOpenChange={setUploadOpen} size="small">
        <Dialog.Title>Upload terms and conditions</Dialog.Title>
        <Dialog.Content>
          <FileField
            label="Document"
            accept={['application/pdf']}
            aria-describedby="conditions-upload-hint"
          />
          <Text id="conditions-upload-hint" variant="muted" fontSize="sm">
            PDF only. The document replaces whatever applies today.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="ghost" onPress={() => setUploadOpen(false)}>
            Cancel
          </Button>
          {/*
            Not "Upload": FileField's own trigger already says that, and two
            buttons with the same label in one dialog is a coin toss for the
            user. This one commits the dialog, so it says so.
          */}
          <Button
            variant="primary"
            onPress={() => {
              setUploadOpen(false);
              onUpload();
            }}
          >
            Save document
          </Button>
        </Dialog.Actions>
      </Dialog>

      <Dialog open={removeOpen} onOpenChange={setRemoveOpen} size="small">
        <Dialog.Title>Remove this document?</Dialog.Title>
        <Dialog.Content>
          <Text>
            The event falls back to the document inherited from its group.
            Customers signing after that agree to the inherited terms.
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
