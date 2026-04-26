import { expect, fn, spyOn, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { IconButton } from '../IconButton/IconButton';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Info } from '../icons/Info';
import { SelectList } from './SelectList';

// `select` controls render `undefined` as a normal option only when an
// explicit label is mapped to it — Storybook treats the literal `undefined`
// as "no value set". `(default)` is the user-facing label; `mapping` resolves
// it back to `undefined` so the component falls through to the theme's
// variant-based fallback.
const insetTokens = [
  'square-tight',
  'square-snug',
  'square-regular',
  'square-relaxed',
  'square-loose',
  'squish-tight',
  'squish-snug',
  'squish-regular',
  'squish-relaxed',
  'squish-loose',
  'stretch-tight',
  'stretch-snug',
  'stretch-regular',
  'stretch-relaxed',
  'stretch-loose',
];

const paddingTokens = [
  'padding-tight',
  'padding-snug',
  'padding-regular',
  'padding-relaxed',
  'padding-loose',
];

const paddingArgType = (
  tokens: string[],
  description: string,
  typeSummary: string
) => ({
  control: { type: 'select' as const },
  options: ['(default)', ...tokens],
  mapping: { '(default)': undefined },
  table: { type: { summary: typeSummary } },
  description,
});

const meta = preview.meta({
  title: 'Components/SelectList',
  component: SelectList,
  argTypes: {
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'single' },
      },
      description: 'Selection mode of the SelectList.',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'default' },
      },
      description: 'Visual variant of the list.',
    },
    orientation: {
      control: { type: 'inline-radio' },
      options: ['vertical', 'horizontal'],
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'vertical' },
      },
      description: 'Direction options flow and arrow keys navigate.',
    },
    p: paddingArgType(
      insetTokens,
      'Uniform padding for every option. Falls back to the variant default when unset.',
      'InsetSpacingTokens'
    ),
    px: paddingArgType(
      paddingTokens,
      'Horizontal padding. Cannot be combined with `p`. Falls back to the variant default when unset.',
      'PaddingSpacingTokens'
    ),
    py: paddingArgType(
      paddingTokens,
      'Vertical padding. Cannot be combined with `p`. Falls back to the variant default when unset.',
      'PaddingSpacingTokens'
    ),
  },
  args: {
    selectionMode: 'single',
    variant: 'default',
    orientation: 'vertical',
  },
});

// Inline payment-method logos used by the Bordered story to show how a
// `SelectList.Option` can carry a richer leading visual next to the label.
const VisaLogo = () => (
  <svg
    aria-hidden
    width={36}
    height={24}
    viewBox="0 0 36 24"
    className="shrink-0"
  >
    <rect width="36" height="24" rx="3" fill="#1a1f71" />
    <text
      x="18"
      y="16"
      textAnchor="middle"
      fontSize="9"
      fontWeight="700"
      fill="#f7b600"
      fontFamily="sans-serif"
    >
      VISA
    </text>
  </svg>
);

const MastercardLogo = () => (
  <svg
    aria-hidden
    width={36}
    height={24}
    viewBox="0 0 36 24"
    className="shrink-0"
  >
    <rect width="36" height="24" rx="3" fill="#ffffff" stroke="#e5e7eb" />
    <circle cx="14" cy="12" r="6" fill="#eb001b" />
    <circle cx="22" cy="12" r="6" fill="#f79e1b" fillOpacity="0.85" />
  </svg>
);

const PayPalLogo = () => (
  <svg
    aria-hidden
    width={36}
    height={24}
    viewBox="0 0 36 24"
    className="shrink-0"
  >
    <rect width="36" height="24" rx="3" fill="#003087" />
    <text
      x="18"
      y="16"
      textAnchor="middle"
      fontSize="7.5"
      fontWeight="700"
      fill="#009cde"
      fontFamily="sans-serif"
    >
      PayPal
    </text>
  </svg>
);

