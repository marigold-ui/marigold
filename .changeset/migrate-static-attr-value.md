---
'@marigold/cli': patch
---

fix(DST-1656): stop `marigold migrate` from warning on value-conditional props whose value is a literal wrapped in braces. The value check only read a bare `StringLiteral`, so `width={20}`, `width={48}` and `width={'1/2'}` all fell into the "cannot be ruled out statically" branch — a v18 run over a real app produced 16 `Select`/`ComboBox`/`Autocomplete` `width="fit"` warnings without a single site actually using `fit`. Literals inside a JSX expression container now resolve like bare ones; genuinely dynamic values such as `width={someVar}` still warn.
