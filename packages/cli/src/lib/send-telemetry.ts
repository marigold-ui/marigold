import fs from 'node:fs';

const main = async () => {
  const file = process.argv[2];
  if (!file) return;

  let payload: { url: string; event: unknown } | null = null;
  try {
    const raw = fs.readFileSync(file, 'utf8');
    payload = JSON.parse(raw);
  } catch {
    // fall through to cleanup
  }

  if (payload) {
    try {
      await fetch(payload.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.event),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      // Silent — telemetry is fire-and-forget.
    }
  }

  try {
    fs.unlinkSync(file);
  } catch {
    // ignore
  }
};

void main();