const BankLogo = () => (
  <svg
    aria-hidden
    width={36}
    height={24}
    viewBox="0 0 36 24"
    className="shrink-0"
  >
    <rect width="36" height="24" rx="3" fill="#0f172a" />
    <path
      d="M7 10h22L18 5zM8 15h20M11 10.5v4.5M15 10.5v4.5M21 10.5v4.5M25 10.5v4.5M7 17.5h22"
      stroke="#ffffff"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    onChange: fn(),
  },
  render: args => (
    <SelectList
      {...args}
      label="Payment method"
      description="Choose how you'd like to pay."
      defaultSelectedKeys={['credit-card']}
    >
      <SelectList.Option id="credit-card" textValue="Credit card">
        <Text slot="label">Credit card</Text>
        <Text slot="description">Visa, Mastercard, and Amex accepted.</Text>
      </SelectList.Option>
      <SelectList.Option id="paypal" textValue="PayPal">
        <Text slot="label">PayPal</Text>
        <Text slot="description">
          You&rsquo;ll be redirected to your PayPal account.
        </Text>
      </SelectList.Option>
      <SelectList.Option id="bank-transfer" textValue="Bank transfer">
        <Text slot="label">Bank transfer</Text>
        <Text slot="description">
          Transfers take 2&ndash;3 business days to clear.
        </Text>
      </SelectList.Option>
    </SelectList>
  ),
  play: async ({ args, canvas, step }) => {
    const creditRow = canvas.getByRole('row', { name: /credit card/i });
    const paypalRow = canvas.getByRole('row', { name: /paypal/i });

    await step('default selection comes from defaultSelectedKeys', () => {
      expect(creditRow).toHaveAttribute('aria-selected', 'true');
      expect(paypalRow).toHaveAttribute('aria-selected', 'false');
    });

    await step(
      'clicking another row replaces the selection and notifies onChange',
      async () => {
        await userEvent.click(paypalRow);

        expect(paypalRow).toHaveAttribute('aria-selected', 'true');
        expect(creditRow).toHaveAttribute('aria-selected', 'false');
        expect(args.onChange).toHaveBeenLastCalledWith('paypal');
      }
    );

    await step(
      'clicking the selected row keeps it selected (radio semantics)',
      async () => {
        (args.onChange as ReturnType<typeof fn>).mockClear();
        await userEvent.click(paypalRow);

        expect(paypalRow).toHaveAttribute('aria-selected', 'true');
        expect(args.onChange).not.toHaveBeenCalled();
      }
    );
  },
});

export const WithMultiSelection = meta.story({
  tags: ['component-test'],
  args: {
    selectionMode: 'multiple',
    onChange: fn(),
  },
  render: args => (
    <SelectList
      {...args}
      label="Shipping add-ons"
      description="Bundle extras with your order."
    >
      <SelectList.Option id="insurance" textValue="Parcel insurance">
        <Text slot="label">Parcel insurance</Text>
        <Text slot="description">Covers loss or damage up to $500.</Text>
      </SelectList.Option>
      <SelectList.Option id="signature" textValue="Signature on delivery">
        <Text slot="label">Signature on delivery</Text>
        <Text slot="description">Require a signature when handed over.</Text>
      </SelectList.Option>
      <SelectList.Option id="gift-wrap" textValue="Gift wrap">
        <Text slot="label">Gift wrap</Text>
        <Text slot="description">Premium paper and a handwritten note.</Text>
      </SelectList.Option>
      <SelectList.Option id="notify" textValue="SMS notifications">
        <Text slot="label">SMS notifications</Text>
        <Text slot="description">Get live updates as your parcel moves.</Text>
      </SelectList.Option>
    </SelectList>
  ),
  play: async ({ args, canvas, step }) => {
    const insuranceRow = canvas.getByRole('row', {
      name: /parcel insurance/i,
    });
    const giftWrapRow = canvas.getByRole('row', { name: /gift wrap/i });

    await step('clicking selects multiple rows independently', async () => {
      await userEvent.click(insuranceRow);
      await userEvent.click(giftWrapRow);

      expect(insuranceRow).toHaveAttribute('aria-selected', 'true');
      expect(giftWrapRow).toHaveAttribute('aria-selected', 'true');
      expect(args.onChange).toHaveBeenLastCalledWith(
        expect.arrayContaining(['insurance', 'gift-wrap'])
      );
    });

    await step('clicking again removes a row from the selection', async () => {
      await userEvent.click(insuranceRow);

      expect(insuranceRow).toHaveAttribute('aria-selected', 'false');
      expect(giftWrapRow).toHaveAttribute('aria-selected', 'true');
      expect(args.onChange).toHaveBeenLastCalledWith(['gift-wrap']);
    });
  },
});

