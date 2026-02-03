# Table

_Organize and display large amount of data in table format._

The `<Table>` is a structured component used to organize and display tabular data in rows and columns. It enhances the functionality of regular `<table>` elements with the possibility to interact and select the data, and helps with accessibility by enabling keyboard navigation.

> ℹ️ What is tabular data?: Tabular data is a structured form of data that is organized in rows and
> columns and resembles a table format.

Our table allows user to selecting one or multiple rows, it includes an action cell, and supports sorting columns. Additionally, it features a sticky header, can stretch to full size, and allows columns to be aligned to the left, center, or right. The table also supports nesting columns and having fixed column widths.

These features will be explained in more detail in the usage section further down the page.

## Anatomy

A table is composed of a container element that organizes data into rows and columns. Each cell within the table can hold either plain text or focusable elements. If the table allows multiple row selection, the first column of each row include a checkbox for selecting that row and the first column header will contain a "select all" checkbox.

## Appearance

This component has multiple appearance variants and sizes available.

| Property  | Type                                          | Description                                 |
| :-------- | :-------------------------------------------- | :------------------------------------------ |
| `variant` | `default \| grid \| muted \| admin \| master` | `The available variants of this component.` |
| `size`    | `-`                                           | `The available sizes of this component.`    |

## Usage

Use a `<Table>` if you need to organize and display large amout of data.
Grouping informations provide a structured and organized way to display data, making it easier to understand and analyze.
Tables allow you to group related information in a clear and concise manner, which enhances data readability and comprehension.

They are ideal for comparing data points. Unlike cards, tables enable users to compare multiple rows and columns without having to move their eyes too much or rely on memory.
Also with the support of single or multiple row actions, they make it convenient to perform data-specific actions such as deleting, sharing, or editing records directly within the table.

✓ Provide descriptive column headers for each column that accurately represent the data.

✗ Avoid using vague or misleading column headers that do not clearly represent the data.

✓ Stretch tables to available width.

✗ Don't use a table for layouting content.

### Variants

<ul>
  <li>
    **Default:** You should use the default variant of the Table component when
    you want a clean, standard table appearance. It’s ideal for most use cases
    where you want to display tabular data clearly and simply. The default
    variant is a good starting point for most tables.
  </li>

  <li>
    **Muted:** Use the `muted` variant for table to reduce visual noise and
    improve clarity, especially in tables with extensive content. This helps
    users focus on the data while maintaining a clean and organized appearance.
  </li>

  <li>
    **Grid:** The `grid` variant is useful if you want clearer separation
    between columns, especially for tables with many columns or dense data. The
    grid variant adds vertical borders between columns, making it easier to scan
    and compare values across rows.
  </li>

  <li>
    **Admin- and Master:** Use this variant to identify rows that are only
    relevant for internal users. [Learn more about its
    usage.](/patterns/admin-master-mark)
  </li>
</ul>

### Display secondary information

Secondary data in a cell is needed when additional context or details are necessary to fully understand the primary data. The primary data of a table cell should always be displayed clearly. It provides better readability and can improve the user experience. Too much secondary data can overwelm users and make the table complexer and harder to read.

```tsx title="table-secondary-content"
import { useEffect, useState } from 'react';
import { Stack, Table } from '@marigold/components';

export default () => {
  const [users, setUsers] = useState<
    { id: number; name: string; username: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setUsers(data);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <Table
          aria-label="user Table"
          selectionMode="multiple"
          stickyHeader
          stretch
        >
          <Table.Header>
            <Table.Column>Id</Table.Column>
            <Table.Column>Name</Table.Column>
            <Table.Column>User</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map(user => (
              <Table.Row key={`${user.name}-${user.id}`}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>
                  <Stack>
                    {user.username}
                    <span className="text-text-info text-xs">{user.email}</span>
                  </Stack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        'Loading data ⬇️ ...... '
      )}
    </>
  );
};
```

✓ Keep cell content concise. Only add additional data when necessary to help understand the data.

✗ Avoid overloading cells with too much information or complex data, and multiple data values in one cell.

### Sticky header

If you have large data tables, setting the header to sticky can provide context when scrolling. To do this, set the `stickyHeader` property on the `<Table>` and wrap it in the [Scrollable](../layout/scrollable) component with a specified height, as shown in the example below.

