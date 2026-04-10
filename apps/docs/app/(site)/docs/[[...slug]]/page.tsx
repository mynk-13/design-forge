import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocs } from "../../../../lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";

interface DocPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug === "index" ? [] : doc.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: DocPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {};
  }

  return {
    title: doc.meta.title,
    description: doc.meta.description,
    openGraph: {
      title: `${doc.meta.title} | DesignForge`,
      description: doc.meta.description,
      type: "article",
    },
    twitter: {
      title: `${doc.meta.title} | DesignForge`,
      description: doc.meta.description,
    },
  };
}

import * as UI from "@designforge/ui";
import { StorybookPreview } from "../../../../components/StorybookPreview";
import { CopyCodeBlock } from "../../../../components/CopyCodeBlock";

const rehypePrettyCodeOptions: Options = {
  theme: {
    dark: "one-dark-pro",
    light: "one-light",
  },
};

const components = {
  h1: ({ children, ...props }: any) => (
    <h1
      className="mt-2 scroll-m-20 text-[2rem] font-bold tracking-tight text-[#11181C] dark:text-[#EDEDED]"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2
      className="mt-10 scroll-m-20 text-xl font-bold tracking-tight text-[#11181C] dark:text-[#EDEDED] first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="mt-8 scroll-m-20 text-base font-semibold tracking-tight text-[#11181C] dark:text-[#EDEDED]"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props: any) => (
    <p
      className="leading-7 text-[#60646C] dark:text-[#8D8D8D] [&:not(:first-child)]:mt-5"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="my-5 ml-6 list-disc space-y-1.5 text-[#60646C] dark:text-[#8D8D8D]"
      {...props}
    />
  ),
  li: (props: any) => (
    <li className="leading-7" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-[#11181C] dark:text-[#EDEDED]" {...props} />
  ),
  // pre blocks: wrapped with copy button; rehype-pretty-code handles highlighting
  pre: (props: any) => <CopyCodeBlock {...props} />,
  // Inline code only — pre>code blocks are handled by rehype-pretty-code
  code: ({ className, ...props }: any) =>
    className ? (
      <code className={className} {...props} />
    ) : (
      <code
        className="relative rounded-md bg-[#F1F5F9] dark:bg-[#1E2D3D] px-[0.35rem] py-[0.2rem] font-mono text-[0.8em] font-medium text-[#1A56DB] dark:text-[#52A9FF]"
        {...props}
      />
    ),
  iframe: (props: any) => <StorybookPreview {...props} />,
  StorybookPreview: (props: any) => <StorybookPreview {...props} />,
  a: ({ href, ...props }: any) => {
    const storybookBase =
      process.env.NEXT_PUBLIC_STORYBOOK_URL?.replace(/\/$/, "") ??
      "https://designforge-storybook.vercel.app";
    const resolvedHref =
      typeof href === "string"
        ? href.replace(/^https?:\/\/localhost:\d+/, storybookBase)
        : href;
    return <a href={resolvedHref} {...props} />;
  },
  ...UI,
};

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="max-w-none pb-16">
      {/* Page header */}
      <div className="mb-8 pb-8 border-b border-[#E2E8F0] dark:border-[#222222]">
        <h1 className="text-[2rem] font-bold tracking-tight text-[#11181C] dark:text-[#EDEDED] mb-3">
          {doc.meta.title}
        </h1>
        {doc.meta.description && (
          <p className="text-[1.05rem] leading-relaxed text-[#60646C] dark:text-[#8D8D8D] max-w-2xl">
            {doc.meta.description}
          </p>
        )}
      </div>

      {/* MDX content */}
      <div className="docs-content">
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
            },
          }}
        />
      </div>
    </article>
  );
}