const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit card',
    description: 'Visa, Mastercard, and Amex accepted.',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: "We'll redirect you to complete payment.",
  },
  {
    id: 'sepa',
    name: 'SEPA direct debit',
    description: 'Pay directly from your European bank account.',
  },
  {
    id: 'klarna',
    name: 'Klarna',
    description: 'Pay later or split in 3 interest-free installments.',
  },
];

export const WithIconAction = meta.story({
  tags: ['component-test'],
  args: {
    selectionMode: 'multiple',
  },
  render: args => (
    <SelectList
      {...args}
      label="Accepted payment methods"
      description="Customers see these on checkout. Tap the info icon for help."
      items={paymentMethods}
    >
      {(item: { id: string; name: string; description: string }) => (
        <SelectList.Option textValue={item.name}>
          <Text slot="label">{item.name}</Text>
          <Text slot="description">{item.description}</Text>
          <IconButton
            aria-label={`Learn more about ${item.name}`}
            onPress={() => alert(`Info about ${item.name}`)}
          >
            <Info size={20} />
          </IconButton>
        </SelectList.Option>
      )}
    </SelectList>
  ),
  play: async ({ canvas, step }) => {
    const button = canvas.getByRole('button', {
      name: 'Learn more about Credit card',
    });
    const row = button.closest('[role="row"]')!;
    const alertSpy = spyOn(window, 'alert').mockImplementation(() => {});

    await step('clicking the IconButton fires its action', async () => {
      await userEvent.click(button);

      expect(alertSpy).toHaveBeenCalledWith('Info about Credit card');
    });

    await step('clicking the IconButton does not toggle the row', () => {
      expect(row).toHaveAttribute('aria-selected', 'false');
    });

    alertSpy.mockRestore();
  },
});

const savedPayments = [
  {
    id: 'visa-4242',
    name: 'Visa ending in 4242',
    description: 'Expires 08/2027 · Default card',
  },
  {
    id: 'mc-1881',
    name: 'Mastercard ending in 1881',
    description: 'Expires 03/2026',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'alex@example.com',
  },
  {
    id: 'sepa',
    name: 'SEPA direct debit',
    description: 'DE12 •••• •••• 4455',
  },
];

export const WithActionMenu = meta.story({
  tags: ['component-test'],
  args: {
    selectionMode: 'multiple',
  },
  render: args => (
    <SelectList
      {...args}
      label="Saved payment methods"
      description="Manage cards and accounts on file."
      items={savedPayments}
    >
      {(item: { id: string; name: string; description: string }) => (
        <SelectList.Option textValue={item.name}>
          <Text slot="label">{item.name}</Text>
          <Text slot="description">{item.description}</Text>
          <ActionMenu variant="ghost" aria-label={`Manage ${item.name}`}>
            <Menu.Item onAction={() => alert(`Edit ${item.name}`)}>
              Edit
            </Menu.Item>
            <Menu.Item onAction={() => alert(`Set default: ${item.name}`)}>
              Make default
            </Menu.Item>
            <Menu.Item onAction={() => alert(`Remove ${item.name}`)}>
              Remove
            </Menu.Item>
          </ActionMenu>
        </SelectList.Option>
      )}
    </SelectList>
  ),
  play: async ({ canvas, step }) => {
    const trigger = canvas.getByRole('button', {
      name: 'Manage Visa ending in 4242',
    });
    const row = trigger.closest('[role="row"]')!;

    await step('the menu trigger is collapsed by default', () => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(row).toHaveAttribute('aria-selected', 'false');
    });

    await step('clicking the trigger expands the menu', async () => {
      await userEvent.click(trigger);

      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      );
    });

    await step('opening the menu does not toggle the row', () => {
      expect(row).toHaveAttribute('aria-selected', 'false');
    });
  },
});

