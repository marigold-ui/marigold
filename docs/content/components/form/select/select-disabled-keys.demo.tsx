import { Select } from '@marigold/components';

export default () => (
  <Select label="Select your country" disabledKeys={['germany', 'denmark']}>
    <Select.Option id="Albania">Albania</Select.Option>
    <Select.Option id="Czech Republic">Czech Republic</Select.Option>
    <Select.Option id="Denmark">Denmark</Select.Option>
    <Select.Option id="Egypt">Egypt</Select.Option>
    <Select.Option id="El Salvador">El Salvador</Select.Option>
    <Select.Option id="Germany">Germany</Select.Option>
    <Select.Option id="Hungary">Hungary</Select.Option>
    <Select.Option id="Iceland">Iceland</Select.Option>
    <Select.Option id="India">India</Select.Option>
    <Select.Option id="Netherlands">Netherlands</Select.Option>
    <Select.Option id="Nigeria">Nigeria</Select.Option>
    <Select.Option id="Poland">Poland</Select.Option>
    <Select.Option id="Portugal">Portugal</Select.Option>
    <Select.Option id="Russia">Russia</Select.Option>
    <Select.Option id="San Marino">San Marino</Select.Option>
    <Select.Option id="Saudi Arabia">Saudi Arabia</Select.Option>
    <Select.Option id="Sweden">Sweden</Select.Option>
    <Select.Option id="Thailand">Thailand</Select.Option>
    <Select.Option id="Ukraine">Ukraine</Select.Option>
    <Select.Option id="United Kingdom">United Kingdom</Select.Option>
  </Select>
);
