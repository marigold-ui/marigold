import { Select } from '@marigold/components';

export default () => (
  <Select
    label="Select your country"
    disabledKeys={['germany', 'denmark', 'elsalvador']}
  >
    <Select.Option id="albania">Albania</Select.Option>
    <Select.Option id="czechrepublic">Czech Republic</Select.Option>
    <Select.Option id="denmark">Denmark</Select.Option>
    <Select.Option id="egypt">Egypt</Select.Option>
    <Select.Option id="elsalvador">El Salvador</Select.Option>
    <Select.Option id="germany">Germany</Select.Option>
    <Select.Option id="hungary">Hungary</Select.Option>
    <Select.Option id="iceland">Iceland</Select.Option>
    <Select.Option id="india">India</Select.Option>
    <Select.Option id="netherlands">Netherlands</Select.Option>
    <Select.Option id="nigeria">Nigeria</Select.Option>
    <Select.Option id="poland">Poland</Select.Option>
    <Select.Option id="portugal">Portugal</Select.Option>
    <Select.Option id="russia">Russia</Select.Option>
    <Select.Option id="sanmarino">San Marino</Select.Option>
    <Select.Option id="saudiarabia">Saudi Arabia</Select.Option>
    <Select.Option id="sweden">Sweden</Select.Option>
    <Select.Option id="thailand">Thailand</Select.Option>
    <Select.Option id="ukraine">Ukraine</Select.Option>
    <Select.Option id="unitedkingdom">United Kingdom</Select.Option>
  </Select>
);
