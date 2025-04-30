'use client';

import { venueTypes, venues } from '@/lib/data/venues';
import { Center, Inline, Stack, Table, Text } from '@marigold/components';
import { Star } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import { useFilter, useSearch } from './utils';

const EmptyState = () => (
  <div className="grid min-w-xl place-items-center gap-2 py-10">
    <svg
      className="h-32"
      viewBox="85 50 90 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <metadata>Creator: Boris Kozelev (https://visarts.de/)</metadata>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M207 65C210.866 65 214 68.134 214 72C214 75.866 210.866 79 207 79H167C170.866 79 174 82.134 174 86C174 89.866 170.866 93 167 93H189C192.866 93 196 96.134 196 100C196 103.866 192.866 107 189 107H178.826C173.952 107 170 110.134 170 114C170 116.577 172 118.911 176 121C179.866 121 183 124.134 183 128C183 131.866 179.866 135 176 135H93C89.134 135 86 131.866 86 128C86 124.134 89.134 121 93 121H54C50.134 121 47 117.866 47 114C47 110.134 50.134 107 54 107H94C97.866 107 101 103.866 101 100C101 96.134 97.866 93 94 93H69C65.134 93 62 89.866 62 86C62 82.134 65.134 79 69 79H109C105.134 79 102 75.866 102 72C102 68.134 105.134 65 109 65H207ZM207 93C210.866 93 214 96.134 214 100C214 103.866 210.866 107 207 107C203.134 107 200 103.866 200 100C200 96.134 203.134 93 207 93Z"
        className="fill-stone-50"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M153.672 64L162.974 131.843L163.809 138.649C164.079 140.842 162.519 142.837 160.327 143.107L101.767 150.297C99.5739 150.566 97.5781 149.007 97.3089 146.814L88.2931 73.3868C88.1585 72.2904 88.9381 71.2925 90.0345 71.1579C90.0414 71.1571 90.0483 71.1563 90.0553 71.1555L94.9136 70.6105M98.8422 70.1698L103.429 69.6553L98.8422 70.1698Z"
        className="fill-white"
      />
      <path
        d="M154.91 63.8302C154.817 63.1463 154.186 62.6678 153.502 62.7616C152.818 62.8554 152.34 63.4859 152.433 64.1698L154.91 63.8302ZM162.974 131.843L164.214 131.69C164.214 131.685 164.213 131.679 164.212 131.673L162.974 131.843ZM163.809 138.649L165.05 138.497L163.809 138.649ZM160.327 143.107L160.479 144.347L160.327 143.107ZM101.767 150.297L101.919 151.538L101.767 150.297ZM97.3089 146.814L98.5496 146.662L97.3089 146.814ZM90.0553 71.1555L90.1946 72.3977L90.0553 71.1555ZM95.053 71.8527C95.739 71.7758 96.2328 71.1572 96.1558 70.4712C96.0789 69.7851 95.4603 69.2913 94.7743 69.3683L95.053 71.8527ZM98.7028 68.9276C98.0168 69.0046 97.523 69.6231 97.5999 70.3092C97.6769 70.9952 98.2954 71.489 98.9815 71.412L98.7028 68.9276ZM103.569 70.8975C104.255 70.8205 104.748 70.202 104.671 69.5159C104.594 68.8299 103.976 68.3361 103.29 68.4131L103.569 70.8975ZM152.433 64.1698L161.735 132.013L164.212 131.673L154.91 63.8302L152.433 64.1698ZM161.733 131.995L162.569 138.801L165.05 138.497L164.214 131.69L161.733 131.995ZM162.569 138.801C162.754 140.309 161.682 141.681 160.174 141.866L160.479 144.347C163.357 143.994 165.404 141.375 165.05 138.497L162.569 138.801ZM160.174 141.866L101.614 149.056L101.919 151.538L160.479 144.347L160.174 141.866ZM101.614 149.056C100.107 149.241 98.7347 148.169 98.5496 146.662L96.0682 146.967C96.4216 149.845 99.041 151.891 101.919 151.538L101.614 149.056ZM98.5496 146.662L89.5338 73.2344L87.0524 73.5391L96.0682 146.967L98.5496 146.662ZM89.5338 73.2344C89.4833 72.8233 89.7757 72.4491 90.1868 72.3986L89.8821 69.9173C88.1006 70.136 86.8337 71.7576 87.0524 73.5391L89.5338 73.2344ZM90.1868 72.3986C90.1894 72.3983 90.192 72.398 90.1946 72.3977L89.9159 69.9133C89.9046 69.9145 89.8934 69.9159 89.8821 69.9173L90.1868 72.3986ZM90.1946 72.3977L95.053 71.8527L94.7743 69.3683L89.9159 69.9133L90.1946 72.3977ZM98.9815 71.412L103.569 70.8975L103.29 68.4131L98.7028 68.9276L98.9815 71.412Z"
        className="fill-stone-700"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M151.14 68.2692L159.56 129.753L160.317 135.921C160.561 137.908 159.167 139.715 157.203 139.956L104.761 146.395C102.798 146.636 101.008 145.22 100.764 143.233L92.6141 76.8568C92.4795 75.7605 93.2592 74.7626 94.3555 74.628L100.843 73.8314"
        className="fill-stone-100"
      />
      <path
        d="M110.672 51.25H156.229C156.866 51.25 157.481 51.4715 157.971 51.8721L158.173 52.0547L171.616 65.4902C172.132 66.0059 172.422 66.7053 172.422 67.4346V130C172.422 131.519 171.191 132.75 169.672 132.75H110.672C109.153 132.75 107.922 131.519 107.922 130V54C107.922 52.4812 109.153 51.25 110.672 51.25Z"
        className="fill-white stroke-stone-700"
        strokeWidth="2.5"
      />
      <path
        d="M156.672 52.4028V64C156.672 65.6569 158.015 67 159.672 67H167.605"
        className="stroke-stone-700"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M118 118H144M118 67H144H118ZM118 79H161H118ZM118 92H161H118ZM118 105H161H118Z"
        className="stroke-stone-200"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <Center>
      <Text size="lg" weight="bold">
        No venues match your criteria
      </Text>
      <Text color="stone-500">
        Try adjusting your filters or search to find the right venue.
      </Text>
    </Center>
  </div>
);

