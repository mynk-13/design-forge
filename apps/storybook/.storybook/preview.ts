import "./preview.css";
import { createElement, useEffect } from "react";
import type { Preview, Decorator } from "@storybook/react";

// ── Theme helpers ─────────────────────────────────────────────────────────────
function applyTheme(isDark: boolean): void {
  const bg = isDark ? "hsl(222 47% 11%)" : "hsl(0 0% 100%)";
  const fg = isDark ? "hsl(210 40% 98%)" : "hsl(222 47% 11%)";

  document.documentElement.classList.toggle("dark", isDark);

  // Force body — overrides Storybook's backgrounds addon inline styles.
  // Inline !important beats any stylesheet !important per the CSS cascade.
  document.body.style.setProperty("background-color", bg, "important");
  document.body.style.setProperty("color", fg, "important");

  // Storybook's Docs view renders inside #storybook-docs and injects its own
  // theming via emotion/inline styles. Force those containers too so the Docs
  // tab background matches the selected theme.
  const docsRoot = document.getElementById("storybook-docs");
  if (docsRoot) {
    docsRoot.style.setProperty("background-color", bg, "important");
    docsRoot.style.setProperty("color", fg, "important");
  }
}

// ── Bootstrap: apply theme from URL before first React render ─────────────────
// Both the docs site (via ?theme=) and Storybook globals (via ?globals=theme:)
// encode the theme in the URL so the correct class is on <html> before any
// story or decorator runs — no postMessage timing issues.
if (typeof window !== "undefined") {
  const params = new URLSearchParams(window.location.search);

  // ?theme=dark  — set by StorybookPreview.tsx in the docs site
  const urlTheme = params.get("theme");
  if (urlTheme) applyTheme(urlTheme === "dark");

  // ── Auto-height bridge ──────────────────────────────────────────────────────
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

  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(postHeight, 150);
  };

  window.addEventListener("load", schedule);
  document.addEventListener("DOMContentLoaded", schedule);

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Respond to explicit height requests and real-time theme changes from the
  // parent docs page (used when the user toggles dark/light without navigating).
  window.addEventListener("message", (event) => {
    if (event.data?.type === "REQUEST_HEIGHT") postHeight();
    if (event.data?.type === "THEME_CHANGE") {
      applyTheme(event.data.theme === "dark");
    }
  });
}

// ── Theme decorator ───────────────────────────────────────────────────────────
// Reads globals.theme (driven by the toolbar toggle or the ?globals= URL param
// that StorybookPreview.tsx appends to every iframe src) and keeps the <html>
// class in sync across story switches — no JSX / .tsx rename needed.
const withTheme: Decorator = (Story, context) => {
  const isDark = (context.globals?.theme ?? "light") === "dark";
  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);
  return createElement(Story as any);
};

// ─────────────────────────────────────────────────────────────────────────────

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
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
    // Disable the built-in backgrounds addon. It wraps every story in a
    // <div style="background:white"> which overrides our CSS-variable theming.
    // Theme is handled entirely via the .dark class + --df-* CSS tokens above.
    backgrounds: { disable: true },
  },
};

export default preview;