```tsx title="table-fixed-header"
import { useEffect, useState } from 'react';
import { Scrollable, Stack, Table } from '@marigold/components';

export default () => {
  const [users, setUsers] = useState<
    { id: number; name: string; username: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setUsers(data);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <Scrollable height="300px">
          <Table
            aria-label="user Table"
            selectionMode="multiple"
            stickyHeader
            stretch
          >
            <Table.Header>
              <Table.Column>Id</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>User</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map(user => (
                <Table.Row key={`${user.name}-${user.id}`}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                    <Stack>
                      {user.username}
                      <span className="text-text-info text-xs">
                        {user.email}
                      </span>
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Scrollable>
      ) : (
        'Loading data ⬇️ ...... '
      )}
    </>
  );
};
```

### Highlight data

This is an example of how you can use the [`<Badge>`](../content/badge) within the `<Table>`. Badges can be used in a table to highlight or categorize certain data, making it easier for users to quickly identify key information. This is a common use case if you need to add status indicators, categorizations, labels or tags within the table.

```tsx title="table-badge"
import { DateFormat } from '@/ui';
import { Badge, I18nProvider, Table } from '@marigold/components';

export default () => {
  const columns = [
    { name: 'Id', key: 'id' },
    { name: 'Event', key: 'event' },
    { name: 'Date', key: 'date' },
    { name: 'Status', key: 'status' },
  ];
  const rowData: { [key: string]: string }[] = [
    {
      id: '16382462873',
      event: 'Concert',
      date: '2024-01-10',
      status: 'updated',
    },
    {
      id: '383262736',
      event: 'Open Air Festival',
      date: '2024-07-09',
      status: 'new',
    },
    {
      id: '62836432',
      event: 'Live on Stage',
      date: '2024-11-25',
      status: '',
    },
    {
      id: '82742834',
      event: 'Open Air Summertime',
      date: '2024-06-01',
      status: 'updated',
    },
    {
      id: '78263482',
      event: 'Opera',
      date: '2024-12-12',
      status: 'new',
    },
    {
      id: '9823742',
      event: 'Musical',
      date: '2024-08-19',
      status: 'updated',
    },
  ];
  return (
    <Table size="compact" stretch>
      <Table.Header columns={columns}>
        {column => <Table.Column>{column.name}</Table.Column>}
      </Table.Header>
      <Table.Body items={rowData}>
        {item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.event}</Table.Cell>
            <Table.Cell>
              <I18nProvider locale="de-DE">
                <DateFormat dateStyle="full" value={new Date(`${item.date}`)} />
              </I18nProvider>
            </Table.Cell>
            <Table.Cell>
              {item.status !== '' ? <Badge>{item.status}</Badge> : '-'}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
```

✓ Place badges consistently within the table, preferably in a dedicated column.

✗ Don't place badges randomly within the table or overload the table with too many badges.

### Sorting

Enable the sorting function to help users organize and find data efficiently. This is especially useful since different user tasks may require different sorting orders.

The `<Table>` is sortable through `allowsSorting` prop on it. Sorting controls, indicated by an arrow icon, are located in the column headers and allow for ascending or descending order. For this purpose the properties `onSortChange` which handles the direction when changing and `sortDescriptor`, containing the current column and direction must be specified.

To make async sorting more convenient, you can use the `useAsyncList` hook. The hook manages the async list data and provides convenience methods for updating the data.

