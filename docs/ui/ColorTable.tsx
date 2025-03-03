import { ReactNode } from 'react';
import { Table } from '@marigold/components';

export interface ColorCanvasProps {
  children?: ReactNode;
  color: string;
}

export const ColorCanvas = ({ children, color }: ColorCanvasProps) => (
  <div
    className="w-20 rounded-xs bg-(--token) p-4"
    style={{ '--token': color } as any}
  >
    {children}
  </div>
);

interface ColorPalettesProps {
  property: string;
  modifiers?: string[];
}

const ColorTable = ({ property, modifiers = [''] }: ColorPalettesProps) => (
  <Table
    aria-labelledby={`${property} token table`}
    variant="colorTable"
    stretch
  >
    <Table.Header>
      <Table.Column key={'name'}>Name</Table.Column>
      <Table.Column key={'color'}>Color</Table.Column>
    </Table.Header>
    <Table.Body>
      {modifiers.map(modifier => (
        <Table.Row key={modifier}>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {property}-{modifier}
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${property}-${modifier})`} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export const ColorPalettes = ({ name }: { name: string }) => (
  <ColorTable
    property={name}
    modifiers={[
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '950',
    ]}
  />
);

export const TextTokens = () => (
  <ColorTable
    property="text"
    modifiers={[
      'base',
      'base-hover',
      'base-disabled',
      'inverted',
      'inverted-hover',
      'inverted-disabled',
      'brand',
      'brand-hover',
      'accent',
      'accent-hover',
      'info',
      'info-hover',
      'success',
      'success-hover',
      'warning',
      'warning-hover',
      'error',
      'error-hover',
      'link',
      'link-hover',
    ]}
  />
);

export const White = () => <ColorTable property="white" />;

export const Black = () => <ColorTable property="black" />;

export const BackgroundTokens = () => (
  <ColorTable
    property="bg"
    modifiers={[
      'base',
      'base-hover',
      'base-active',
      'base-disabled',
      'inverted',
      'inverted-hover',
      'inverted-active',
      'inverted-disabled',
      'brand',
      'brand-hover',
      'brand-active',
      'accent',
      'accent-hover',
      'accent-active',
      'info',
      'info-hover',
      'info-active',
      'success',
      'success-hover',
      'success-active',
      'warning',
      'warning-hover',
      'warning-active',
      'error',
      'error-hover',
      'error-active',
      'selected',
      'selected-input',
      'surface',
      'surface-raised',
      'surface-overlay',
      'surface-sunken',
      'mastermark',
      'adminmark',
    ]}
  />
);

export const BorderTokens = () => (
  <ColorTable
    property="border"
    modifiers={[
      'base',
      'base-hover',
      'base-active',
      'base-disabled',
      'inverted',
      'inverted-hover',
      'inverted-active',
      'inverted-disabled',
      'brand',
      'brand-hover',
      'brand-active',
      'accent',
      'accent-hover',
      'accent-active',
      'info',
      'info-hover',
      'info-active',
      'success',
      'success-hover',
      'success-active',
      'warning',
      'warning-hover',
      'warning-active',
      'error',
      'error-hover',
      'error-active',
      'selected',
      'input',
    ]}
  />
);

export const OutlineTokens = () => (
  <ColorTable property="outline" modifiers={['focus']} />
);
