---
'@marigold/components': minor
---

feat(DST-1500): default auto-dismiss timeout for toasts

`addToast` now applies a default `timeout` based on `variant` when none is given: `success`, `info` and the default variant auto-dismiss after 5000ms, while `warning` and `error` stay until dismissed. Pass an explicit `timeout` to override it (values are clamped up to a 5000ms minimum), or `timeout: 0` to keep a toast on screen until it is manually dismissed.

Behavior change: `success`, `info` and default toasts that previously stayed until dismissed now auto-dismiss after 5 seconds. Pass `timeout: 0` to restore the old behavior.