export const VenuesView = () => {
  const [search] = useSearch();
  const [filter] = useFilter();

  const result = venues.filter(venue => {
    // Search
    if (search && !venue.name.toLowerCase().includes(search.toLowerCase()))
      return false;

    // Filter
    if (filter.type !== undefined && filter.type !== venue.type) return false;
    if (filter.capacity && filter.capacity < venue.capacity) return false;
    if (filter.price && filter.price < venue.price.to) return false;
    if (filter.rating && filter.rating > venue.rating) return false;
    return true;
  });

  return (
    <Table aria-label="Venue List" emptyState={EmptyState}>
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Type</Table.Column>
        <Table.Column>Address</Table.Column>
        <Table.Column align="right">Capacity</Table.Column>
        <Table.Column align="right">Price</Table.Column>
        <Table.Column align="right">Rating</Table.Column>
      </Table.Header>
      <Table.Body>
        {result.map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>
              <Text weight="medium">{venue.name}</Text>
            </Table.Cell>
            <Table.Cell>{venueTypes[venue.type]}</Table.Cell>
            <Table.Cell>
              <Stack>
                <Text>{venue.street}</Text>
                <Text>{venue.city}</Text>
              </Stack>
            </Table.Cell>
            <Table.Cell>{venue.capacity}</Table.Cell>
            <Table.Cell>
              <NumericFormat value={venue.price.from} /> -{' '}
              <NumericFormat
                style="currency"
                value={venue.price.to}
                currency="EUR"
                maximumFractionDigits={0}
              />
            </Table.Cell>
            <Table.Cell>
              <Inline space="0.5" alignY="center">
                <NumericFormat value={venue.rating} minimumFractionDigits={1} />{' '}
                <Star size={14} />
              </Inline>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
