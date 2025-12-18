import { useState } from 'react';
import { Selection } from 'react-aria-components';
import preview from '../../../../config/storybook/.storybook/preview';
import { TableView } from './TableView';

const meta = preview.meta({
  title: 'Components/TableView',
  component: TableView,
  argTypes: {
    selectionMode: {
      control: {
        type: 'radio',
      },
      options: ['none', 'single', 'multiple'],
      description: 'The type of selection that is allowed',
      table: {
        type: { summary: 'SelectionMode' },
        defaultValue: { summary: 'none' },
      },
    },
  },
});

export default meta;

export const Basic = meta.story({
  render: args => (
    <TableView aria-label="Example table" {...args}>
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Type</TableView.Column>
        <TableView.Column>Size</TableView.Column>
      </TableView.Header>
      <TableView.Body>
        <TableView.Row>
          <TableView.Cell>document.pdf</TableView.Cell>
          <TableView.Cell>PDF</TableView.Cell>
          <TableView.Cell>2.5 MB</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>image.png</TableView.Cell>
          <TableView.Cell>Image</TableView.Cell>
          <TableView.Cell>1.2 MB</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>video.mp4</TableView.Cell>
          <TableView.Cell>Video</TableView.Cell>
          <TableView.Cell>45 MB</TableView.Cell>
        </TableView.Row>
        <TableView.Row>
          <TableView.Cell>spreadsheet.xlsx</TableView.Cell>
          <TableView.Cell>Spreadsheet</TableView.Cell>
          <TableView.Cell>850 KB</TableView.Cell>
        </TableView.Row>
      </TableView.Body>
    </TableView>
  ),
});

export const WithSelection = meta.story({
  render: args => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

    return (
      <div>
        <TableView
          aria-label="Files with selection"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          {...args}
        >
          <TableView.Header>
            <TableView.Column>Name</TableView.Column>
            <TableView.Column>Type</TableView.Column>
            <TableView.Column>Size</TableView.Column>
          </TableView.Header>
          <TableView.Body>
            <TableView.Row id="1">
              <TableView.Cell>document.pdf</TableView.Cell>
              <TableView.Cell>PDF</TableView.Cell>
              <TableView.Cell>2.5 MB</TableView.Cell>
            </TableView.Row>
            <TableView.Row id="2">
              <TableView.Cell>image.png</TableView.Cell>
              <TableView.Cell>Image</TableView.Cell>
              <TableView.Cell>1.2 MB</TableView.Cell>
            </TableView.Row>
            <TableView.Row id="3">
              <TableView.Cell>video.mp4</TableView.Cell>
              <TableView.Cell>Video</TableView.Cell>
              <TableView.Cell>45 MB</TableView.Cell>
            </TableView.Row>
            <TableView.Row id="4">
              <TableView.Cell>spreadsheet.xlsx</TableView.Cell>
              <TableView.Cell>Spreadsheet</TableView.Cell>
              <TableView.Cell>850 KB</TableView.Cell>
            </TableView.Row>
          </TableView.Body>
        </TableView>
        <p style={{ marginTop: '16px' }}>
          Selected:{' '}
          {selectedKeys === 'all' ? 'all' : [...selectedKeys].join(', ')}
        </p>
      </div>
    );
  },
});

export const WithSorting = meta.story({
  render: args => {
    return (
      <TableView aria-label="Files with sorting" {...args}>
        <TableView.Header>
          <TableView.Column allowsSorting>Name</TableView.Column>
          <TableView.Column allowsSorting>Type</TableView.Column>
          <TableView.Column allowsSorting>Size</TableView.Column>
        </TableView.Header>
        <TableView.Body>
          <TableView.Row>
            <TableView.Cell>document.pdf</TableView.Cell>
            <TableView.Cell>PDF</TableView.Cell>
            <TableView.Cell>2.5 MB</TableView.Cell>
          </TableView.Row>
          <TableView.Row>
            <TableView.Cell>image.png</TableView.Cell>
            <TableView.Cell>Image</TableView.Cell>
            <TableView.Cell>1.2 MB</TableView.Cell>
          </TableView.Row>
          <TableView.Row>
            <TableView.Cell>video.mp4</TableView.Cell>
            <TableView.Cell>Video</TableView.Cell>
            <TableView.Cell>45 MB</TableView.Cell>
          </TableView.Row>
          <TableView.Row>
            <TableView.Cell>spreadsheet.xlsx</TableView.Cell>
            <TableView.Cell>Spreadsheet</TableView.Cell>
            <TableView.Cell>850 KB</TableView.Cell>
          </TableView.Row>
        </TableView.Body>
      </TableView>
    );
  },
});

export const EmptyState = meta.story({
  render: args => (
    <TableView aria-label="Empty table" {...args}>
      <TableView.Header>
        <TableView.Column>Name</TableView.Column>
        <TableView.Column>Type</TableView.Column>
        <TableView.Column>Size</TableView.Column>
      </TableView.Header>
      <TableView.Body renderEmptyState={() => 'No files found'}>
        {[]}
      </TableView.Body>
    </TableView>
  ),
});

export const DynamicRows = meta.story({
  render: args => {
    interface FileItem {
      id: number;
      name: string;
      type: string;
      size: string;
    }

    const files: FileItem[] = [
      { id: 1, name: 'document.pdf', type: 'PDF', size: '2.5 MB' },
      { id: 2, name: 'image.png', type: 'Image', size: '1.2 MB' },
      { id: 3, name: 'video.mp4', type: 'Video', size: '45 MB' },
      { id: 4, name: 'spreadsheet.xlsx', type: 'Spreadsheet', size: '850 KB' },
    ];

    return (
      <TableView aria-label="Files (dynamic)" {...args}>
        <TableView.Header>
          <TableView.Column isRowHeader>Name</TableView.Column>
          <TableView.Column>Type</TableView.Column>
          <TableView.Column>Size</TableView.Column>
        </TableView.Header>
        <TableView.Body items={files}>
          {(item: FileItem) => (
            <TableView.Row id={item.id}>
              <TableView.Cell>{item.name}</TableView.Cell>
              <TableView.Cell>{item.type}</TableView.Cell>
              <TableView.Cell>{item.size}</TableView.Cell>
            </TableView.Row>
          )}
        </TableView.Body>
      </TableView>
    );
  },
});
