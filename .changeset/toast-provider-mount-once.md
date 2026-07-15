---
'@marigold/docs': patch
---

docs(DST-1623): note that `<ToastProvider>` should be mounted once

Every toast shares one global queue (React Aria's model: a single `ToastRegion` per queue), so one `<ToastProvider>` renders them all and `addToast` works from anywhere. Mounting more than one renders every toast per provider and creates duplicate notification `region` landmarks — React Aria surfaces this via its duplicate-landmark-label warning; it does not dedupe. Added a callout on the Toast page documenting the "mount once" guidance.

[DST-1623](https://reservix.atlassian.net/browse/DST-1623)