```tsx title="table-async"
import { Table, useAsyncList } from '@marigold/components';

export interface asyncData {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

export default () => {
  let list = useAsyncList<asyncData>({
    initialSortDescriptor: { column: 'created', direction: 'ascending' },
    async load({ signal }) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      let json = await res.json();
      return {
        items: json.results,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column as keyof asyncData];
          const second = b[sortDescriptor.column as keyof asyncData];
          // Can be used for date sorting
          const firstDate =
            isNaN(first?.length) || first?.length > 4
              ? Date.parse(first)
              : null;
          const secondDate =
            isNaN(second?.length) || second?.length > 4
              ? Date.parse(second)
              : null;
          const isFirstValidDate =
            firstDate === null ? false : !isNaN(firstDate);
          const isSecondValidDate =
            secondDate === null ? false : !isNaN(secondDate);
          let cmp: number;

          if (isFirstValidDate && isSecondValidDate) {
            cmp = firstDate! < secondDate! ? -1 : 1;
          } else {
            cmp =
              (parseInt(first) || first) < (parseInt(second) || second)
                ? -1
                : 1;
          }
          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      stretch
    >
      <Table.Header>
        <Table.Column key="name" allowsSorting width="2/5">
          Name
        </Table.Column>
        <Table.Column key="height" allowsSorting>
          Height
        </Table.Column>
        <Table.Column key="mass" allowsSorting>
          Mass
        </Table.Column>
        <Table.Column key="birth_year" allowsSorting>
          Birth Year
        </Table.Column>
        <Table.Column key="created" allowsSorting>
          Created
        </Table.Column>
      </Table.Header>
      <Table.Body items={list.items}>
        {item => (
          <Table.Row key={(item as any).name}>
            {columnKey => (
              <Table.Cell>
                {columnKey === 'created'
                  ? `${new Date((item as any).created).toLocaleDateString()} ${new Date((item as any).created).toLocaleTimeString()}`
                  : (item as any)[columnKey]}
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
```

### Handling numeric values

With our formatting helper components for dates and numeric values you can easily ensure consistent and accurate display. See [NumericFormat](../formatters/numericformat), [DateFormat](../formatters/dateformat) for more informations.

Also you see how to use the `align` property on the columns. With that you can set the content of a column to left, center or right.

```tsx title="table-numeric"
import { I18nProvider, Table } from '@marigold/components';
import { DateFormat, NumericFormat } from '@marigold/system';

const rows = [
  {
    event: 'Music Festival',
    date: '2023-08-25',
    price: 50,
    ticketnr: '123456789',
    id: 1,
  },
  {
    event: 'Red Carpet Theater',
    date: '2023-09-10',
    price: 150,
    ticketnr: '987654321',
    id: 2,
  },
  {
    event: 'Conference',
    date: '2023-10-05',
    price: 220.5,
    ticketnr: '246813579',
    id: 3,
  },
  {
    event: 'Sports Tournament',
    date: '2023-11-20',
    price: 75,
    ticketnr: '135792468',
    id: 4,
  },
  {
    event: 'Opera',
    date: '2023-05-15',
    price: 500,
    ticketnr: '128216789',
    id: 5,
  },
] as const;

export default () => (
  <Table aria-label="Data Table" selectionMode="multiple" size="compact">
    <Table.Header>
      <Table.Column>Event</Table.Column>
      <Table.Column>Date</Table.Column>
      <Table.Column align="right">Price</Table.Column>
      <Table.Column align="right">Ticket Number</Table.Column>
    </Table.Header>
    <Table.Body items={rows}>
      {rows.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.event}</Table.Cell>
          <Table.Cell>
            <I18nProvider locale="de-DE">
              <DateFormat dateStyle="full" value={new Date(`${item.date}`)} />
            </I18nProvider>
          </Table.Cell>
          <Table.Cell>
            <I18nProvider locale="en-US">
              <NumericFormat
                style="currency"
                value={item.price}
                currency="USD"
              />
            </I18nProvider>
          </Table.Cell>
          <Table.Cell>{item.ticketnr}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
```

✓ Align numeric values and their header cells to the right. Format numbers to provide tabular numeric font style.

### Nested columns

Nested columns can be useful in tables when you need to organize complex or hierarchical data in a more structured format. These columns can be nested, which will result in more than one header row to be created.

Note the usage of `isRowHeader` in the example below. It controls which columns are included in the [accessibility name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) for each row. By default, only the first column is included, meaning the aria label will be on the first column only.

