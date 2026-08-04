'use client';

import { useState } from 'react';
import {
  Button,
  Description,
  Form,
  Inline,
  Page,
  Panel,
  SectionMessage,
  Select,
  Split,
  Stack,
  Text,
  Title,
  useToast,
} from '@marigold/components';
import { ConditionsPanel } from './ConditionsPanel';
import { ContractTermPanel } from './ContractTermPanel';
import {
  type ConditionsDocument,
  type ContractModel,
  contractModels,
  inheritedDocument,
  ownDocument,
} from './data';

/**
 * A settings screen laid out with `<Page>` and `<Panel>`: the contract model of
 * a subscription event, the terms and conditions that go with it, and the
 * contract term.
 *
 * The shape to copy:
 *
 * - **One measure, declared once.** `<Form maxWidth="container">` wraps the body,
 *   so the Panels, the `<SectionMessage>` and the button row all end at the same
 *   edge. `container` is the theme's own token for "max readable measure for a
 *   centered page column" (50rem) — the named version of the 800px the old
 *   `utils-width-800` was reaching for. Note what is *not* here: no
 *   `size="form"` on the individual Panels. Capping some Panels and not others
 *   is what makes a page look ragged, and it is a page-level decision, so it is
 *   made in one place. A page whose content genuinely needs the room — the
 *   wizard example, which holds tables — drops the wrapper instead and runs
 *   every Panel full width.
 * - **`<Form>` rather than a `<div>`.** The screen has a Save and a Cancel, so
 *   it is a form; using the element says so, gives keyboard submit for free, and
 *   is the component that carries `maxWidth`. `<Stack>` inside it reproduces the
 *   rhythm `<Page>` would otherwise apply to its own children.
 * - **One Save, and it means one thing.** Because the form is a real form, the
 *   file upload is a field inside it (`<FileField name="conditions">`) and the
 *   submit handler reads it off `FormData` — so there is no second commit
 *   button in a dialog competing with this one. Every boolean on the screen is a
 *   `<Checkbox>` for the same reason: a `<Switch>` promises the change has
 *   already happened, and on this page nothing happens until Save.
 * - **Fields are as wide as their answers.** The measure caps the *page*; it is
 *   not a target for every control to fill. The Select takes three short labels
 *   and is sized for them.
 * - **One Panel per topic, and no surface inside a surface.** The version this
 *   replaces drew its own boxes (`rounded-xl border p-4`) and then nested a
 *   `<Container>` and two `<Card>`s inside them. `<Panel>` is the surface;
 *   sub-grouping happens with headings.
 * - **`<Panel.Header>` carries the section heading and the section's actions.**
 *   A `<Headline level="2">` as the first child of a hand-drawn box gives you
 *   the heading but not the `region` landmark, the title/description grid, or
 *   the actions cell.
 * - **The page's own actions sit outside the Panels.** Save and Cancel commit
 *   the whole screen, so anchoring them to one Panel's footer would misstate
 *   their scope. Feedback about the screen as a whole is a `<SectionMessage>`
 *   in the page flow for the same reason.
 * - **The page shape stays put when the model changes.** Every model shows the
 *   same three Panels; only the third one's content differs. A branch that adds
 *   and removes whole sections makes the screen feel like it reloaded.
 */
