import { Table } from '@/ui';
import { ReactNode } from 'react';

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
  property?: string;
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
              {property ? `${property}-${modifier}` : modifier}
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas
              color={`var(--color-${property ? `${property}-` : ''}${modifier})`}
            />
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
      'hover',
      'foreground-hover',
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

// Base semantic tokens
export const BaseSemanticTokens = () => (
  <ColorTable
    modifiers={[
      'background',
      'foreground',
      'brand',
      'brand-foreground',
      'secondary',
      'secondary-foreground',
      'hover',
      'hover-foreground',
    ]}
  />
);

// Feedback semantic tokens
export const FeedbackSemanticTokens = () => (
  <ColorTable
    modifiers={[
      'destructive',
      'destructive-foreground',
      'destructive-muted',
      'destructive-muted-foreground',
      'destructive-muted-accent',
      'success',
      'success-foreground',
      'success-muted',
      'success-muted-foreground',
      'success-muted-accent',
      'warning',
      'warning-foreground',
      'warning-muted',
      'warning-muted-foreground',
      'warning-muted-accent',
      'info',
      'info-foreground',
      'info-muted',
      'info-muted-foreground',
      'info-muted-accent',
      'access-admin',
      'access-admin-foreground',
      'access-master',
      'access-master-foreground',
    ]}
  />
);

// State semantic tokens
export const StateSemanticTokens = () => (
  <ColorTable
    modifiers={[
      'muted',
      'muted-foreground',
      'disabled',
      'disabled-foreground',
      'placeholder',
      'ring',
      'input',
    ]}
  />
);

export const BackgroundTokens = () => (
  <ColorTable
    property="bg"
    modifiers={[
      'hover',
      'hover-foreground',
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
