---
'@marigold/components': patch
---

fix(DST-1829): name and describe the FileField trigger by its label and addon

`FileField` now announces itself like every other form field. Its label used to sit next to the field without being linked to anything, so a screen reader read only "Upload" on focus. The upload button is now named by the field label ("Attachment, Upload") and described by its `description`, its error message and a badge in `addon`, which matches what DST-1747 did for the other fields. A `<ContextualHelp>` in `addon` stays its own button and is not part of the description.

In the default size, the drop zone is named by its text and the field label as well. React Aria does not forward a description to the drop zone's focus target, so the upload button inside it carries the description. In `small` size, an `aria-label` or `aria-labelledby` passed to `FileField` now lands on the upload button instead of the wrapper element, where it had no effect.