const ContractModelPage = () => {
  const [model, setModel] = useState<ContractModel>('subscription');
  // The three states of the document, as a ladder you can walk in the demo:
  // nothing at all → an own upload → the group's document once the own upload is
  // removed. There is no way back to "nothing", which is correct: once the group
  // has a document this event always inherits at least that one.
  const [document, setDocument] = useState<ConditionsDocument | null>(null);
  const [saveAttempted, setSaveAttempted] = useState(false);
  // Bumped on every save so the Panel remounts and the FileField's staged
  // selection is cleared. FileField owns that state, so a new key is the way to
  // reset it.
  const [savedCount, setSavedCount] = useState(0);
  const { addToast } = useToast();

  // A bundle is sold outright, so it needs no terms and conditions. Every other
  // model is a contract and cannot be saved without a document.
  const needsDocument = model !== 'bundle';
  const isMissingDocument = needsDocument && document === null;

  const save = (form: HTMLFormElement) => {
    setSaveAttempted(true);

    // The upload is a field on this form, so it is read here like any other
    // one — `<FileField name="conditions">` renders a file input, and FormData
    // hands back the File. This is what replaces a dialog with its own commit
    // button: one Save on the page, one thing it means.
    const staged = new FormData(form).get('conditions');
    const hasUpload = staged instanceof File && staged.size > 0;

    if (isMissingDocument && !hasUpload) return;

    if (hasUpload) setDocument(ownDocument);
    setSavedCount(count => count + 1);
    addToast({
      title: 'Contract model saved',
      variant: 'success',
    });
  };

  return (
    <Page>
      <Page.Header>
        <Title>Contract model</Title>
        <Description>
          How this event is sold, and the terms customers agree to when they
          sign up for it.
        </Description>
      </Page.Header>

      {/*
        One measure for the whole screen. `maxWidth="container"` is the theme's
        named page measure (50rem), so everything below — Panels, the message,
        the buttons — ends at the same edge, and nothing needs `size="form"`.
        `<Stack>` supplies the rhythm that `<Page>` gives its own children.
      */}
      <Form
        maxWidth="container"
        onSubmit={event => {
          event.preventDefault();
          save(event.currentTarget);
        }}
      >
        <Stack space="regular">
          <ConditionsPanel
            key={savedCount}
            document={document}
            onRemove={() => setDocument(inheritedDocument)}
          />

          <Panel>
            <Panel.Header>
              <Title>Sales model</Title>
              <Description>
                Determines what customers commit to. It cannot be changed once
                contracts exist.
              </Description>
            </Panel.Header>
            <Panel.Content>
              {/*
                A field is as wide as the answer it takes, not as wide as the
                page. Three short labels do not need 800px of control, and a
                full-width Select next to a full-width paragraph makes the whole
                Panel read as one undifferentiated column.

                It is a number and not `width="fit"` because Select excludes the
                `fit` keyword — and that is the right call here anyway: a control
                sized to its content would change width every time the selection
                changes. 64 (16rem) holds the longest label with room to spare.
              */}
              <Select
                label="Sales model"
                value={model}
                onChange={key => setModel(key as ContractModel)}
                width={64}
                required
              >
                {contractModels.map(option => (
                  <Select.Option key={option.id} id={option.id}>
                    <Text slot="label">{option.label}</Text>
                    <Text slot="description">{option.description}</Text>
                  </Select.Option>
                ))}
              </Select>
            </Panel.Content>
          </Panel>

          {model === 'subscription' ? (
            <ContractTermPanel />
          ) : (
            <Panel>
              <Panel.Header>
                <Title>Contract term</Title>
                <Description>
                  How long customers are committed, and when they have to cancel
                  by.
                </Description>
              </Panel.Header>
              <Panel.Content>
                <Text variant="muted">
                  {model === 'bundle'
                    ? 'A bundle is a one-off purchase, so there is no term to set. Customers buy the events and the sale is complete.'
                    : 'Priority purchase grants early access to existing subscribers. The term comes from their existing subscription, so there is nothing to set here.'}
                </Text>
              </Panel.Content>
            </Panel>
          )}

          {/*
            Feedback on the whole screen, so it sits in the page flow rather than
            inside a Panel. The variant escalates only once the user has tried to
            save: before that, a missing document is a heads-up, not an error.
          */}
          {isMissingDocument ? (
            <SectionMessage variant={saveAttempted ? 'error' : 'warning'}>
              <SectionMessage.Title>
                Terms and conditions are missing
              </SectionMessage.Title>
              <SectionMessage.Content>
                <Text>
                  {saveAttempted
                    ? 'Upload a document before saving — a contract model cannot go live without one.'
                    : 'This sales model is a contract, so customers must be shown a document before they can sign up.'}
                </Text>
              </SectionMessage.Content>
            </SectionMessage>
          ) : (
            needsDocument && (
              <SectionMessage variant="info">
                <SectionMessage.Content>
                  <Text>
                    Customers see these terms at checkout and receive a copy
                    with their confirmation.
                  </Text>
                </SectionMessage.Content>
              </SectionMessage>
            )
          )}

          <Inline space="related" alignY="center">
            <Split />
            <Button type="button">Cancel</Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Inline>
        </Stack>
      </Form>
    </Page>
  );
};

export default ContractModelPage;
