---
'@marigold/docs': patch
---

docs(DST-1698): remove the Design Principles page from Getting Started

The page was generic design advice (Familiarity, Simplicity, Clarity) with nothing tied to a Marigold component or token, and nothing in the docs linked to it. The maintained equivalent lives in `foundations/component-principles` and the rest of `foundations/*`, so Getting Started keeps only the pages that help someone actually start using Marigold.

No redirect is added: the page had no inbound links and the docs app has no redirect config.
