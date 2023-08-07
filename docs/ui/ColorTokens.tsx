'use client';

import { Card, Headline, Table, createVar } from '@/ui';
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

  return (
    <>
      {Object.entries(sections).map(([group, tokenValues]) => (
        <div key={group}>
          <Headline level="3">
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </Headline>
          <Card>
            <div className="overflow-auto">
              <Table aria-labelledby="tokens table" variant="colorTable">
                <Table.Header>
                  <Table.Column key={'name'}>Name</Table.Column>
                  <Table.Column key={'value'}>Value</Table.Column>
                  <Table.Column key={'example'}>Example</Table.Column>
                </Table.Header>
                <Table.Body>
                  {tokenValues.map(([token, color]) => (
                    <Table.Row key={token}>
                      <Table.Cell>
                        <code className="before:content-none after:content-none">
                          {token.replace('-DEFAULT', '')}
                        </code>
                      </Table.Cell>
                      <Table.Cell>
                        <code className="before:content-none after:content-none">
                          {color}
                        </code>
                      </Table.Cell>
                      <Table.Cell>
                        <ColorCanvas color={color} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export interface ColorCanvasProps {
  children?: ReactNode;
  color: string;
}

export const ColorCanvas = ({ children, color }: ColorCanvasProps) => (
  <div
    className=" w-20 rounded-sm bg-[var(--bg)] p-4"
    style={createVar({ bg: color })}
  >
    {children}
  </div>
);
