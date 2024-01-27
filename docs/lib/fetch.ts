/**
 * Super simple fetch helper to prevent cluttering demos.
 */

export interface ValidationError extends Error {
  cause?: { [name: string]: string[] };
}

// POST
// ---------------
export const post = async <T>(url: string, data: T) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Validation error
    if (res.status === 400) {
      const cause = await res.json();
      throw new Error(`Invalid user inputs`, { cause });
    }

    throw new Error(`Error posting "${url}"...`);
  }

  const json = await res.json();
  return json;
};
