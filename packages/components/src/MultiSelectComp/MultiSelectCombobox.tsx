// import { ForwardRefExoticComponent, RefAttributes, forwardRef, useCallback, useRef } from "react";
// import { AriaMultiComboboxProps } from "./types";
// import { useFilter } from "@react-aria/i18n";
// import { Popover } from "../Overlay";
// import { useMultiComboboxState } from "./useMultiComboboxState";
// import { useMultiCombobox } from "./useMultiCombobox";
// import { Key } from "react-aria-components";
// import { useHover } from "@react-aria/interactions";
// import { mergeProps, mergeRefs } from "@react-aria/utils";
// import { useFocusRing } from "@react-aria/focus";
// import { Input, Button } from 'react-aria-components'
// // import { Button } from "../Button";
// import { useButton } from "@react-aria/button";
// import { ListBox } from "../ListBox";
// // import { Input } from "../Input";

// // TODO: extend the fieldbase types ?
// export interface MultiComboboxOptions extends React.PureComponent,
//     AriaMultiComboboxProps<object> {
//     /**
//      * The ref of the element to append the overlay to.
//      */
//     containerRef?: React.RefObject<HTMLElement>;
//     /**
//      * Helper text to append to the form control input element.
//      */
//     helperText?: React.ReactNode;
//     /**
//      * Props passed to the helper text.
//      */
//     helperTextProps?: React.HTMLAttributes<HTMLElement>;
//     /**
//      * Label of the input element
//      */
//     label?: React.ReactNode;
//     /**
//      * Props passed to the label.
//      */
//     labelProps?: React.HTMLAttributes<HTMLElement>;
//     /**
//      * The maxHeight specified for the overlay element.
//      * By default, it will take all space up to the current viewport height.
//      */
//     maxHeight?: number;
//     /**
//      * The additional offset applied along the main axis between the element and its
//      * anchor element.
//      *
//      * @default 4
//      */
//     offset?: number;
//     /**
//      * The placement of the element with respect to its anchor element.
//      *
//      * @default 'bottom'
//      */
//     // TODO: add type
//     placement?: string;
//     /**
//      * Whether the element should flip its orientation (e.g. top to bottom or left to right) when
//      * there is insufficient room for it to render completely.
//      *
//      * @default true
//      */
//     shouldFlip?: boolean;
//     /**
//      * The size of the combobox
//      *
//      * @default 'medium'
//      */
//     size?: 'medium' | 'small';
//     /**
//      * Icon displayed at the start of the combobox.
//      */
//     startIcon?: React.ReactElement;
// }

// export interface SelectComponent
//     extends ForwardRefExoticComponent<
//         MultiComboboxOptions & RefAttributes<HTMLDivElement>
//     > {
//     /**
//      * Options of the Select.
//      */
//     /**
//      * Section of the Select.
//      */
// }

// export const MultiCombobox = forwardRef<any, MultiComboboxOptions>(
//     (
//         props,
//         ref
//     ) => {

//         const { autoFocus,
//             containerRef: containerRefProp,
//             isDisabled,
//             helperText,
//             helperTextProps: helperTextProp = {},
//             label,
//             labelProps: labelProp = {},
//             maxHeight,
//             offset = 4,
//             placemnt = 'bottom',
//             shouldFlip,
//             validationState,
//             size = 'medium', } = props;

//         const isInvalid = validationState === 'invalid';

//         const containerRef = useRef<HTMLDivElement>(null);
//         const buttonRef = useRef<HTMLButtonElement>(null);
//         const inputRef = useRef<HTMLInputElement>(null);
//         const listBoxRef = useRef<HTMLDivElement>(null);
//         const popoverRef = useRef<HTMLDivElement>(null);

//         const { contains } = useFilter({
//             sensitivity: "base"
//         });

//         const state = useMultiComboboxState({
//             ...props,
//             defaultFilter: contains,
//         });

//         const { hoverProps, isHovered } = useHover({ isDisabled });
//         const { isFocusVisible, isFocused, focusProps } = useFocusRing({
//             autoFocus,
//             within: true,
//         })
//         const {
//             buttonProps: triggerProps,
//             inputProps,
//             listBoxProps,
//             labelProps,
//             descriptionProps,
//             errorMessageProps,
//         } = useMultiCombobox(
//             {
//                 ...props,
//                 buttonRef,
//                 inputRef,
//                 listBoxRef,
//                 popoverRef,
//             },
//             state,
//         );

//         // const { overlayProps } = useOverlayPosition({
//         //     isOpen: state.isOpen,
//         //     maxHeight,
//         //     offset,
//         //     onClose: state.close,
//         //     overlayRef: popoverRef,
//         //     placement,
//         //     shouldFlip,
//         //     scrollRef: listBoxRef,
//         //     targetRef: containerRef,
//         // });

//         const handleClose = useCallback(() => {
//             state.close();
//         }, [state]);

//         const handleRemove = ((key: Key) => state.selectionManager.toggleSelection(key))

//         const { buttonProps } = useButton(triggerProps, buttonRef);

//         return (
//             <div
//                 {...mergeProps(hoverProps, focusProps)}
//                 ref={mergeRefs(containerRef, ref)}
//             >
//                 <Input {...inputProps} ref={inputRef} />

//                 {triggerProps.}
//                 <Button   {...buttonProps} ref={buttonRef}>
//                     expand more
//                 </Button>

//                 <Popover
//                     ref={popoverRef}
//                     open={state.isOpen}
//                     onClose={handleClose}

//                 >
//                     <ListBox items={state.}>

//                     </ListBox>
//                 </Popover>
//             </div>
//         );
//     }
// ) as SelectComponent;

// // _Select.Option = ListBox.Item;
// // _Select.Section = ListBox.Section;
