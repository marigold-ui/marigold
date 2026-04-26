import { Badge, Inline, SelectList, Stack, Text } from '@marigold/components';
import { Check } from '@marigold/icons';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '€0',
    period: 'forever',
    description:
      'For small teams trying things out. No credit card required to get started.',
    features: [
      'Up to 3 projects',
      'Community support',
      '1 GB storage included',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '€29',
    period: 'per user / month',
    description:
      'For growing teams that need priority support and advanced reporting.',
    features: [
      'Unlimited projects',
      'Priority email support',
      '50 GB storage included',
      'Custom branding and domains',
    ],
    badge: 'Most popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'billed annually',
    description:
      'For organizations that need SSO, audit logs, and a 99.95% uptime SLA.',
    features: [
      'SSO with SAML and SCIM',
      'Dedicated success manager',
      'Custom data residency',
      'Audit logs and access reviews',
    ],
  },
];

export default () => (
  <SelectList
    aria-label="Select plan"
    variant="bordered"
    selectionMode="single"
    defaultSelectedKeys={['pro']}
  >
    {plans.map(plan => (
      <SelectList.Option key={plan.id} id={plan.id} textValue={plan.name}>
        <div className="col-start-2 row-span-2">
          <Stack space={2}>
            <Inline space={2} alignY="center">
              <Text slot="label">{plan.name}</Text>
              {plan.badge ? (
                <Badge variant="primary">{plan.badge}</Badge>
              ) : null}
            </Inline>
            <Inline space={1} alignY="bottom">
              <Text fontSize="lg" weight="bold">
                {plan.price}
              </Text>
              <Text variant="muted" fontSize="xs">
                {plan.period}
              </Text>
            </Inline>
            <Text slot="description">{plan.description}</Text>
            <Stack space={1} asList>
              {plan.features.map(feature => (
                <Inline key={feature} space={2} alignY="center">
                  <Check
                    size={14}
                    className="text-success-muted-foreground shrink-0"
                  />
                  <Text fontSize="xs">{feature}</Text>
                </Inline>
              ))}
            </Stack>
          </Stack>
        </div>
      </SelectList.Option>
    ))}
  </SelectList>
);
