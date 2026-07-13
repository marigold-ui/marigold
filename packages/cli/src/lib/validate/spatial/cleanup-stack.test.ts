import { describe, expect, it } from 'vitest';
import { createCleanupStack } from './cleanup-stack.js';

describe('createCleanupStack', () => {
  it('runs teardowns in LIFO order (last resource created, torn down first)', async () => {
    const order: string[] = [];
    const stack = createCleanupStack();
    stack.push(() => order.push('workdir')); // created first
    stack.push(() => order.push('server'));
    stack.push(() => order.push('context')); // created last
    await stack.run();
    expect(order).toEqual(['context', 'server', 'workdir']);
  });

  it('runs every teardown even when one rejects, and never rejects itself', async () => {
    const ran: string[] = [];
    const stack = createCleanupStack();
    stack.push(() => ran.push('a'));
    stack.push(() => Promise.reject(new Error('boom')));
    stack.push(() => ran.push('c'));
    await expect(stack.run()).resolves.toBeUndefined();
    // Both non-failing teardowns ran despite the middle one throwing.
    expect(ran.sort()).toEqual(['a', 'c']);
  });

  it('tolerates a synchronous throw in a teardown', async () => {
    const ran: string[] = [];
    const stack = createCleanupStack();
    stack.push(() => {
      throw new Error('sync boom');
    });
    stack.push(() => ran.push('after'));
    await expect(stack.run()).resolves.toBeUndefined();
    expect(ran).toContain('after');
  });

  it('re-runs all teardowns on a second run, including ones pushed in between', async () => {
    const counts = new Map<string, number>();
    const bump = (k: string) => counts.set(k, (counts.get(k) ?? 0) + 1);
    const stack = createCleanupStack();
    stack.push(() => bump('first'));
    await stack.run();
    // A resource created after the first sweep (the renderer's deferred-sweep case).
    stack.push(() => bump('late'));
    await stack.run();
    expect(counts.get('first')).toBe(2); // ran in both sweeps
    expect(counts.get('late')).toBe(1); // only existed for the second
  });

  it('is a no-op with no teardowns registered', async () => {
    const stack = createCleanupStack();
    await expect(stack.run()).resolves.toBeUndefined();
  });
});
