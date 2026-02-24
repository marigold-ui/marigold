---
"fumadocs": patch
---

feat(DST-1163): Add raw markdown MCP endpoint for documentation pages

Implements `/mcp/[...slug]` route and `pnpm build:md-docs` that converts all MDX documentation pages to clean Markdown format, enabling programmatic access for AI/LLM integration and external tools. 
The custom remark pipeline processes embedded JSX components (component demos, props tables, design tokens) into semantic Markdown with code blocks and tables.
