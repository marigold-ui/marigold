import {
  Badge,
  ContextualHelp,
  Inline,
  SelectList,
  Stack,
  Text,
} from '@marigold/components';
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
    details: {
      summary: 'Free forever for individuals and small teams.',
      sections: [
        {
          title: "What's included",
          items: [
            'Up to 3 active projects',
            'Up to 5 collaborators per project',
            '1 GB total storage',
            'Community Slack and forum support',
          ],
        },
        {
          title: 'Limits',
          items: [
            'API rate limit: 60 requests per minute',
            'No SLA, best-effort uptime',
            'Files retained for 30 days after deletion',
          ],
        },
      ],
    },
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
    details: {
      summary:
        'Built for teams shipping in production. Billed monthly, cancel anytime.',
      sections: [
        {
          title: "What's included",
          items: [
            'Unlimited active projects',
            'Up to 50 collaborators per project',
            '50 GB total storage',
            'Custom branding, domains, and email sender',
            'Advanced reporting and CSV exports',
          ],
        },
        {
          title: 'Support and SLA',
          items: [
            'Priority email support, 1 business day response',
            '99.9% uptime SLA',
            'API rate limit: 600 requests per minute',
          ],
        },
      ],
    },
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
    details: {
      summary:
        'For organizations with security, compliance, and procurement requirements.',
      sections: [
        {
          title: "What's included",
          items: [
            'Everything in Pro',
            'SSO with SAML and SCIM provisioning',
            'Custom data residency (EU, US, or APAC)',
            'Audit logs and quarterly access reviews',
            'Dedicated success manager',
          ],
        },
        {
          title: 'Support and SLA',
          items: [
            '24/7 priority support with 1 hour response',
            '99.95% uptime SLA with credits',
            'Custom API rate limits',
            'Annual security review and pen-test report',
          ],
        },
      ],
    },
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
        <div className="col-start-2 row-start-1">
          <Inline space={2} alignY="center">
            <Text slot="label" weight="bold" lineHeight="loose">
              {plan.name}
            </Text>
            {plan.badge ? <Badge variant="primary">{plan.badge}</Badge> : null}
          </Inline>
        </div>
        <div className="col-start-2 row-start-2 mt-3">
          <Stack space={3}>
            <Stack alignX="left">
              <Text fontSize="3xl" weight="bold">
                {plan.price}
              </Text>
              <Text variant="muted" fontSize="xs">
                {plan.period}
              </Text>
            </Stack>
            <Text slot="description">{plan.description}</Text>
            <Stack space={1} asList>
              {plan.features.map(feature => (
                <Inline key={feature} space={2} alignY="center">
                  <Check
                    size={14}
                    className="text-success-foreground shrink-0"
                  />
                  <Text fontSize="xs">{feature}</Text>
                </Inline>
              ))}
            </Stack>
          </Stack>
        </div>
        <ContextualHelp
          variant="info"
          ariaLabel={`See full details about ${plan.name}`}
        >
          <ContextualHelp.Title>{plan.name} plan details</ContextualHelp.Title>
          <ContextualHelp.Content>
            <Stack space={4}>
              <Text>{plan.details.summary}</Text>
              {plan.details.sections.map(section => (
                <Stack key={section.title} space={2}>
                  <Text weight="semibold">{section.title}</Text>
                  <Stack space={1} asList>
                    {section.items.map(item => (
                      <Inline key={item} space={2} alignY="top">
                        <Check
                          size={14}
                          className="text-success-foreground mt-1 shrink-0"
                        />
                        <Text fontSize="xs">{item}</Text>
                      </Inline>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </ContextualHelp.Content>
        </ContextualHelp>
      </SelectList.Option>
    ))}
  </SelectList>
);
