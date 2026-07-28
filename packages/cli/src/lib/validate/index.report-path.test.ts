import { describe, expect, it } from 'vitest';
import { validate } from './index.js';
import { tmpFile } from './test-support/tmp.js';

describe('validate() report.file path display', () => {
  it('falls back to the absolute path instead of a long ../../.. chain when the file is outside cwd', async () => {
    // `path.relative(process.cwd(), filePath)` alone would produce a
    // `../../../../../../tmp/...` chain for any file outside cwd (as
    // tmpFile()'s os.tmpdir()-based fixtures always are), which is harder
    // to read than just showing the absolute path.
    const file = tmpFile(
      'report-path-outside-cwd.tsx',
      `import { Button } from '@marigold/components';
const App = () => <Button>Click</Button>;
export default App;`
    );
    const report = await validate(file, {
      checks: ['technical'],
      viewport: { width: 1280, height: 720 },
    });
    expect(report.file).toBe(file);
  });
});
