import Link from "next/link";
import { Button } from "@designforge/ui";
import { PlayIcon, BookOpenIcon, SparklesIcon } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 lg:p-24 text-center">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm hover:bg-primary/20 transition-colors">
          <SparklesIcon className="h-4 w-4" />
          <span>v1.0 is now live</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl">
          Build UI at the speed of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">thought.</span>
        </h1>
        
        <p className="mx-auto max-w-[700px] text-lg sm:text-xl text-muted-foreground leading-relaxed">
          DesignForge is a revolutionary React component system equipped with a native AI generation pipeline and a robust Monaco playground. Describe it, audit it, and deploy it.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/docs">
            <Button size="lg" className="h-12 px-8 gap-2 shadow-lg shadow-primary/20 w-full sm:w-auto">
              <BookOpenIcon className="h-5 w-5" />
              Read the Docs
            </Button>
          </Link>
          <a href="/generator" target="_blank" rel="noreferrer">
            <Button size="lg" className="h-12 px-8 gap-2 w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white border-0">
              <SparklesIcon className="h-4 w-4" />
              Launch AI Generator
            </Button>
          </a>
          <a href="/playground" target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="h-12 px-8 gap-2 w-full sm:w-auto text-foreground">
              <PlayIcon className="h-4 w-4" />
              Playground
            </Button>
          </a>
          <a href={process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "https://designforge-storybook.vercel.app"} target="_blank" rel="noreferrer">
            <Button size="lg" className="h-12 px-8 gap-2 w-full sm:w-auto bg-[#ff4785] hover:bg-[#e8356d] text-white border-0">
              <SparklesIcon className="h-4 w-4" />
              Launch Storybook
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-16">
          <div className="flex flex-col gap-2 p-6 rounded-xl border bg-card shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <BookOpenIcon className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Accessible Native Primitive</h3>
            <p className="text-muted-foreground text-sm">Strict WAI-ARIA compliance natively bound into all components, backed by Radix UI infrastructure.</p>
          </div>
          <div className="flex flex-col gap-2 p-6 rounded-xl border bg-card shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Generative Pipeline</h3>
            <p className="text-muted-foreground text-sm">Leverage Anthropic and OpenAI language models directly inside your workspace to bootstrap layouts.</p>
          </div>
          <div className="flex flex-col gap-2 p-6 rounded-xl border bg-card shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <PlayIcon className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg">Interactive Telemetry</h3>
            <p className="text-muted-foreground text-sm">Audit colors, properties, and accessibilities inside an isolated Monaco-powered Babel sandbox engine.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
