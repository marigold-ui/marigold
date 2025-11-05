import { Accordion, Headline, Stack, Text } from '@marigold/components';

const faqs = [
  {
    id: 1,
    question: 'What are your shipping options?',
    answer:
      'We offer several shipping options to meet your needs. These include Standard Shipping (3-5 business days), Expedited Shipping (2-3 business days), and Express Shipping (1 business day). Shipping costs and availability vary based on your location and will be calculated at checkout.',
  },
  {
    id: 2,
    question: 'What is your return policy?',
    answer:
      "We accept returns on most new, unopened items within 30 days of delivery for a full refund. If the return is a result of our error (you received an incorrect or defective item), we will also pay the return shipping costs. Please visit our 'Returns' page to start the process.",
  },
  {
    id: 3,
    question: 'How can I track my order?',
    answer:
      "Once your order has shipped, you will receive a confirmation email containing a tracking number. You can use this number on the carrier's website to see the status of your delivery. You can also find tracking information in your account's 'Order History' section.",
  },
  {
    id: 4,
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express, Discover), as well as PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.',
  },
  {
    id: 5,
    question: 'How do I reset my password?',
    answer:
      "If you've forgotten your password, please go to the login page and click the 'Forgot Password?' link. Enter the email address associated with your account, and we will send you a link to create a new password.",
  },
  {
    id: 6,
    question: 'How can I contact customer support?',
    answer:
      "Our customer support team is here to help! You can reach us via email at support@example.com, by phone at (800) 555-1234 during business hours (M-F, 9 AM - 5 PM EST), or by using the 'Contact Us' form on our website. We typically respond to emails within 24 hours.",
  },
];

export const FAQ = () => (
  <Stack space={8}>
    <Headline level="1">Frequently asked questions</Headline>
    <Accordion iconPosition="left">
      {faqs.map(faq => (
        <Accordion.Item key={faq.id} id={faq.id}>
          <Accordion.Header>
            <Headline level="4">{faq.question}</Headline>
          </Accordion.Header>
          <Accordion.Content>
            <Text variant="muted">{faq.answer}</Text>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  </Stack>
);
