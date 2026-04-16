---
'@marigold/components': major
'@marigold/theme-rui': major
'@marigold/system': major
'@marigold/docs': major
---

refa([DST-1162]): **Breaking changes**: The `Card` component has been refactored into a compound component. Sub-components like `Card.Header`, `Card.Body`, `Card.Footer`, and `Card.Preview` must now be used explicitly to compose the card layout. This replaces the previous prop-based API.
