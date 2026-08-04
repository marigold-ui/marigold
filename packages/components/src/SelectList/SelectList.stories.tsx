import { expect, fn, spyOn, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Description } from '../Description/Description';
import { Form } from '../Form/Form';
import { Inline } from '../Inline/Inline';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { Stack } from '../Stack/Stack';
import { TextValue } from '../TextValue/TextValue';
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
        <TextValue>Credit card</TextValue>
        <Description>Visa, Mastercard, and Amex accepted.</Description>
      </SelectList.Option>
      <SelectList.Option id="paypal" textValue="PayPal">
        <TextValue>PayPal</TextValue>
        <Description>
          You&rsquo;ll be redirected to your PayPal account.
        </Description>
      </SelectList.Option>
      <SelectList.Option id="bank-transfer" textValue="Bank transfer">
        <TextValue>Bank transfer</TextValue>
        <Description>
          Transfers take 2&ndash;3 business days to clear.
        </Description>
      </SelectList.Option>
    </SelectList>
  ),
});

Basic.test(
  'selects a single option and notifies onChange',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ args, canvas, step }) => {
    const creditRow = await canvas.findByRole('row', { name: /credit card/i });
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
  }
);

export const WithMultiSelection = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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
        <TextValue>Parcel insurance</TextValue>
        <Description>Covers loss or damage up to $500.</Description>
      </SelectList.Option>
      <SelectList.Option id="signature" textValue="Signature on delivery">
        <TextValue>Signature on delivery</TextValue>
        <Description>Require a signature when handed over.</Description>
      </SelectList.Option>
      <SelectList.Option id="gift-wrap" textValue="Gift wrap">
        <TextValue>Gift wrap</TextValue>
        <Description>Premium paper and a handwritten note.</Description>
      </SelectList.Option>
      <SelectList.Option id="notify" textValue="SMS notifications">
        <TextValue>SMS notifications</TextValue>
        <Description>Get live updates as your parcel moves.</Description>
      </SelectList.Option>
    </SelectList>
  ),
});

WithMultiSelection.test(
  'toggles multiple options independently',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ args, canvas, step }) => {
    const insuranceRow = await canvas.findByRole('row', {
      name: /parcel insurance/i,
    });
    const giftWrapRow = canvas.getByRole('row', { name: /gift wrap/i });
    const notify = canvas.getByRole('row', { name: /sms notifications/i });

    await step('clicking selects multiple rows independently', async () => {
      await userEvent.click(insuranceRow);
      await userEvent.click(giftWrapRow);
      await userEvent.click(notify);

      expect(insuranceRow).toHaveAttribute('aria-selected', 'true');
      expect(giftWrapRow).toHaveAttribute('aria-selected', 'true');
      expect(notify).toHaveAttribute('aria-selected', 'true');
      expect(args.onChange).toHaveBeenLastCalledWith(
        expect.arrayContaining(['insurance', 'gift-wrap', 'notify'])
      );
    });

    await step('clicking again removes a row from the selection', async () => {
      await userEvent.click(insuranceRow);

      expect(insuranceRow).toHaveAttribute('aria-selected', 'false');
      expect(giftWrapRow).toHaveAttribute('aria-selected', 'true');
      expect(notify).toHaveAttribute('aria-selected', 'true');
      expect(args.onChange).toHaveBeenLastCalledWith(['gift-wrap', 'notify']);
    });
  }
);

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
          <TextValue>{item.name}</TextValue>
          <Description>{item.description}</Description>
          {/* No `variant` needed: SelectList.Option cascades `ghost`. */}
          <Button
            size="icon"
            aria-label={`Learn more about ${item.name}`}
            onPress={() => alert(`Info about ${item.name}`)}
          >
            <Info size={20} />
          </Button>
        </SelectList.Option>
      )}
    </SelectList>
  ),
});

WithIconAction.test(
  'fires the row action without toggling selection',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, step }) => {
    const button = await canvas.findByRole('button', {
      name: 'Learn more about Credit card',
    });
    const row = button.closest('[role="row"]')!;
    const alertSpy = spyOn(window, 'alert').mockImplementation(() => {});

    await step('clicking the icon button fires its action', async () => {
      await userEvent.click(button);

      expect(alertSpy).toHaveBeenCalledWith('Info about Credit card');
    });

    await step('clicking the icon button does not toggle the row', () => {
      expect(row).toHaveAttribute('aria-selected', 'false');
    });

    alertSpy.mockRestore();
  }
);

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
          <TextValue>{item.name}</TextValue>
          <Description>{item.description}</Description>
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
});

