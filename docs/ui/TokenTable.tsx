'use client';

export interface TokenEntry {
  name: string;
  value: string;
  useFor?: string;
}

export const TokenTable = ({ tokens }: { tokens: TokenEntry[] }) => {
  const hasUseFor = tokens.some(t => t.useFor);

  return (
    <div data-theme="rui" className="rounded-xl">
      <table className="text-fd-foreground" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th></th>
            <th>Token</th>
            <th>Value</th>
            {hasUseFor && <th>Use for</th>}
          </tr>
        </thead>
        <tbody>
          {tokens.map(({ name, value, useFor }) => (
            <tr key={name}>
              <td style={{ width: 56 }}>
                <div
                  className="size-10 rounded-sm border border-black/10"
                  style={{ background: `var(--color-${name})` }}
                />
              </td>
              <td>
                <div>
                  <code className="text-sm before:content-none after:content-none">
                    {name}
                  </code>
                </div>
                <div className="text-fd-muted-foreground text-[10px]">
                  var(--color-{name})
                </div>
              </td>
              <td>
                <code className="text-fd-muted-foreground text-xs before:content-none after:content-none">
                  {value}
                </code>
              </td>
              {hasUseFor && (
                <td className="text-fd-foreground text-sm">{useFor}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
