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
  // Dual theme: github-light in light mode, github-dark-dimmed in dark mode
  // keepBackground: true (default) — inline style wins over prose background-color
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
};

const components = {
  h1: ({ children, ...props }: any) => <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight" {...props}>{children}</h1>,
  h2: ({ children, ...props }: any) => <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0" {...props}>{children}</h2>,
  h3: ({ children, ...props }: any) => <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>{children}</h3>,
  p: (props: any) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
  ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  // pre blocks: wrapped with copy button; rehype-pretty-code handles highlighting
  pre: (props: any) => <CopyCodeBlock {...props} />,
  // Inline code only — pre>code blocks are handled by rehype-pretty-code
  code: ({ className, ...props }: any) =>
    className ? (
      <code className={className} {...props} />
    ) : (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props} />
    ),
  iframe: (props: any) => <StorybookPreview {...props} />,
  StorybookPreview: (props: any) => <StorybookPreview {...props} />,
  ...UI, // Spreads all 33 UI components into the MDX scope
};

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none pb-12">
      <div className="space-y-2 mb-8">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {doc.meta.title}
        </h1>
        {doc.meta.description && (
          <p className="text-lg text-muted-foreground">
            {doc.meta.description}
          </p>
        )}
      </div>
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
    </article>
  );
}