WithActionMenu.test(
  'opens the row menu without toggling selection',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, step }) => {
    const trigger = await canvas.findByRole('button', {
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
  }
);

export const Horizontal = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
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
        <TextValue>Standard</TextValue>
        <Description>3–5 business days</Description>
      </SelectList.Option>
      <SelectList.Option id="express" textValue="Express">
        <TextValue>Express</TextValue>
        <Description>1–2 business days</Description>
      </SelectList.Option>
      <SelectList.Option id="overnight" textValue="Overnight">
        <TextValue>Overnight</TextValue>
        <Description>Next business day</Description>
      </SelectList.Option>
      <SelectList.Option id="pickup" textValue="Pickup">
        <TextValue>Pickup</TextValue>
        <Description>Ready in 2 hours</Description>
      </SelectList.Option>
    </SelectList>
  ),
});

export const HorizontalResponsive = meta.story({
  tags: ['component-test'],
  args: {
    orientation: 'horizontal',
  },
  render: args => (
    <Stack space={6}>
      <div data-testid="wide-container" className="max-w-175">
        <SelectList
          {...args}
          label="Shipping speed (wide container)"
          description="700px parent items stay side by side."
          defaultSelectedKeys={['standard']}
        >
          <SelectList.Option id="standard" textValue="Standard">
            <TextValue>Standard</TextValue>
            <Description>3–5 business days</Description>
          </SelectList.Option>
          <SelectList.Option id="express" textValue="Express">
            <TextValue>Express</TextValue>
            <Description>1–2 business days</Description>
          </SelectList.Option>
          <SelectList.Option id="overnight" textValue="Overnight">
            <TextValue>Overnight</TextValue>
            <Description>Next business day</Description>
          </SelectList.Option>
        </SelectList>
      </div>
      <div data-testid="medium-container" className="max-w-125">
        <SelectList
          {...args}
          label="Shipping speed (medium container)"
          description="500px parent narrower than the 640px breakpoint, so items stack vertically."
          defaultSelectedKeys={['standard-medium']}
        >
          <SelectList.Option id="standard-medium" textValue="Standard">
            <TextValue>Standard</TextValue>
            <Description>3–5 business days</Description>
          </SelectList.Option>
          <SelectList.Option id="express-medium" textValue="Express">
            <TextValue>Express</TextValue>
            <Description>1–2 business days</Description>
          </SelectList.Option>
          <SelectList.Option id="overnight-medium" textValue="Overnight">
            <TextValue>Overnight</TextValue>
            <Description>Next business day</Description>
          </SelectList.Option>
        </SelectList>
      </div>
      <div data-testid="narrow-container" className="w-[320px]">
        <SelectList
          {...args}
          label="Shipping speed (narrow container)"
          description="320px parent items stack vertically."
          defaultSelectedKeys={['standard-narrow']}
        >
          <SelectList.Option id="standard-narrow" textValue="Standard">
            <TextValue>Standard</TextValue>
            <Description>3–5 business days</Description>
          </SelectList.Option>
          <SelectList.Option id="express-narrow" textValue="Express">
            <TextValue>Express</TextValue>
            <Description>1–2 business days</Description>
          </SelectList.Option>
          <SelectList.Option id="overnight-narrow" textValue="Overnight">
            <TextValue>Overnight</TextValue>
            <Description>Next business day</Description>
          </SelectList.Option>
        </SelectList>
      </div>
    </Stack>
  ),
});

HorizontalResponsive.test(
  'flips horizontal options to a vertical stack in a narrow container',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas, step }) => {
    const wide = canvas.getByTestId('wide-container');
    const medium = canvas.getByTestId('medium-container');
    const narrow = canvas.getByTestId('narrow-container');
    const wideList = wide.querySelector('[role="grid"]') as HTMLElement;
    const mediumList = medium.querySelector('[role="grid"]') as HTMLElement;
    const narrowList = narrow.querySelector('[role="grid"]') as HTMLElement;

    await step('wide container keeps items in a row', () => {
      expect(getComputedStyle(wideList).flexDirection).toBe('row');
    });

    await step('narrow container flips items into a column', () => {
      expect(getComputedStyle(narrowList).flexDirection).toBe('column');
    });

    await step(
      'medium container (500px) flips to a vertical stack (below 640px breakpoint)',
      () => {
        expect(getComputedStyle(mediumList).flexDirection).toBe('column');
        const containerWidth = medium.getBoundingClientRect().width;
        const listWidth = mediumList.getBoundingClientRect().width;
        expect(listWidth).toBeLessThanOrEqual(containerWidth);
      }
    );
  }
);

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
          <div className="col-start-2 row-span-2">
            <Inline space={3} alignY="top" noWrap>
              <Logo />
              <Stack>
                <TextValue>{label}</TextValue>
                <Description>{description}</Description>
              </Stack>
            </Inline>
          </div>
        </SelectList.Option>
      ))}
    </SelectList>
  ),
});

