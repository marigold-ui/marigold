---
'@marigold/docs': patch
---

docs(DST-1719): document the single-thumb form of the Slider `thumbLabels` prop

The prop was only described under "Ranges", so the single-thumb string form was undocumented even though a thumb label is the only way to say what a single-thumb slider's value refers to. Adds a "Labelling the thumbs" section covering both forms, with a demo showing each.

Also drops `thumbLabels="price"` from the two filter examples. Both sit on a single-thumb slider already labelled "Max. Price", so now that a string label applies to the whole thumb they would announce "price Max. Price", which is the redundancy the new section tells readers to avoid.