export const Horizontal = meta.story({
  args: {
    orientation: 'horizontal',
  },
  render: args => (
    <SelectList
      {...args}
      label="Shipping speed"
      description="Faster options include tracking."
      defaultSelectedKeys={['standard']}
    >
      <SelectList.Option id="standard" textValue="Standard">
        <Text slot="label">Standard</Text>
        <Text slot="description">3–5 business days</Text>
      </SelectList.Option>
      <SelectList.Option id="express" textValue="Express">
        <Text slot="label">Express</Text>
        <Text slot="description">1–2 business days</Text>
      </SelectList.Option>
      <SelectList.Option id="overnight" textValue="Overnight">
        <Text slot="label">Overnight</Text>
        <Text slot="description">Next business day</Text>
      </SelectList.Option>
      <SelectList.Option id="pickup" textValue="Pickup">
        <Text slot="label">Pickup</Text>
        <Text slot="description">Ready in 2 hours</Text>
      </SelectList.Option>
    </SelectList>
  ),
});

const borderedMethods = [
  {
    id: 'visa',
    label: 'Visa ending in 4242',
    description: 'Expires 08/2027 · Default card',
    Logo: VisaLogo,
  },
  {
    id: 'mastercard',
    label: 'Mastercard ending in 1881',
    description: 'Expires 03/2026',
    Logo: MastercardLogo,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'alex@example.com',
    Logo: PayPalLogo,
  },
  {
    id: 'sepa',
    label: 'SEPA bank transfer',
    description: 'Takes 2–3 business days to clear',
    Logo: BankLogo,
  },
];

export const Bordered = meta.story({
  args: {
    variant: 'bordered',
  },
  render: args => (
    <SelectList
      {...args}
      label="Select a payment method"
      description="Each option is its own committed choice."
      defaultSelectedKeys={['visa']}
    >
      {borderedMethods.map(({ id, label, description, Logo }) => (
        <SelectList.Option key={id} id={id} textValue={label}>
          <div className="col-start-2 row-span-2 flex items-start gap-3">
            <Logo />
            <div>
              <Text slot="label">{label}</Text>
              <Text slot="description">{description}</Text>
            </div>
          </div>
        </SelectList.Option>
      ))}
    </SelectList>
  ),
});

export const WithCustomPadding = meta.story({
  tags: ['component-test'],
  args: {
    p: 'square-loose',
  },
  render: args => (
    <SelectList
      {...args}
      label="Shipping speed"
      description="Padding follows the `p` / `px` / `py` props (Inset-style)."
      defaultSelectedKeys={['standard']}
    >
      <SelectList.Option id="standard" textValue="Standard">
        <Text slot="label">Standard</Text>
        <Text slot="description">3–5 business days</Text>
      </SelectList.Option>
      <SelectList.Option id="express" textValue="Express">
        <Text slot="label">Express</Text>
        <Text slot="description">1–2 business days</Text>
      </SelectList.Option>
      <SelectList.Option id="overnight" textValue="Overnight">
        <Text slot="label">Overnight</Text>
        <Text slot="description">Next business day</Text>
      </SelectList.Option>
    </SelectList>
  ),
  play: async ({ canvas }) => {
    const standardRow = canvas.getByRole('row', { name: /standard/i });
    expect(standardRow).toHaveClass(
      'px-(--selectlist-item-px)',
      'py-(--selectlist-item-py)'
    );
    const list = standardRow.closest('[role="grid"]') as HTMLElement;
    expect(list.style.getPropertyValue('--selectlist-item-px')).toBe(
      'var(--spacing-square-loose-x)'
    );
    expect(list.style.getPropertyValue('--selectlist-item-py')).toBe(
      'var(--spacing-square-loose-y)'
    );
  },
});

