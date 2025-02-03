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

interface ColorPalettsProps {
  name: string;
}

export const ColorPaletts = ({ name }: ColorPalettsProps) => {
  return (
    <Table aria-labelledby={`${name} token table`} variant="colorTable" stretch>
      <Table.Header>
        <Table.Column key={'name'}>Name</Table.Column>
        <Table.Column key={'color'}>Color</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-50
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-50)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-100
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-100)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-200
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-200)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-300
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-300)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-400
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-400)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-500
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-500)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-600
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-600)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-700
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-700)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-800
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-800)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-900
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-900)`} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <code className="before:content-none after:content-none">
              {name}-950
            </code>
          </Table.Cell>
          <Table.Cell>
            <ColorCanvas color={`var(--color-${name}-950)`} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export const TextTokens = () => (
  <Table aria-labelledby={`text token table`} variant="colorTable" stretch>
    <Table.Header>
      <Table.Column key={'name'}>Name</Table.Column>
      <Table.Column key={'color'}>Color</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-base
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-base)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-base-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-base-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-base-disabled
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-base-disabled)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-inverted
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-inverted)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-inverted-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-inverted-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-inverted-disabled
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-inverted-disabled)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-brand
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-brand)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-brand-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-brand-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-accent
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-accent)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-accent-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-accent-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-info
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-info)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-info-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-info-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-success
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-success)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-success-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-success-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-warning
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-warning)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-warning-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-warning-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-error
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-error)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-error-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-error-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-link
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-link)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            text-link-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-link-hover)`} />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const White = () => (
  <Table aria-labelledby={`white token table`} variant="colorTable" stretch>
    <Table.Header>
      <Table.Column key={'name'}>Name</Table.Column>
      <Table.Column key={'color'}>Color</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">white</code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-white)`} />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const Black = () => (
  <Table aria-labelledby={`black token table`} variant="colorTable" stretch>
    <Table.Header>
      <Table.Column key={'name'}>Name</Table.Column>
      <Table.Column key={'color'}>Color</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">black</code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-black)`} />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const BackgroundTokens = () => (
  <Table
    aria-labelledby={`background token table`}
    variant="colorTable"
    stretch
  >
    <Table.Header>
      <Table.Column key={'name'}>Name</Table.Column>
      <Table.Column key={'color'}>Color</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-base
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-base)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-base-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-base-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-base-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-base-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-base-disabled
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-base-disabled)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-inverted
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-inverted)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-inverted-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-inverted-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-inverted-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-inverted-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-inverted-disabled
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-inverted-disabled)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-brand
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-brand)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-brand-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-brand-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-brand-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-brand-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-accent
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-accent)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-accent-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-accent-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-accent-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-accent-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-info
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-info)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-info-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-info-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-info-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-info-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-success
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-success)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-success-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-success-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-success-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-text-success-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-warning
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-warning)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-warning-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-warning-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-warning-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-warning-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-error
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-error)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-error-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-error-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-error-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-error-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-selected
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-selected)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-selected-input
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-selected-input)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-surface
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-surface)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-surface-raised
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-surface-raised)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-surface-overlay
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-surface-overlay)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-surface-sunken
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-surface-sunken)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-mastermark
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-mastermark)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            bg-adminmark
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-bg-adminmark)`} />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const BorderTokens = () => (
  <Table aria-labelledby={`border token table`} variant="colorTable" stretch>
    <Table.Header>
      <Table.Column key={'name'}>Name</Table.Column>
      <Table.Column key={'color'}>Color</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-base
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-base)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-base-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-base-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-base-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-base-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-base-disabled
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-base-disabled)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-inverted
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-inverted)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-inverted-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-inverted-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-inverted-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-inverted-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-inverted-disabled
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-inverted-disabled)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-brand
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-brand)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-brand-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-brand-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-brand-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-brand-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-accent
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-accent)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-accent-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-accent-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-accent-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-accent-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-info
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-info)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-info-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-info-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-info-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-info-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-success
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-success)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-success-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-success-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-success-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-success-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-warning
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-warning)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-warning-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-warning-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-warning-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-warning-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-error
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-error)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-error-hover
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-error-hover)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-error-active
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-error-active)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-selected
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-selected)`} />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            border-input
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-border-input)`} />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const OutlineTokens = () => (
  <Table aria-labelledby={`outline token table`} variant="colorTable" stretch>
    <Table.Header>
      <Table.Column key={'name'}>Name</Table.Column>
      <Table.Column key={'color'}>Color</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <code className="before:content-none after:content-none">
            outline-focus
          </code>
        </Table.Cell>
        <Table.Cell>
          <ColorCanvas color={`var(--color-outline-focus)`} />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
