import "./preview.css";
import type { Preview } from "@storybook/react";

// ── Auto-height bridge ────────────────────────────────────────────────────────
// Runs inside the Storybook preview iframe. Posts the document's scroll height
// to the parent (docs page) so StorybookPreview can resize the iframe to fit
// the story exactly — no manual height calibration needed.
if (typeof window !== "undefined") {
  let timer: ReturnType<typeof setTimeout>;

  const postHeight = () => {
    window.parent.postMessage(
      {
        type: "STORYBOOK_IFRAME_HEIGHT",
        height: document.documentElement.scrollHeight,
      },
      "*"
    );
  };

  // Debounce so rapid DOM mutations don't flood the parent with messages
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(postHeight, 150);
  };

  // Fire on initial load
  window.addEventListener("load", schedule);
  document.addEventListener("DOMContentLoaded", schedule);

  // Fire whenever DOM structure changes (dialogs opening, dropdowns expanding…)
  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Respond to explicit height requests from the parent
  window.addEventListener("message", (event) => {
    if (event.data?.type === "REQUEST_HEIGHT") postHeight();
  });
}
// ─────────────────────────────────────────────────────────────────────────────

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {},
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"],
        },
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "hsl(0 0% 100%)" },
        { name: "dark", value: "hsl(222 47% 11%)" },
      ],
    },
  },
};

export default preview;
