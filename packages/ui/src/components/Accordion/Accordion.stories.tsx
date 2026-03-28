import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const meta: Meta = { title: "Data Display/Accordion", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

const items = [
  { value: "a1", question: "Is it accessible?", answer: "Yes. Uses WAI-ARIA accordion pattern via Radix UI." },
  { value: "a2", question: "Is it keyboard navigable?", answer: "Yes. Tab to focus, Space/Enter to expand, Arrow keys to navigate." },
  { value: "a3", question: "Can multiple items be open?", answer: 'Use type="multiple" on the Accordion root to allow multiple expanded items.' },
];

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: "420px" }}>
      {items.map(({ value, question, answer }) => (
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
    <Accordion type="multiple" style={{ width: "420px" }}>
      {items.map(({ value, question, answer }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
