/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Multiselect } from './Multiselect';

const meta = {
  title: 'Components/Multiselect',
  argTypes: {},
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;

const fruits = [
  { id: 10, name: 'Lemon' },
  { id: 11, name: 'Mango' },
  { id: 12, name: 'Nectarine' },
  { id: 13, name: 'Orange' },
  { id: 14, name: 'Papaya' },
  { id: 15, name: 'Quince' },
  { id: 16, name: 'Raspberry' },
  { id: 17, name: 'Strawberry' },
  { id: 18, name: 'Tangerine' },
  { id: 19, name: 'Ugli Fruit' },
  { id: 20, name: 'Watermelon' },
];
export const Basic: StoryObj<typeof Multiselect> = {
  render: () => {
    // Question: Why should we use selectedItems however we can use selectedKeys
    const [selectedItems, setSelectedItems] = useState([
      { id: 10, name: 'Lemon' },
      { id: 11, name: 'Mango' },
    ]);
    console.log('currentSelectedITems', selectedItems);
    return (
      <>
        <Multiselect
          className="max-w-xs"
          label="Fruits"
          tag={item => (
            <Multiselect.Tag textValue={item.name}>{item.name}</Multiselect.Tag>
          )}
        >
          <Multiselect.Option textValue={'Watermelon'} id={20}>
            Watermelon
          </Multiselect.Option>
          <Multiselect.Option textValue={'Nectarine'} id={12}>
            Nectarine
          </Multiselect.Option>
          <Multiselect.Option textValue={'Strawberry'} id={17}>
            Strawberry
          </Multiselect.Option>
        </Multiselect>
      </>
    );
  },
};

// export const Controlled: StoryObj<typeof Multiselect> = {
//   render: () => {
//     // Question: Why should we use selectedItems however we can use selectedKeys
//     const [selectedItems, setSelectedItems] = useState([
//       { id: 10, name: 'Lemon' },
//       { id: 11, name: 'Mango' },
//     ]);
//     console.log('currentSelectedITems', selectedItems);
//     return (
//       <>
//         <Multiselect
//           className="max-w-xs"
//           label="Fruits"
//           tag={item => (
//             <Multiselect.Tag textValue={item.name}>{item.name}</Multiselect.Tag>
//           )}
//           selectedItems={selectedItems}
//           onSele
//         >
//           <Multiselect.Option textValue={'Watermelon'} id={20}>
//             Watermelon
//           </Multiselect.Option>
//           <Multiselect.Option textValue={'Nectarine'} id={12}>
//             Nectarine
//           </Multiselect.Option>
//           <Multiselect.Option textValue={'Strawberry'} id={17}>
//             Strawberry
//           </Multiselect.Option>
//         </Multiselect>
//       </>
//     );
//   },
// };
