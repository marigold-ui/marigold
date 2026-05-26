import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as ComponentModule from './Component.js';
import { RenderHarness } from './setup.js';

type AnyComponent = React.ComponentType;

const findComponent = (
  mod: Record<string, unknown>
): AnyComponent | undefined => {
  if (typeof mod.default === 'function') return mod.default as AnyComponent;
  if (typeof (mod as Record<string, unknown>).App === 'function') {
    return mod.App as AnyComponent;
  }
  return undefined;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No #root element found in harness HTML.');
}

const Component = findComponent(
  ComponentModule as unknown as Record<string, unknown>
);

const root = createRoot(rootElement);

if (!Component) {
  const w = window as Window & {
    __marigoldValidateRenderErrors?: Array<{
      message: string;
      stack?: string;
      componentStack?: string;
    }>;
  };
  w.__marigoldValidateRenderErrors = [
    {
      message:
        'No component found. The file must have a default export or a named export called "App".',
    },
  ];
  root.render(
    <div data-validation-render-error="true">
      No component export found in target file.
    </div>
  );
  rootElement.setAttribute('data-validation-root', 'ready');
} else {
  root.render(
    <StrictMode>
      <RenderHarness>
        <Component />
      </RenderHarness>
    </StrictMode>
  );
  // The root attribute is what Playwright waits on. We set it on the
  // microtask after render() — by then React has committed and the DOM
  // reflects the rendered tree.
  queueMicrotask(() => {
    rootElement.setAttribute('data-validation-root', 'ready');
  });
}
