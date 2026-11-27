/**
 * Keys as real events, for the palette's tests and stories.
 *
 * When the row the input points at goes away, RAC blurs the input (virtual
 * focus) from an effect, then points the input at the next row. user-event
 * answers the blur of an edited input with a `change` wrapped in `act`, which
 * React rejects mid-commit ("Should not already be working"). The effect
 * stops there, and the input keeps pointing at the row that is gone, which
 * no browser does. So these keys are real events: `beforeinput` tells RAC
 * the text was typed forward, the native setter and `input` let React see the
 * new value. Only keys in the search need this, clicks can use user-event.
 *
 * Lives in its own module, not `test.utils.tsx`, so story files can import it
 * without pulling in `vitest`.
 */
const setValue = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  'value'
)!.set!;

export const press = (input: HTMLInputElement, type: string, key: string) =>
  input.dispatchEvent(
    new KeyboardEvent(type, { key, bubbles: true, cancelable: true })
  );

const edit = (
  input: HTMLInputElement,
  key: string,
  inputType: string,
  value: string,
  data?: string
) => {
  press(input, 'keydown', key);
  input.dispatchEvent(
    new InputEvent('beforeinput', {
      inputType,
      data,
      bubbles: true,
      cancelable: true,
    })
  );
  setValue.call(input, value);
  input.dispatchEvent(
    new InputEvent('input', { inputType, data, bubbles: true })
  );
  press(input, 'keyup', key);
};

export const typeChar = (input: HTMLInputElement, char: string) =>
  edit(input, char, 'insertText', input.value + char, char);

export const deleteBackward = (input: HTMLInputElement) =>
  edit(input, 'Backspace', 'deleteContentBackward', input.value.slice(0, -1));
