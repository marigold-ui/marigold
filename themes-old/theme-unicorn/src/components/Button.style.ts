export const Button = {
  variants: {
    base: 'border-none borderRadius-8px lineHeight-48px px-large',
    variants: {
      primary: [
        'bg-primary',
        'color-background',
        'border-transparent',
        'hover:bg-secondary cursor-pointer',
      ],
    },
  },
};
// })
// export const Button: Theme['components']['Button'] = {
//   base: {
//     border: 'none',
//     borderRadius: '8px',
//     lineHeight: '48px',
//     px: 'large',
//     '&:disabled': {
//       color: 'gray40',
//       bg: 'gray20',
//       cursor: 'not-allowed',
//     },
//   },
//   variant: {
//     primary: {
//       color: 'background',
//       bg: 'primary',
//       '&:hover': {
//         bg: 'secondary',
//         cursor: 'pointer',
//       },
//     },
//     secondary: {
//       color: 'background',
//       bg: 'secondary',
//       '&:hover': {
//         bg: 'primary',
//         cursor: 'pointer',
//       },
//     },
//     ghost: {
//       color: 'secondary',
//       border: '1px solid',
//       outlineColor: 'gray70',
//       '&:hover': {
//         color: 'secondary',
//         bg: 'gray30',
//         cursor: 'pointer',
//       },
//     },
//     text: {
//       color: 'secondary',
//       '&:hover': {
//         outlineColor: 'gray70',
//         bg: 'gray30',
//         cursor: 'pointer',
//       },
//     },
//     menu: {
//       color: 'secondary',
//       bg: 'background',
//       '&:hover': {
//         color: 'background',
//         bg: 'gray60',
//       },
//     },
//   },
// };
