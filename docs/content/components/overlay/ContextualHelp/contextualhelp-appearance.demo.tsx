'use client';

import { ContextualHelp } from '@marigold/components';

export default () => (
  <ContextualHelp>
    <h3 className="mb-1 text-base font-bold">Was ist das?</h3>
    <p className="text-sm">
      Dieses Feature erklärt dir wichtige Funktionen direkt im Kontext der
      Seite. <br />
      <a href="https://www.marigold-ui.io/components/overview?theme=rui">
        Zur Dokumentation
      </a>
    </p>
  </ContextualHelp>
);
