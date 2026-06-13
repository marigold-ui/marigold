---
'@marigold/docs': minor
---

feat: add MCP server for semantic search over Marigold docs

Adds an MCP (Model Context Protocol) server at `/mcp` that lets AI coding assistants (Claude Code, VS Code Copilot, etc.) semantically search the Marigold documentation. An ETL pipeline (`pnpm build:embeddings`) chunks the MDX docs and generates vector embeddings via AWS Bedrock Titan v2, served via Streamable HTTP transport with Keycloak-authenticated access.

[DST-1166](https://reservix.atlassian.net/browse/DST-1166)
