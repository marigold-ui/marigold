import preview from '.storybook/preview';
import { alignment, cn } from '@marigold/system';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Grid } from './Grid';

const meta = preview.meta({
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    alignX: {
      control: { type: 'select' },
      options: Object.keys(alignment.horizontal.alignmentX),
      description: 'Horizontal alignment for the children.',
    },
    alignY: {
      control: { type: 'select' },
      options: Object.keys(alignment.horizontal.alignmentY),
      description: 'Vertical alignment for the children.',
    },
    space: {
      control: { type: 'text' },
      description: 'Responsive Style Value for spacing between grid items.',
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the grid container.',
    },
  },
});

export const HolyGrail = meta.story({
  render: () => (
    <Grid
      areas={['header header', 'sidebar main', 'footer footer']}
      columns={[1, 4]}
      rows={['80px', 'auto', '80px']}
      height={80}
      space={1}
    >
      <Grid.Area name="header">
        <div className="size-full bg-slate-600" />
      </Grid.Area>
      <Grid.Area name="sidebar">
        <div className="size-full bg-slate-600" />
      </Grid.Area>
      <Grid.Area name="main">
        <div className="size-full bg-slate-600" />
      </Grid.Area>
      <Grid.Area name="footer">
        <div className="size-full bg-slate-600" />
      </Grid.Area>
    </Grid>
  ),
});

export const Bento = meta.story({
  render: () => {
    const Teaser = ({
      className,
      src,
      alt,
    }: {
      className?: string;
      src: string;
      alt: string;
    }) => (
      <img
        className={cn(
          'size-full rounded-2xl object-cover object-center drop-shadow-lg',
          className
        )}
        alt={alt}
        src={src}
      />
    );

    return (
      <Grid
        areas={[
          'event-1 event-1 mobile-ticket',
          'logo logo mobile-ticket',
          'logo logo tickets',
          'social-media event-2 tickets',
        ]}
        columns={[3, 2, 3]}
        rows={['200px', '80px', '60px', '140px']}
        space={4}
      >
        <Grid.Area name="event-1">
          <Teaser
            alt="crowd surfing"
            src="https://www.reservix.net/app/uploads/2023/08/shutterstock_2134745259.jpg"
          />
        </Grid.Area>
        <Grid.Area name="mobile-ticket">
          <Teaser
            alt="mobile ticket"
            src="https://www.reservix.net/app/uploads/resized/2023/12/Zusammenarbeit-RX-Mobilticket-1000x667-231201-1000x750-c-center.jpg"
          />
        </Grid.Area>
        <Grid.Area name="logo">
          <Teaser
            className="bg-black object-scale-down"
            alt="logo"
            src="https://www.reservix.net/app/themes/friendventure-reservix/dist/components/BasisFooter/Assets/reservix-logo-fbb6448c90.svg"
          />
        </Grid.Area>
        <Grid.Area name="social-media">
          <Teaser
            className="object-none object-top-left"
            alt="social media"
            src="https://www.reservix.net/app/uploads/resized/2023/12/Marketing-Expertise-collage-V2-1000x750-c-center.png"
          />
        </Grid.Area>
        <Grid.Area name="event-2">
          <Teaser
            alt="artist from back"
            src="https://cdn.pressebox.de/f/f3ebdc8b4e5375b5/attachments/1451457.attachment"
          />
        </Grid.Area>
        <Grid.Area name="tickets">
          <Teaser
            alt="tickets"
            src="https://www.reservix.net/app/uploads/resized/2023/11/tickets_reservix-1-1000x750-c-center.jpg"
          />
        </Grid.Area>
      </Grid>
    );
  },
});

export const Content = meta.story({
  args: {
    areas: ['label value', 'action description'],
    columns: ['150px', 'auto'],
    rows: ['auto', 'auto'],
    space: 2,
    alignY: 'center',
  },
  render: args => (
    <Grid {...args}>
      <Grid.Area name="label">
        <Text weight="bold">Username:</Text>
      </Grid.Area>
      <Grid.Area name="value">
        <Text>Max Mustermann</Text>
      </Grid.Area>
      <Grid.Area name="action">
        <Button>Edit</Button>
      </Grid.Area>
      <Grid.Area name="description">
        <Text>Click to update your username</Text>
      </Grid.Area>
    </Grid>
  ),
});
