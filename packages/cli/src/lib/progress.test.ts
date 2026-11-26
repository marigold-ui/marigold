import * as prompts from '@clack/prompts';
import { Writable } from 'node:stream';
import { createProgress } from './progress.js';

vi.mock('@clack/prompts', async importOriginal => {
  const actual = await importOriginal<typeof import('@clack/prompts')>();
  return { ...actual, spinner: vi.fn(actual.spinner) };
});

const capture = () => {
  let text = '';
  const output = new Writable({
    write(chunk, _encoding, done) {
      text += String(chunk);
      done();
    },
  });
  return { output, text: () => text };
};

afterEach(() => {
  vi.mocked(prompts.spinner).mockClear();
});

test('prints one line to start and one to stop when output is piped', async () => {
  vi.useFakeTimers();
  const { output, text } = capture();

  const progress = createProgress({ isTTY: false, output });
  progress.start('Installing with pnpm');
  await vi.advanceTimersByTimeAsync(2000);
  progress.stop('Packages installed.');
  vi.useRealTimers();

  const lines = text().trimEnd().split('\n');
  expect(lines).toHaveLength(2);
  expect(lines[0]).toContain('Installing with pnpm');
  expect(lines[1]).toContain('Packages installed.');
  expect(prompts.spinner).not.toHaveBeenCalled();
});

test('uses the animated spinner in a terminal', () => {
  const { output } = capture();

  createProgress({ isTTY: true, output });

  expect(prompts.spinner).toHaveBeenCalledWith({ output });
});
