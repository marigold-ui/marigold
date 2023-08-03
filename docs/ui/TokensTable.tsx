'use client';

import { Card, Table, createVar } from '@/ui';
import { useThemeSwitch } from './ThemeSwitch';
import type { ReactNode } from 'react';

interface NestedStringObject {
  [key: string]: NestedStringObject | string;
}

export const iterateTokens = (colors: NestedStringObject, prefix = '') => {
  let list: [token: string, color: string][] = [];

  for (const key in colors) {
    let value = colors[key];
    if (typeof value === 'object') {
      list.push(...iterateTokens(value, `${prefix}${key}-`));
    } else {
      list.push([`${prefix}${key}`, value]);
    }
  }
  return list;
};

interface ColorTokenTableProps {
  sections: { [group: string]: [token: string, color: string][] };
}
export const ColorTokenTable = ({ sections = {} }: ColorTokenTableProps) => {
  const { current, themes } = useThemeSwitch();

  if (!current) {
    return null;
  }

  const tokens = iterateTokens(themes[current].colors || {});

  tokens.forEach(([token, color]) => {
    const section = token.substring(0, token.indexOf('-')) || token;
    // When the section is not yet created
    if (!sections[section]) {
      sections[section] = [];
    }
    sections[section].push([token, color]);
  });

  // Object.keys(sections).map((a, b, c) =>
  //   sections[a].map((d, f) => console.log(d))
  // );

  [sections].map((token, color) => console.log(token));

  return (
    <Card>
      <>
        <div>
          {Object.entries(sections).map(([group, tokenValues]) => (
            <>
              <h2>{group}</h2>
              <Table aria-labelledby="tokens table" variant="colorTable">
                <Table.Header>
                  <Table.Column key={'name'}>Name</Table.Column>
                  <Table.Column key={'value'}>Value</Table.Column>
                  <Table.Column key={'example'}>Example</Table.Column>
                </Table.Header>
                <Table.Body>
                  {tokenValues.map(([token, color]) => (
                    <Table.Row>
                      <Table.Cell>
                        <code>{token.replace('-DEFAULT', '')}</code>
                      </Table.Cell>
                      <Table.Cell>
                        <code>{color}</code>
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <ColorCanvas color={color} />{' '}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div></div>
            </>
          ))}
        </div>
      </>
    </Card>
  );
};

export interface ColorCanvasProps {
  children?: ReactNode;
  color: any;
}

export const ColorCanvas = ({ children, color }: ColorCanvasProps) => (
  <div
    className="w-20 rounded-sm bg-[var(--bg)] p-4"
    style={createVar({ bg: color })}
  >
    {children}
  </div>
);
