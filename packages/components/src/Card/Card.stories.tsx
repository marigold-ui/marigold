import { Close, ExternalLink } from '@marigold/icons';
import preview from '../../../../config/storybook/.storybook/preview';
import { Center } from '../Center/Center';
import { Container } from '../Container/Container';
import { Inline } from '../Inline/Inline';
import { Link } from '../Link/Link';
import { Split } from '../Split/Split';
import { Text } from '../Text/Text';
import { Tiles } from '../Tiles/Tiles';
import { Card } from './Card';

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      description: 'The variant of the card',
      options: ['default', 'master', 'admin'],
    },
    size: {
      control: {
        type: 'radio',
      },
      description: 'The size of the card',
      options: ['default', 'stretch', 'small'],
    },
    p: {
      control: {
        type: 'text',
      },
      description: 'The padding of the card',
    },
    px: {
      control: {
        type: 'text',
      },
      description: 'The x padding of the card',
    },
    py: {
      control: {
        type: 'text',
      },
      description: 'The y padding of the card',
    },
    pr: {
      control: {
        type: 'text',
      },
      description: 'The right padding of the card',
    },
    pt: {
      control: {
        type: 'text',
      },
      description: 'The top padding of the card',
    },
    pb: {
      control: {
        type: 'text',
      },
      description: 'The bottom padding of the card',
    },
    pl: {
      control: {
        type: 'text',
      },
      description: 'The left padding of the card',
    },
  },
});

export const Basic = meta.story({
  render: args => (
    <Container>
      <Card {...args}>
        <h2>Professor Severus Snape</h2>
        <section>
          <p>
            <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2
            May, 1998)[2] was an English half-blood[3] wizard serving as Potions
            Master (1981-1996), Head of Slytherin House (1981-1997), Defence
            Against the Dark Arts professor (1996-1997), and Headmaster
            (1997-1998) of the Hogwarts School of Witchcraft and Wizardry as
            well as a member of the Order of the Phoenix and a Death Eater. His
            double life played an extremely important role in both of the
            Wizarding Wars against Voldemort.
          </p>
        </section>
      </Card>
    </Container>
  ),
});

export const CoreCard = meta.story({
  render: args => (
    <Tiles tilesWidth="300px" space={5}>
      <Card {...args} p={3}>
        <Inline alignY="top">
          <Link href={'#'} target="blank">
            <ExternalLink size={26} className="fill-[#990000]" />
          </Link>
          <Split />
          <Close />
        </Inline>
        <Center>
          <Link href={'#'}>Reservix GmbH (1)</Link>
        </Center>
      </Card>

      <Card {...args} p={3}>
        <Inline alignY="top">
          <Link href={'#'} target="blank">
            <ExternalLink size={26} className="fill-[#990000]" />
          </Link>
          <Split />
          <Close />
        </Inline>
        <Center>
          <Text>Interne Verkaufsstelle</Text>
          <Link href={'#'}>Kasse 2 (9)</Link>
        </Center>
      </Card>
    </Tiles>
  ),
});

export const Stretch = meta.story({
  render: args => (
    <Card {...args}>
      <h2>Professor Severus Snape</h2>
      <section>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </section>
    </Card>
  ),
});

export const PaddingAndSpace = meta.story({
  render: args => (
    <Card {...args} p={8} space={4}>
      <h2>Professor Severus Snape</h2>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </p>
    </Card>
  ),
});
