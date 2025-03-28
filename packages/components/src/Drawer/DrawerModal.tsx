import { NonModal, NonModalProps } from '../Overlay/NonModal';

// Props
// ---------------
export interface DrawerModalProps
  extends Omit<NonModalProps, 'className' | 'style'> {}

// Component
// ---------------
export const DrawerModal = ({ children, ...props }: DrawerModalProps) => {
  return (
    <NonModal className="fixed top-0 right-0 bottom-0" {...props}>
      {children}
    </NonModal>
  );
};