export const WithCustomPadding = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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
        <TextValue>Standard</TextValue>
        <Description>3–5 business days</Description>
      </SelectList.Option>
      <SelectList.Option id="express" textValue="Express">
        <TextValue>Express</TextValue>
        <Description>1–2 business days</Description>
      </SelectList.Option>
      <SelectList.Option id="overnight" textValue="Overnight">
        <TextValue>Overnight</TextValue>
        <Description>Next business day</Description>
      </SelectList.Option>
    </SelectList>
  ),
});

WithCustomPadding.test(
  'applies the inset padding tokens to each option',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const standardRow = await canvas.findByRole('row', { name: /standard/i });
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
  }
);

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
        <div className="text-secondary p-6 text-center text-sm">
          No saved payment methods yet.
        </div>
      }
    >
      {(item: { id: string; name: string; description: string }) => (
        <SelectList.Option textValue={item.name}>
          <TextValue>{item.name}</TextValue>
          <Description>{item.description}</Description>
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
        <TextValue>Standard</TextValue>
        <Description>3–5 business days</Description>
      </SelectList.Option>
      <SelectList.Option id="express" textValue="Express">
        <TextValue>Express</TextValue>
        <Description>1–2 business days</Description>
      </SelectList.Option>
      <SelectList.Option id="overnight" textValue="Overnight">
        <TextValue>Overnight</TextValue>
        <Description>Next business day</Description>
      </SelectList.Option>
    </SelectList>
  ),
});

Disabled.test(
  'ignores clicks while disabled',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ args, canvas }) => {
    const expressRow = await canvas.findByRole('row', { name: /express/i });

    await userEvent.click(expressRow);

    expect(args.onChange).not.toHaveBeenCalled();
  }
);

export const WithError = meta.story({
  render: args => (
    <SelectList
      {...args}
      label="Payment method"
      error
      errorMessage="Please choose a payment method to continue."
    >
      <SelectList.Option id="credit-card" textValue="Credit card">
        <TextValue>Credit card</TextValue>
        <Description>Visa, Mastercard, and Amex accepted.</Description>
      </SelectList.Option>
      <SelectList.Option id="paypal" textValue="PayPal">
        <TextValue>PayPal</TextValue>
        <Description>
          You&rsquo;ll be redirected to your PayPal account.
        </Description>
      </SelectList.Option>
      <SelectList.Option id="bank-transfer" textValue="Bank transfer">
        <TextValue>Bank transfer</TextValue>
        <Description>
          Transfers take 2&ndash;3 business days to clear.
        </Description>
      </SelectList.Option>
    </SelectList>
  ),
});

export const WithForm = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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
            <TextValue>Parcel insurance</TextValue>
            <Description>Covers loss or damage up to $500.</Description>
          </SelectList.Option>
          <SelectList.Option id="signature" textValue="Signature on delivery">
            <TextValue>Signature on delivery</TextValue>
            <Description>Require a signature when handed over.</Description>
          </SelectList.Option>
          <SelectList.Option id="gift-wrap" textValue="Gift wrap">
            <TextValue>Gift wrap</TextValue>
            <Description>Premium paper and a handwritten note.</Description>
          </SelectList.Option>
        </SelectList>
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <pre data-testid="submitted">submitted:</pre>
      </Stack>
    </Form>
  ),
});

WithForm.test(
  'submits the selected values as form data',
  async ({ canvas }) => {
    await userEvent.click(
      await canvas.findByRole('row', { name: /parcel insurance/i })
    );
    await userEvent.click(canvas.getByRole('row', { name: /gift wrap/i }));
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(canvas.getByTestId('submitted')).toHaveTextContent(
        'submitted: insurance,gift-wrap'
      );
    });
  }
);