```tsx title="table-nested"
import { Table } from '@marigold/components';

export default () => (
  <Table aria-label="Example table for nested columns" stretch variant="grid">
    <Table.Header>
      <Table.Column title="Name" align="center">
        <Table.Column isRowHeader>First Name</Table.Column>
        <Table.Column isRowHeader>Last Name</Table.Column>
      </Table.Column>
      <Table.Column title="Information" align="center">
        <Table.Column>Birthday</Table.Column>
        <Table.Column align="right" width={5}>
          Age
        </Table.Column>
      </Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Sam</Table.Cell>
        <Table.Cell>Smith</Table.Cell>
        <Table.Cell>May 3</Table.Cell>
        <Table.Cell>36</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Julia</Table.Cell>
        <Table.Cell>Jones</Table.Cell>
        <Table.Cell>February 10</Table.Cell>
        <Table.Cell>24</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Peter</Table.Cell>
        <Table.Cell>Parker</Table.Cell>
        <Table.Cell>September 7</Table.Cell>
        <Table.Cell>28</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Bruce</Table.Cell>
        <Table.Cell>Wayne</Table.Cell>
        <Table.Cell>December 18</Table.Cell>
        <Table.Cell>32</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
```

✓ Keep nested columns simple to avoid overwhelming users with too much information at once. Only use one level of nesting.

✗ Don't use multiple levels of nested columns, this can make the table complex and difficult to navigate.

### Multiple line cells

If your table contains cells with multiple lines of text, use the `alignY="top"` property on the `<Table>` component to align cell content to the top. This ensures text consistently starts at the top of each cell, making it easier to scan down columns. It also keeps buttons, text, and icons visually aligned, avoiding uneven spacing caused by varying content heights.

```tsx title="table-align-top"
import { Stack, Table, Text } from '@marigold/components';

export default () => {
  return (
    <Table aria-label="Top aligned table" alignY="top" stretch>
      <Table.Header>
        <Table.Column>Event</Table.Column>
        <Table.Column>Description</Table.Column>
        <Table.Column>Location</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Text>Conference</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-001
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Annual Tech Conference</Text>
              <Text>
                Join industry leaders for a day of talks and networking.
              </Text>
              <Text color="muted-foreground" fontSize="xs">
                Registration required
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Berlin</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: City Expo Center
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Workshop</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-002
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={2}>
              <Text weight="bold">React Advanced</Text>
              <Text>
                Hands-on coding session for intermediate React developers.
              </Text>
              <Text color="muted-foreground" fontSize="xs">
                Limited seats available
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Munich</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: TechHub
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Meetup</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-003
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Frontend Community</Text>
              <Text>Monthly meetup for frontend enthusiasts.</Text>
              <Text color="muted-foreground" fontSize="xs">
                Free entry
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Hamburg</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: Innovation Loft
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text> Webinar </Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-004
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Design Systems 101</Text>
              <Text>Online session covering the basics of design systems.</Text>
              <Text color="muted-foreground" fontSize="xs">
                Live Q&A included
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Online</Text>
            <Text color="muted-foreground" fontSize="xs">
              Platform: Zoom
            </Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Text>Hackathon</Text>
            <Text color="muted-foreground" fontSize="xs">
              ID: EVT-005
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Stack space={1}>
              <Text weight="bold">Open Source Sprint</Text>
              <Text>Collaborate and build open source projects in teams.</Text>
              <Text color="muted-foreground" fontSize="xs">
                Prizes for top teams
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text>Cologne</Text>
            <Text color="muted-foreground" fontSize="xs">
              Venue: Startup Garage
            </Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
```

### Row Actions

Row actions let users interact with individual records directly from a table, such as editing, viewing details, or triggering specific operations. These interactions are essential for working with tabular data, and thoughtful design helps users stay oriented and confident. To support clarity, predictability, and efficiency, it’s important to align how and where these actions appear.

Use the `<Button>` component with the secondary (default) variant for row actions. If the action is destructive, use the destructive variant instead. In both cases, apply the small button size to maintain visual consistency and minimize visual noise in dense table layouts.

When it comes to placement, always position row actions at the end of the row. This improves scannability and clearly signals which parts of the row are interactive, helping users quickly locate available actions.

```tsx title="table-action"
import { venues } from '@/lib/data/venues';
import { Button, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Venue List" stretch>
    <Table.Header>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column align="right">Rating</Table.Column>
      <Table.Column>Action</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 3).map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>
            {item.street}, {item.city}
          </Table.Cell>
          <Table.Cell>{item.rating}</Table.Cell>
          <Table.Cell>
            <Button size="small">View Details</Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
```

