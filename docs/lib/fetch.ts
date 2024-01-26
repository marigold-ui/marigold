/**
 * Super simple fetch helper to not clutter demos.
 */
export const post = async <T>(url: string, data: T) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error posting "${url}"...`);
  }

  const json = await res.json();
  return json;
};
