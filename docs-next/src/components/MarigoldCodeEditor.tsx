import { useSandpack } from '@codesandbox/sandpack-react';

export default function MarigoldCodeEditor() {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  const code = files[activeFile].code;
  console.log(code);
  return <pre>{code}</pre>;
}