Show only the most important 1–3 actions per row. These should be the actions users are most likely to need or expect to find without having to open a menu, such as “Edit” or “View.” If you need to support more than three actions, prioritize them by frequency and importance: display the most critical ones directly, and group the rest into a contextual menu using an `<ActionMenu>` (see [ActionMenu section](/components/overlay/menu#actionmenu)). This keeps the row clean and scannable while still offering access to all necessary actions.

Using too many visible actions at once can overwhelm users, make it hard to identify what to do, and increase visual clutter. If space is limited or the layout feels crowded, consider using icon buttons to keep actions compact. Pair them with tooltips to clearly communicate each action’s purpose without adding visual noise.

> ℹ️ Use icons with care: Only use icons when their meaning is clear without explanation. If the icon
> might be ambiguous, prefer a labeled button or add context with a tooltip.

```tsx title="table-action-menu"
import { venues } from '@/lib/data/venues';
import { Archive, CloudDownload, UserCog } from 'lucide-react';
import {
  ActionMenu,
  Button,
  Inline,
  Table,
  Tooltip,
} from '@marigold/components';
import { Edit, Star } from '@marigold/icons';

export default () => (
  <Table aria-label="Venue List" stretch>
    <Table.Header>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column align="right">Rating</Table.Column>
      <Table.Column>Action</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 3).map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>
            {item.street}, {item.city}
          </Table.Cell>
          <Table.Cell>{item.rating}</Table.Cell>
          <Table.Cell>
            <Inline space={1} alignX="center" noWrap>
              <Tooltip.Trigger>
                <Button size="small">
                  <Edit />
                </Button>
                <Tooltip>Edit</Tooltip>
              </Tooltip.Trigger>
              <Tooltip.Trigger>
                <Button size="small">
                  <Star />
                </Button>
                <Tooltip>View Ratings</Tooltip>
              </Tooltip.Trigger>
              <ActionMenu size="small">
                <ActionMenu.Item id="assign">
                  <UserCog /> Assign account manager
                </ActionMenu.Item>
                <ActionMenu.Item id="download">
                  <CloudDownload />
                  Download Data
                </ActionMenu.Item>
                <ActionMenu.Item id="archive">
                  <Archive /> Archive
                </ActionMenu.Item>
              </ActionMenu>
            </Inline>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
```

If you cannot place all row actions at the end of the row, be mindful of clarity and consistency. Actions should remain visually distinct from content and navigation, and be grouped where possible to support scannability. Apply consistent styling to each action and avoid placing them in unexpected locations, as this can increase cognitive load and make it harder for users to understand what they can do in each row.

### Links

Inline links for actions can sometimes be mistaken for regular content and may add visual noise, so it’s best to use them with care. A common and appropriate use of links in tables is placing one on the identifying attribute of a record, such as a name or title, when it leads to the related item or detail view.

When using links in tables, default to the standard `<Link>` component. If the table contains many links, consider simplifying the layout to reduce visual clutter. If links cannot be reduced, use the secondary variant of `<Link>` to maintain clarity and minimize distraction.

```tsx title="table-links"
import { venues } from '@/lib/data/venues';
import { Link, Table } from '@marigold/components';

export default () => (
  <Table aria-label="Event Links Table" stretch>
    <Table.Header>
      <Table.Column>Venue</Table.Column>
      <Table.Column>Address</Table.Column>
      <Table.Column>Rating</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(0, 4).map(venue => (
        <Table.Row key={venue.id}>
          <Table.Cell>
            <Link href={`#`}>{venue.name}</Link>
          </Table.Cell>
          <Table.Cell>
            {venue.street}, {venue.city}
          </Table.Cell>
          <Table.Cell>{venue.rating}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
```

## Props

> ℹ️ Hint: Dynamic Collections: You don't have to hard code the table items, you could also create a dynamic
> collection and iterate through it. You can read more about these collections
> here.

### Table

| Prop                      | Type                                                                                               | Default    | Description                                                                                                           |
| :------------------------ | :------------------------------------------------------------------------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------- |
| alignY                    | `"top" \| "middle"`                                                                                | `"middle"` | Control the vertical alignment of table content.                                                                      |
| children                  | `[ReactElement, string \| JSXElementConstructor>, ReactElement, string \| JSXElementConstructor>]` | -          | The elements that make up the table. Includes the TableHeader, TableBody, Columns, and Rows.                          |
| collection                | `TableCollection`                                                                                  | -          | A pre-constructed collection to use instead of building one from items and children.                                  |
| defaultSelectedKeys       | `Iterable \| "all"`                                                                                | -          | The initial selected keys in the collection (uncontrolled).                                                           |
| disableKeyboardNavigation | `boolean`                                                                                          | `"false"`  | Disable keyboard navigation. Use if you have input fields in your table. Be aware that this is bad for accessibility. |
| disabledBehavior          | `DisabledBehavior`                                                                                 | -          | Whether \`disabledKeys\` applies to all interactions, or only selection.                                              |
| disabledKeys              | `Iterable`                                                                                         | -          | A list of row keys to disable.                                                                                        |
| disallowEmptySelection    | `boolean`                                                                                          | -          | Whether the collection allows empty selection.                                                                        |
| emptyState                | `(() => ReactNode)`                                                                                | -          | Content to display when there are no rows in the table.                                                               |
| focusMode                 | `"row" \| "cell"`                                                                                  | `'row'`    | Whether initial grid focus should be placed on the grid row or grid cell.                                             |
| onCellAction              | `((key: Key) => void)`                                                                             | -          | Handler that is called when a user performs an action on the cell.                                                    |
| onRowAction               | `((key: Key) => void)`                                                                             | -          | Handler that is called when a user performs an action on the row.                                                     |
| onSelectionChange         | `((keys: Selection) => void)`                                                                      | -          | Handler that is called when the selection changes.                                                                    |
| onSortChange              | `((descriptor: SortDescriptor) => any)`                                                            | -          | Handler that is called when the sorted column or direction changes.                                                   |
| selectedKeys              | `Iterable \| "all"`                                                                                | -          | The currently selected keys in the collection (controlled).                                                           |
| selectionBehavior         | `SelectionBehavior`                                                                                | -          | How multiple selection should behave in the collection.                                                               |
| selectionMode             | `SelectionMode`                                                                                    | `"none"`   | The type of selection that is allowed in the collection.                                                              |
| sortDescriptor            | `SortDescriptor`                                                                                   | -          | The current sorted column and direction.                                                                              |
| stickyHeader              | `boolean`                                                                                          | `"true"`   | Make the column sticky to the top of the table.                                                                       |
| stretch                   | `boolean`                                                                                          | `"false"`  | Stretch the table to fill the container.                                                                              |

### Table.Header

| Prop                    | Type                                                 | Default | Description                                                                                                          |
| :---------------------- | :--------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------- |
| **children (required)** | `ColumnElement \| ColumnElement[] \| ColumnRenderer` | -       | A list of \`Column(s)\` or a function. If the latter, a list of columns must be provided using the \`columns\` prop. |
| columns                 | `T[]`                                                | -       | A list of table columns.                                                                                             |

### Table.Column

| Prop                    | Type                                            | Default | Description                                                                                                                                                  |
| :---------------------- | :---------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowsResizing          | `boolean`                                       | -       | Whether the column allows resizing.                                                                                                                          |
| allowsSorting           | `boolean`                                       | -       | Whether the column allows sorting.                                                                                                                           |
| childColumns            | `T[]`                                           | -       | A list of child columns used when dynamically rendering nested child columns.                                                                                |
| **children (required)** | `ReactNode \| ColumnElement \| ColumnElement[]` | -       | Static child columns or content to render as the column header.                                                                                              |
| defaultWidth            | `ColumnSize \| null`                            | -       | The default width of the column.                                                                                                                             |
| isRowHeader             | `boolean`                                       | -       | Whether a column is a \[row header]\(https\://www\.w3.org/TR/wai-aria-1.1/#rowheader) and should be announced by assistive technology during row navigation. |
| maxWidth                | `ColumnStaticSize \| null`                      | -       | The maximum width of the column.                                                                                                                             |
| minWidth                | `ColumnStaticSize \| null`                      | -       | The minimum width of the column.                                                                                                                             |
| textValue               | `string`                                        | -       | A string representation of the column's contents, used for accessibility announcements.                                                                      |
| title                   | `ReactNode`                                     | -       | Rendered contents of the column if \`children\` contains child columns.                                                                                      |
| width                   | `WidthProp`                                     | -       | The width of the column.                                                                                                                                     |

### Table.Body

| Prop                    | Type                                                      | Default | Description                                                                                    |
| :---------------------- | :-------------------------------------------------------- | :------ | :--------------------------------------------------------------------------------------------- |
| **children (required)** | `RowElement \| RowElement[] \| ((item: T) => RowElement)` | -       | The contents of the table body. Supports static items or a function for dynamic rendering.     |
| items                   | `Iterable`                                                | -       | A list of row objects in the table body used when dynamically rendering rows.                  |
| loadingState            | `LoadingState`                                            | -       | The current loading state of the table.                                                        |
| onLoadMore              | `(() => any)`                                             | -       | Handler that is called when more items should be loaded, e.g. while scrolling near the bottom. |

### Table.Row

| Prop                    | Type                                           | Default | Description                                                                                                                                                                         |
| :---------------------- | :--------------------------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **children (required)** | `CellElement \| CellElement[] \| CellRenderer` | -       | Rendered contents of the row or row child items.                                                                                                                                    |
| download                | `string \| boolean`                            | -       | Causes the browser to download the linked URL. A string may be provided to suggest a file name. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download). |
| href                    | `string`                                       | -       | A URL to link to. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href).                                                                                   |
| hrefLang                | `string`                                       | -       | Hints at the human language of the linked URL. See\[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang).                                                   |
| ping                    | `string`                                       | -       | A space-separated list of URLs to ping when the link is followed. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping).                                   |
| referrerPolicy          | `HTMLAttributeReferrerPolicy`                  | -       | How much of the referrer to send when following the link. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy).                                 |
| rel                     | `string`                                       | -       | The relationship between the linked resource and the current page. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).                                  |
| routerOptions           | `undefined`                                    | -       | Options for the configured client side router.                                                                                                                                      |
| target                  | `HTMLAttributeAnchorTarget`                    | -       | The target window for the link. See \[MDN]\(https\://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).                                                                   |
| textValue               | `string`                                       | -       | A string representation of the row's contents, used for features like typeahead.                                                                                                    |

### Table.Cell

| Prop                    | Type        | Default | Description                                                                       |
| :---------------------- | :---------- | :------ | :-------------------------------------------------------------------------------- |
| **children (required)** | `ReactNode` | -       | The contents of the cell.                                                         |
| colSpan                 | `number`    | -       | Indicates how many columns the data cell spans.                                   |
| textValue               | `string`    | -       | A string representation of the cell's contents, used for features like typeahead. |

## Alternative components

Choosing the right alternative to data tables is crucial for effectively displaying your data and enhancing user interaction. Depending on the type of data and the desired user experience, different components can offer different benefits. Here are some alternatives to data tables that might better suit your needs:

<ul>
  <li>
    [SelectionList](/components/collection/selectlist): Displays a list of
    interactive items, useful to create an actionable list of related items,
    such as a list of users.
  </li>

  <li>
    [Cards](/components/content/card): Helpful if the data needs to be displayed
    with more visual hierarchy. Keep in mind that you can't compare data in this
    way not as good as tables, because the eyes have to move much more.
  </li>

  <li>
    [List](/components/content/list): When presenting a simple, linear
    collection of items, often with less data per item. Easy to read and
    navigate, especially for data that doesn’t require complex organization.
  </li>

  <li>
    [Grid](/components/layout/grid): Layout in a table-like structure. This
    gives you full control over the size of the columns and rows and allows you
    to align them according to your needs.
  </li>

  <li>
    [Columns](/components/layout/columns): Create columns in one row, useful if
    you need to align content in a table-like way with fewer rows.
  </li>
</ul>

Is there still not the right alternative for you please [get in touch](../../resources/get-in-touch) with us!

## Related

- [Admin- & master mark](/patterns/admin-master-mark) - Used for marking internal-only features.

- [useAsyncListData](../hooks-and-utils/useAsyncListData) - If you need to load async data into tables.
