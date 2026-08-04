'use client';

import { useState } from 'react';
import {
  Button,
  Description,
  Inline,
  Page,
  Split,
  Text,
  Title,
  useToast,
} from '@marigold/components';
import { StepAssignment } from './StepAssignment';
import { StepParameters } from './StepParameters';
import { StepReview } from './StepReview';
import { StepSource } from './StepSource';
import { WizardProgress } from './WizardProgress';

const steps = [
  { id: 1, label: 'Source bundles' },
  { id: 2, label: 'Parameters' },
  { id: 3, label: 'Assignment' },
  { id: 4, label: 'Review' },
];

/**
 * A multi-step wizard laid out with `<Page>` and `<Panel>`.
 *
 * The shape to copy:
 *
 * - **`<Page>` owns the frame.** No hand-rolled wrapper `<div>` around the
 *   screen: `<Page>` supplies the `<main>` landmark, the page padding, and the
 *   vertical rhythm between sections. There is nothing to tint, because the
 *   page background is the theme's `bg-background` and the Panels below are
 *   the raised surfaces on top of it.
 * - **`<Page.Header>` names the flow, not the step.** The `<h1>` is the task
 *   the user is doing ("Copy subscriptions"), which stays put as they move
 *   through the steps. The step's own name is carried by the progress nav and
 *   by the Panel titles below it, so the heading outline stays stable.
 * - **One Panel per topic.** Each Panel renders a `region` landmark labelled by
 *   its `<Title>` (an `<h2>`), so the page outline is the list of topics on the
 *   screen.
 * - **The wizard's own actions sit outside the Panels.** Back / Next act on the
 *   page, not on any one section, so anchoring them to a Panel footer would
 *   misstate their scope.
 */
const CopyWizardPage = () => {
  const [current, setCurrent] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const { addToast } = useToast();

  const isFirst = current === 1;
  const isLast = current === steps.length;

  const goNext = () => {
    if (isLast) {
      addToast({
        title: 'Run started',
        description: '800 orders are being copied in the background.',
        variant: 'success',
      });
      return;
    }
    setCompleted(prev => [...new Set([...prev, current])]);
    setCurrent(current + 1);
  };

  return (
    <Page>
      <Page.Header>
        <Title>Copy subscriptions</Title>
        <Description>
          Copy a season's subscription bundles onto next season, together with
          their orders and seat assignments.
        </Description>
      </Page.Header>

      <WizardProgress
        steps={steps}
        current={current}
        completed={completed}
        onStepPress={setCurrent}
      />

      {current === 1 && <StepSource />}
      {current === 2 && <StepParameters />}
      {current === 3 && <StepAssignment />}
      {current === 4 && <StepReview />}

      <Inline space="related" alignY="center">
        <Text variant="muted" fontSize="sm">
          {`Step ${current} of ${steps.length}`}
        </Text>
        <Split />
        {!isFirst && (
          <Button onPress={() => setCurrent(current - 1)}>Back</Button>
        )}
        <Button variant="primary" onPress={goNext}>
          {isLast ? 'Start run' : 'Continue'}
        </Button>
      </Inline>
    </Page>
  );
};

export default CopyWizardPage;
