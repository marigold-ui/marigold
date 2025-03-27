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

// export const DrawerModal = ({
//   children,
//   open,
//   dismissable,
//   keyboardDismissable = true,
//   ...rest
// }: DrawerModalProps) => {
//   const portal = usePortalContainer();
//   const props: ModalOverlayProps = {
//     isOpen: open,
//     isDismissable: dismissable,
//     isKeyboardDismissDisabled: !keyboardDismissable,
//     ...rest,
//   };

//   return (
//     <ModalOverlay
//       // className="fixed inset-0"
//       UNSTABLE_portalContainer={portal as HTMLElement}
//       {...props}
//     >
//       <Modal className="fixed top-0 right-0 bottom-0" {...props}>
//         {children}
//       </Modal>
//     </ModalOverlay>
//   );
// };
