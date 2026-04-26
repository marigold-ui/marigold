import {
  Badge,
  Inline,
  SelectList,
  SelectListProps,
  Text,
} from '@marigold/components';

const palettes = {
  info: {
    bg: 'var(--color-info-muted)',
    fg: 'var(--color-info-muted-foreground)',
  },
  warning: {
    bg: 'var(--color-warning-muted)',
    fg: 'var(--color-warning-muted-foreground)',
  },
  success: {
    bg: 'var(--color-success-muted)',
    fg: 'var(--color-success-muted-foreground)',
  },
  destructive: {
    bg: 'var(--color-destructive-muted)',
    fg: 'var(--color-destructive-muted-foreground)',
  },
} as const;

type Palette = keyof typeof palettes;

const StandardArt = ({ palette }: { palette: Palette }) => {
  const { bg, fg } = palettes[palette];
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 56"
      className="size-12 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="10" style={{ fill: bg }} />
      <path
        d="M10 30v-6a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v6a3 3 0 0 0 0 6v6a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3v-6a3 3 0 0 0 0-6Z"
        style={{ fill: 'var(--color-background)', stroke: fg }}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M28 22v22"
        style={{ stroke: fg }}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <text
        x="19"
        y="38"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.5"
        style={{ fill: fg }}
      >
        A12
      </text>
      <text
        x="37"
        y="38"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.5"
        style={{ fill: fg }}
      >
        €49
      </text>
    </svg>
  );
};

const VipArt = ({ palette }: { palette: Palette }) => {
  const { bg, fg } = palettes[palette];
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 56"
      className="size-12 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="10" style={{ fill: bg }} />
      <path
        d="M14 38h28M15 22l6 6 7-12 7 12 6-6-2 16H17z"
        style={{ fill: 'var(--color-background)', stroke: fg }}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="15" cy="22" r="2" style={{ fill: fg }} />
      <circle cx="41" cy="22" r="2" style={{ fill: fg }} />
      <circle cx="28" cy="16" r="2" style={{ fill: fg }} />
      <circle cx="28" cy="32" r="1.6" style={{ fill: fg }} />
    </svg>
  );
};

const StudentArt = ({ palette }: { palette: Palette }) => {
  const { bg, fg } = palettes[palette];
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 56"
      className="size-12 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="10" style={{ fill: bg }} />
      <path
        d="M28 16 46 24 28 32 10 24Z"
        style={{ fill: 'var(--color-background)', stroke: fg }}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M18 28v9c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5v-9"
        style={{ stroke: fg }}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M46 24v10"
        style={{ stroke: fg }}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="46" cy="36" r="2.4" style={{ fill: fg }} />
    </svg>
  );
};

const PressArt = ({ palette }: { palette: Palette }) => {
  const { bg, fg } = palettes[palette];
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 56"
      className="size-12 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="10" style={{ fill: bg }} />
      <rect
        x="9"
        y="22"
        width="38"
        height="22"
        rx="3"
        style={{ fill: 'var(--color-background)', stroke: fg }}
        strokeWidth="1.8"
      />
      <path
        d="M20 22v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"
        style={{ stroke: fg }}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="28"
        cy="33"
        r="6"
        style={{ fill: bg, stroke: fg }}
        strokeWidth="1.8"
      />
      <circle cx="28" cy="33" r="2" style={{ fill: fg }} />
      <circle cx="41" cy="27" r="1.4" style={{ fill: fg }} />
    </svg>
  );
};

const tickets = [
  {
    id: 'standard',
    name: 'Standard ticket',
    price: '€49',
    badge: { variant: 'info', label: 'Most popular' },
    description:
      'Open seating in rows 10–25, doors open one hour before the show. Free rebooking up to 24 hours before the event.',
    Art: StandardArt,
    palette: 'info' as const,
  },
  {
    id: 'vip',
    name: 'VIP ticket',
    price: '€129',
    description:
      'Reserved seat in the first five rows, access to the VIP lounge with complimentary drinks, and a meet-and-greet with the cast after the show.',
    Art: VipArt,
    palette: 'warning' as const,
  },
  {
    id: 'student',
    name: 'Student ticket',
    price: '€29',
    description:
      'Discounted entry for full-time students. Bring a valid student ID for entry; tickets cannot be exchanged at the door.',
    Art: StudentArt,
    palette: 'success' as const,
  },
  {
    id: 'press',
    name: 'Press ticket',
    badge: { variant: 'error', label: 'Invitation only' },
    description:
      'Reserved for accredited press. Pick up your badge at the press desk on arrival; photo ID is required.',
    Art: PressArt,
    palette: 'destructive' as const,
  },
];

export default (props: SelectListProps) => (
  <SelectList
    {...props}
    label="Ticket category"
    selectionMode="single"
    defaultSelectedKeys={['standard']}
    p="square-relaxed"
    width="3/4"
  >
    {tickets.map(({ id, name, price, badge, description, Art, palette }) => (
      <SelectList.Option key={id} id={id} textValue={name}>
        <div className="col-start-2 row-span-2 flex items-start gap-4">
          <Art palette={palette} />
          <div className="flex flex-col gap-1">
            <Text slot="label">
              <Inline space={2} alignY="center">
                {price ? `${name} — ${price}` : name}
                {badge ? (
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                ) : null}
              </Inline>
            </Text>
            <Text slot="description">{description}</Text>
          </div>
        </div>
      </SelectList.Option>
    ))}
  </SelectList>
);
