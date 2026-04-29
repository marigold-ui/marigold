---
'@marigold/docs': patch
---

fix(docs): make MCP and embedding env vars optional so `pnpm build:docs` works locally without `AWS_BEDROCK_*`, `OIDC_*`, or `BLOB_READ_WRITE_TOKEN` set. Also corrects the `claude mcp add marigold-docs` snippet to use the positional URL argument instead of `--url`.
