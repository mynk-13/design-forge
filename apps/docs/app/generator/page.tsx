import type { Metadata } from "next";
import { GeneratorClient } from "./_components/GeneratorClient";

export const metadata: Metadata = {
  title: "AI Component Generator",
  description:
    "Describe a React component in plain English and get production-ready TypeScript code using DesignForge UI components.",
};

export default function GeneratorPage() {
  return <GeneratorClient />;
}
