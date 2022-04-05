import { useComponentStyles } from './component';

test('get base styles for a component');
test('get variant styles for a component');
test('get size styles for a component');
test('get state styles for a component');

test('override order: base < variant < size < state');

// example 'Button.state.hover' => 'Button:hover'
test('transform state styles');

test('support multiple parts');

test('usage with <Box>');

const Component = () => {
  const r = useComponentStyles('name');
  const f = useComponentStyles('name', {}, { parts: ['wrapper', 'icon'] });
  console.log(f.wrapper, f.icon, f.name);
};
