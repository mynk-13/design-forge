import type { Meta, StoryObj } from "@storybook/react";

function Welcome() {
  return (
    <div
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "3rem",
        maxWidth: "600px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          background: "hsl(245 58% 60% / 0.1)",
          color: "hsl(245 58% 60%)",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Phase 1 — Monorepo Foundation
      </div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "hsl(222 47% 11%)",
          margin: "0 0 1rem",
        }}
      >
        DesignForge Storybook
      </h1>
      <p style={{ color: "hsl(215 16% 47%)", lineHeight: 1.6, margin: 0 }}>
        Component stories will appear here as they are built in Phase 3+.
        The Storybook infrastructure is fully wired up — add{" "}
        <code
          style={{
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            background: "hsl(210 40% 96%)",
            padding: "0.125rem 0.375rem",
            borderRadius: "0.25rem",
            fontSize: "0.875em",
          }}
        >
          .stories.tsx
        </code>{" "}
        files co-located with components in{" "}
        <code
          style={{
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            background: "hsl(210 40% 96%)",
            padding: "0.125rem 0.375rem",
            borderRadius: "0.25rem",
            fontSize: "0.875em",
          }}
        >
          packages/ui/src/
        </code>
        .
      </p>
    </div>
  );
}

const meta: Meta<typeof Welcome> = {
  title: "DesignForge/Welcome",
  component: Welcome,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
