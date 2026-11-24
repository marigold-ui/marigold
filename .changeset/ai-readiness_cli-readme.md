---
'@marigold/cli': patch
'@marigold/docs': patch
---

docs(DST-1981): document `marigold search` and `marigold validate` for agents

The CLI page of the docs had no section for `marigold search` and `marigold validate`, and the README pointed AI agents at a file that no longer has the section it named. Both now describe the commands and the loop an agent should follow: search for the component, read its props, write the code, then run `marigold validate --checks technical` until it passes.
