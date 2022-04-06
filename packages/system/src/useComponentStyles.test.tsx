import { useComponentStyles } from './useComponentStyles';

test('get base styles for a component');
test('get base styles for a component (with parts)');
test('get variant styles for a component');
test('get variant styles for a component (with parts)');
test('get size styles for a component');
test('get size styles for a component (with parts)');
test('get state styles for a component');
test('get state styles for a component (with parts)');

test('override order: base < variant < size < state');
test('override order: base < variant < size < state (with parts)');

// example 'Button.state.hover' => 'Button:hover'
test('transform state styles');
test('transform state styles (with parts)');

test('usage with <Box>');
test('usage with <Box> (with parts)');

const Component = () => {
  const r = useComponentStyles('name');
  const f = useComponentStyles('name', {}, { parts: ['wrapper', 'icon'] });
  console.log(f.wrapper, f.icon, f.name);
};
