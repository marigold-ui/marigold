import { allChangelogs } from 'contentlayer/generated';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useEffect } from 'react';
import React from 'react';
import semverMaxSatisfying from 'semver/ranges/max-satisfying';
import { useRouter } from 'next/router';
import { Mdx } from '@/ui/mdx';

export default function Page({
  doc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(doc.body.code);
  const router = useRouter();

  useEffect(() => {
    if (router.query.version === 'latest') {
      router.replace(`/changelog/v${doc.version}`);
    }
  }, [router, doc]);

  return <Mdx components={MDXComponents as any} />;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    ...allChangelogs.map(doc => ({
      params: { version: `v${doc.version}` },
    })),
    {
      params: { version: 'latest' },
    },
  ];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  let versionParam = ctx.params.version;

  if (versionParam === 'latest') {
    versionParam = `v${semverMaxSatisfying(
      allChangelogs.map(({ version }) => version),
      '*'
    )}`;
  }
  const doc = allChangelogs.find(
    ({ version }) => `v${version}` === versionParam
  );
  return {
    props: { doc },
  };
};
