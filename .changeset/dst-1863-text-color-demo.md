---
'@marigold/docs': patch
---

docs(DST-1863): fix the "Customizing text" demo on the Text page

The demo used `color="destructive"`, a background tint that left the highlighted text barely readable, and its two `<Text>` elements broke the sentence across two lines. It now highlights part of a paragraph with an inline `<Text as="span">` in `destructive-accent`, the token meant for colored text, and shows `weight`, `size` and the `muted` variant along the way.
