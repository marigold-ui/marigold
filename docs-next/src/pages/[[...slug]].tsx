import fs from 'fs-extra';
import path from 'path';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkCodeExtra from 'remark-code-extra';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
/** */
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxjs } from 'micromark-extension-mdxjs';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { select } from 'unist-util-select';
import type { Root } from 'mdast';
/** */
import { Container, Header, Text } from '@marigold/components';

import { CONTENT_PATH } from '../config';
import {
  getContentPaths,
  getNavigation,
  NavigationMenu,
} from '../navigation.utils';
import { GradientHeadline, Layout } from '../components';

export interface ContentPageProps {
  source: MDXRemoteSerializeResult;
  navigation: NavigationMenu;
}

const ContentPage = ({ source, navigation }: ContentPageProps) => {
  const frontmatter = source.frontmatter as { [key: string]: any } | undefined;
  return (
    <Layout navigation={navigation}>
      <main>
        {frontmatter?.title && (
          <Header>
            <GradientHeadline>{frontmatter.title}</GradientHeadline>
            {frontmatter.caption && (
              <Text variant="page-caption">{frontmatter.caption}</Text>
            )}
          </Header>
        )}
        <Container contentType="content" size="large">
          <MDXRemote {...source} />
        </Container>
      </main>
    </Layout>
  );
};

export default ContentPage;

export const getStaticProps = async ({ params }: any) => {
  const contentFilePath = path.join(
    CONTENT_PATH,
    (params.slug || ['index']).join('/')
  );

  let source;
  try {
    source = await fs.readFile(`${contentFilePath}.mdx`, 'utf8');
  } catch {
    source = await fs.readFile(`${contentFilePath}/index.mdx`, 'utf8');
  }

  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [
          //@ts-ignore-error
          remarkCodeExtra,
          {
            transform: (node: any) => {
              if (node.meta && node.meta.includes('preview')) {
                const tree = fromMarkdown(
                  `<Demo>${node.value}</Demo>`.replace(/(\r\n|\n|\r)/gm, ''),
                  {
                    extensions: [mdxjs()],
                    mdastExtensions: [mdxFromMarkdown()],
                  }
                );

                console.log(JSON.stringify(tree, null, 2));
                const jsx = select(
                  ':any(mdxJsxTextElement, mdxJsxFlowElement)',
                  tree
                );

                return {
                  before: [jsx],
                };
              }

              return null;
            },
          },
        ],
        remarkMdxCodeMeta,
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
    parseFrontmatter: true,
  });

  const navigation = await getNavigation();

  return {
    props: {
      source: mdxSource,
      navigation,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getContentPaths();
  return {
    paths,
    fallback: false,
  };
};
