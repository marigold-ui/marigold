#!/bin/bash
mkdir -p packages/components/src/${1} && \
cp -n config/template/index.ts packages/components/src/${1}/index.ts && \
cp -n config/template/Component.tsx packages/components/src/${1}/${1}.tsx && \
cp -n config/template/Component.test.tsx packages/components/src/${1}/${1}.test.tsx && \
cp -n config/template/Component.stories.mdx packages/components/src/${1}/${1}.stories.mdx
