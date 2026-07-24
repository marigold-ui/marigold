import {
  Component,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from 'react';
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';
import '@marigold/theme-rui/styles.css';

type CapturedRenderError = {
  message: string;
  stack?: string;
  componentStack?: string;
};

declare global {
  interface Window {
    __marigoldValidateRenderErrors: CapturedRenderError[];
  }
}

const recordRenderError = (error: CapturedRenderError): void => {
  if (typeof window === 'undefined') return;
  if (!window.__marigoldValidateRenderErrors) {
    window.__marigoldValidateRenderErrors = [];
  }
  window.__marigoldValidateRenderErrors.push(error);
};

type BoundaryProps = { children: ReactNode };
type BoundaryState = { hasError: boolean };

class HarnessErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  override state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    recordRenderError({
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack ?? undefined,
    });
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div data-validation-render-error="true">Render error captured.</div>
      );
    }
    return this.props.children;
  }
}

export const RenderHarness = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => (
  <MarigoldProvider theme={theme}>
    <HarnessErrorBoundary>{children}</HarnessErrorBoundary>
  </MarigoldProvider>
);
