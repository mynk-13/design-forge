import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const meta: Meta = {
  title: "Data Display/Accordion",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const faqItems = [
  {
    value: "a1",
    question: "Is it accessible?",
    answer: "Yes. Uses the WAI-ARIA accordion pattern via Radix UI. Each trigger has role=button and manages aria-expanded.",
  },
  {
    value: "a2",
    question: "Is it keyboard navigable?",
    answer: "Yes. Tab to focus the trigger, Space/Enter to expand, Arrow Up/Down to navigate between triggers.",
  },
  {
    value: "a3",
    question: "Can multiple items be open at once?",
    answer: 'Use type="multiple" on the Accordion root to allow multiple expanded items simultaneously.',
  },
  {
    value: "a4",
    question: "Can I prevent collapsing all items?",
    answer: 'Use type="single" without collapsible={true} — the active item will always remain open.',
  },
];

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: 440 }}>
      {faqItems.map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" style={{ width: 440 }}>
      {faqItems.map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a1" style={{ width: 440 }}>
      {faqItems.slice(0, 3).map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const NestedContent: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: 480 }}>
      <AccordionItem value="install">
        <AccordionTrigger>Installation</AccordionTrigger>
        <AccordionContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p>Install via pnpm:</p>
            <pre
              style={{
                background: "hsl(var(--df-muted))",
                padding: "0.75rem",
                borderRadius: "var(--df-radius-sm)",
                fontSize: "0.8125rem",
                overflowX: "auto",
              }}
            >
              pnpm add @designforge/ui
            </pre>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--df-muted-foreground))" }}>
              Requires React 19+ as a peer dependency.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="usage">
        <AccordionTrigger>Usage</AccordionTrigger>
        <AccordionContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p>Import and use any component:</p>
            <pre
              style={{
                background: "hsl(var(--df-muted))",
                padding: "0.75rem",
                borderRadius: "var(--df-radius-sm)",
                fontSize: "0.8125rem",
                overflowX: "auto",
              }}
            >
              {`import { Button } from '@designforge/ui'\n\nexport default function App() {\n  return <Button>Hello</Button>\n}`}
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="theming">
        <AccordionTrigger>Theming</AccordionTrigger>
        <AccordionContent>
          Import the theme CSS in your root layout to apply DesignForge design tokens. Override any
          <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}> --df-*</code> CSS
          variables to customise the theme.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
