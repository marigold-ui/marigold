import * as prompts from '@clack/prompts';
import type { Writable } from 'node:stream';

export interface Progress {
  start: (message: string) => void;
  stop: (message: string) => void;
}

export interface ProgressOptions {
  isTTY?: boolean;
  output?: Writable;
}

/**
 * Use this instead of `prompts.spinner()`. A spinner redraws its line many
 * times a second, which only works in a terminal. When the output is piped,
 * every frame lands in the log, so print one line to start and one to stop.
 */
export const createProgress = ({
  isTTY = process.stdout.isTTY === true,
  output,
}: ProgressOptions = {}): Progress => {
  if (isTTY) return prompts.spinner({ output });
  return {
    start: message => prompts.log.step(message, { output, spacing: 0 }),
    stop: message => prompts.log.step(message, { output, spacing: 0 }),
  };
};
