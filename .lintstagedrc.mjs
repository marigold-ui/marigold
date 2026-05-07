// Batch files into chunks to avoid Windows command-line length limit
export default {
  '*': filenames => {
    const chunkSize = 30;
    const chunks = [];
    for (let i = 0; i < filenames.length; i += chunkSize) {
      chunks.push(filenames.slice(i, i + chunkSize));
    }
    return chunks.map(
      chunk => `prettier --write ${chunk.map(f => `"${f}"`).join(' ')}`
    );
  },
};
