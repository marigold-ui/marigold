import { Grid } from '@marigold/components';
import { cn } from '@marigold/system';

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

export default () => (
  <Grid
    areas={[
      'event-1 event-1 mobile-ticket',
      'logo logo mobile-ticket',
      'logo logo tickets',
      'social-media event-2 tickets',
    ]}
    columns={[3, 2, 3]}
    rows={['160px', '60px', '40px', '100px']}
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
        className="object-none object-left-top"
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