export const EmptyState = meta.story({
  args: {
    items: [],
  },
  render: args => (
    <SelectList
      {...args}
      label="Saved payment methods"
      description="Pick one from your wallet or add a new method."
      emptyState={
        <div className="text-muted-foreground p-6 text-center text-sm">
          No saved payment methods yet.
        </div>
      }
    >
      {(item: { id: string; name: string; description: string }) => (
        <SelectList.Option textValue={item.name}>
          <Text slot="label">{item.name}</Text>
          <Text slot="description">{item.description}</Text>
        </SelectList.Option>
      )}
    </SelectList>
  ),
});

export const Disabled = meta.story({
  tags: ['component-test'],
  args: {
    disabled: true,
    onChange: fn(),
  },
  render: args => (
    <SelectList
      {...args}
      label="Shipping speed"
      description="Shipping speeds are locked while your address is being verified."
      defaultSelectedKeys={['standard']}
    >
      <SelectList.Option id="standard" textValue="Standard">
        <Text slot="label">Standard</Text>
        <Text slot="description">3–5 business days</Text>
      </SelectList.Option>
      <SelectList.Option id="express" textValue="Express">
        <Text slot="label">Express</Text>
        <Text slot="description">1–2 business days</Text>
      </SelectList.Option>
      <SelectList.Option id="overnight" textValue="Overnight">
        <Text slot="label">Overnight</Text>
        <Text slot="description">Next business day</Text>
      </SelectList.Option>
    </SelectList>
  ),
  play: async ({ args, canvas }) => {
    const expressRow = canvas.getByRole('row', { name: /express/i });

    await userEvent.click(expressRow);

    expect(args.onChange).not.toHaveBeenCalled();
  },
});

export const WithError = meta.story({
  render: args => (
    <SelectList
      {...args}
      label="Payment method"
      error
      errorMessage="Please choose a payment method to continue."
    >
      <SelectList.Option id="credit-card" textValue="Credit card">
        <Text slot="label">Credit card</Text>
        <Text slot="description">Visa, Mastercard, and Amex accepted.</Text>
      </SelectList.Option>
      <SelectList.Option id="paypal" textValue="PayPal">
        <Text slot="label">PayPal</Text>
        <Text slot="description">
          You&rsquo;ll be redirected to your PayPal account.
        </Text>
      </SelectList.Option>
      <SelectList.Option id="bank-transfer" textValue="Bank transfer">
        <Text slot="label">Bank transfer</Text>
        <Text slot="description">
          Transfers take 2&ndash;3 business days to clear.
        </Text>
      </SelectList.Option>
    </SelectList>
  ),
});

export const WithForm = meta.story({
  tags: ['component-test'],
  args: {
    selectionMode: 'multiple',
  },
  render: args => (
    <Form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const submitted = formData.getAll('addons').join(',');
        (e.currentTarget.querySelector(
          '[data-testid=submitted]'
        ) as HTMLElement)!.textContent = `submitted: ${submitted}`;
      }}
    >
      <Stack space={4} alignX="left">
        <SelectList
          {...args}
          label="Shipping add-ons"
          description="Bundle extras with your order."
          name="addons"
        >
          <SelectList.Option id="insurance" textValue="Parcel insurance">
            <Text slot="label">Parcel insurance</Text>
            <Text slot="description">Covers loss or damage up to $500.</Text>
          </SelectList.Option>
          <SelectList.Option id="signature" textValue="Signature on delivery">
            <Text slot="label">Signature on delivery</Text>
            <Text slot="description">
              Require a signature when handed over.
            </Text>
          </SelectList.Option>
          <SelectList.Option id="gift-wrap" textValue="Gift wrap">
            <Text slot="label">Gift wrap</Text>
            <Text slot="description">
              Premium paper and a handwritten note.
            </Text>
          </SelectList.Option>
        </SelectList>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <pre data-testid="submitted">submitted:</pre>
      </Stack>
    </Form>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('row', { name: /parcel insurance/i })
    );
    await userEvent.click(canvas.getByRole('row', { name: /gift wrap/i }));
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(canvas.getByTestId('submitted')).toHaveTextContent(
        'submitted: insurance,gift-wrap'
      );
    });
  },
});
