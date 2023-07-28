'use client';

import { Card, Table, Theme, createVar } from '@/ui';
import { useThemeSwitch } from './ThemeSwitch';
import type { ReactNode } from 'react';

export interface TokensTableProps {
  colors: keyof Theme['colors'];
}

export const ColorTokenTable = ({ colors }: TokensTableProps) => {
  const { current, themes } = useThemeSwitch();

  if (!current) {
    return null;
  }

  const items = Object.entries(themes[current].colors || {});

  //Object.entries(values).map(([token, value]) => ())

  //   items.map(([key, value]) => console.log(Object.keys(value)));

  // TO do: make it better and get the values correctly

  return (
    <div>
      <Card>
        {items.map(([key, values]) => {
          return (
            <>
              <h2>{key}</h2>
              {/* here some infos about the color type e.g. brand colors are used for blablablas */}
              <Table aria-labelledby="tokens table" variant="colorTable">
                <Table.Header>
                  <Table.Column key={'name'}>Name</Table.Column>
                  <Table.Column key={'value'}>Value</Table.Column>
                  <Table.Column key={'example'}>Example</Table.Column>
                </Table.Header>
                <Table.Body>
                  {Object.entries(values).map(([token, value]) => (
                    <Table.Row key={token}>
                      <Table.Cell>
                        <code>
                          {key}.{token}
                        </code>
                      </Table.Cell>
                      <Table.Cell>
                        <code>
                          <span>{JSON.stringify(value)}</span>
                        </code>
                      </Table.Cell>
                      <Table.Cell>
                        <ColorCanvas color={value}>
                          {key}.{token}
                        </ColorCanvas>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>
          );
        })}
      </Card>
    </div>
  );
};

// to do change type
export interface ColorCanvasProps {
  children?: ReactNode;
  color: any;
}

export const ColorCanvas = ({ children, color }: ColorCanvasProps) => (
  <div
    className="w-full rounded-sm bg-[var(--bg)] p-4"
    style={createVar({ bg: color })}
  >
    {children}
  </div>
);
