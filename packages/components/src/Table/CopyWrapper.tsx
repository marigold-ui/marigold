import { Check, Copy } from 'lucide-react';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { Button } from 'react-aria-components';

// --- Utility Hook: useCopyToClipboard ---
interface UseCopyToClipboardReturn {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
}

function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!text || typeof text !== 'string') {
      console.warn('No valid text to copy');
      return false;
    }

    // Try modern Clipboard API first
    if (navigator?.clipboard?.writeText) {
      try {
        const textToCopy = text.trim();
        console.log('Attempting to copy:', textToCopy);
        await navigator.clipboard.writeText(textToCopy);
        setCopiedText(textToCopy);
        console.log('Successfully copied to clipboard');
        return true;
      } catch (error) {
        console.error('Clipboard API failed:', error);
        // Fall through to fallback method
      }
    }

    // Fallback method using execCommand
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text.trim();
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (success) {
        setCopiedText(text.trim());
        console.log('Successfully copied using fallback method');
        return true;
      }
    } catch (error) {
      console.error('Fallback copy method failed:', error);
    }

    console.warn('Clipboard API not supported');
    return false;
  }, []);

  return { copiedText, copy };
}

// --- Main Component: CopyableWrapper ---
interface CopyableWrapperProps {
  children: ReactNode;
  className?: string;
}

export const CopyableWrapper: React.FC<CopyableWrapperProps> = ({
  children,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [justCopied, setJustCopied] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { copy } = useCopyToClipboard();

  const handleCopy = async (): Promise<void> => {
    if (!contentRef.current) return;

    // Extract text content from the wrapped child
    const textContent =
      contentRef.current.innerText || contentRef.current.textContent || '';

    if (!textContent.trim()) {
      console.warn('No text content to copy');
      return;
    }

    const success = await copy(textContent);
    if (success) {
      setJustCopied(true);

      // Reset the checkmark after 2 seconds
      setTimeout(() => {
        setJustCopied(false);
      }, 2000);
    }
  };

  return (
    <div
      className={`group relative flex items-center gap-2 rounded-md transition-all duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Content */}
      <div ref={contentRef} className="pr-8">
        {/* pr-8 reserves space for the button so text doesn't overlap if we positioned it absolutely over text, 
            though here we use a flex layout to keep it neat. */}
        {children}
      </div>

      {/* The Copy Action Area */}
      {/* We use opacity-0 group-hover:opacity-100 to hide/show on hover */}
      <div
        className={`absolute top-1/2 right-2 -translate-y-1/2 transition-all duration-200 ease-in-out ${isHovered || justCopied ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-2 opacity-0'} `}
        aria-hidden={!isHovered && !justCopied}
      >
        <Button
          onPress={handleCopy}
          className={`flex items-center justify-center rounded-md border p-1.5 shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none ${
            justCopied
              ? 'border-green-200 bg-green-50 text-green-600 hover:bg-green-100'
              : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800'
          } `}
          aria-label={justCopied ? 'Copied' : 'Copy to clipboard'}
        >
          {justCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
