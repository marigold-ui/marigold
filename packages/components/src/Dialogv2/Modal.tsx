import { useDOMRef } from '@react-spectrum/utils';
import { MutableRefObject, forwardRef, useCallback } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalOverlayProps,
  useLocale,
} from 'react-aria-components';
import { DOMRef } from '@react-types/shared';
import { cn, useClassNames } from '@marigold/system';

interface ModalProps extends ModalOverlayProps {
  size?: string;
}

export const _Modal = forwardRef(
  (props: ModalProps, ref: DOMRef<HTMLDivElement>) => {
    let domRef = useDOMRef(ref);
    let { locale, direction } = useLocale();

    // TODO: should we pass through lang and dir props in RAC?
    let modalRef = useCallback(
      (el: HTMLDivElement) => {
        (domRef as MutableRefObject<HTMLDivElement>).current = el;
        if (el) {
          el.lang = locale;
          el.dir = direction;
        }
      },
      [locale, direction, domRef]
    );

    const classNames = useClassNames({ component: 'Underlay' });

    return (
      <ModalOverlay
        {...props}
        className={({ isEntering, isExiting }) =>
          cn(
            'fixed inset-0 z-40 flex min-h-full items-center justify-center overflow-y-auto backdrop-blur-xs',
            isEntering ? 'animate-in fade-in duration-300 ease-out' : '',
            isExiting ? 'animate-out fade-out duration-200 ease-in' : '',
            classNames
          )
        }
      >
        <Modal
          {...props}
          className="relative flex w-full justify-center"
          ref={modalRef}
        />
      </ModalOverlay>
    );
  }
);

export { _Modal as Modal };
