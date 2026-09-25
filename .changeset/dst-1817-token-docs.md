---
'@marigold/docs': patch
---

docs(DST-1817): describe how `ui-state-disabled` derives its colors

The token overview said the utility paints the `disabled` tokens. It now derives label, fill and border from the text color, so the docs say that and point to the controls that still use the tokens directly.
