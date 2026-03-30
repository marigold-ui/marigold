---
'@marigold/components': patch
---

Remove redundant subcomponent exports (`AccordionItem`, `ListBoxItem`, `SelectListItem`, `ProgressCircleSvg`) from the public index. These are already accessible via their parent compound components (e.g., `Accordion.Item`) or are internal implementation details.
