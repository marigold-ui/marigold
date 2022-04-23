import React from 'React';
import { useRadio } from '@react-aria/radio';
import { AriaRadioProps } from '@react-types/radio';

import { useRadioGroupContext } from './RadioGroup';

// Props
// ---------------
interface RadioProps extends AriaRadioProps {}

// Component
// ---------------
export const Radio = (props: RadioProps) => {
  let { children } = props;
  let state = useRadioGroupContext();
  let ref = React.useRef(null);
  let { inputProps } = useRadio(props, state, ref);

  return (
    <label style={{ display: 'block' }}>
      <input {...inputProps} ref={ref} />
      {children}
    </label>
  );
};
