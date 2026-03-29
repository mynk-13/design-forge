import { type NextRequest, NextResponse } from "next/server";
import { lightColors, darkColors, spacingTokens, radiiTokens, shadowTokens, durationTokens, easingTokens } from "@designforge/themes";

export const runtime = "edge";

// Cache for 24 hours — immutable token reference (ADR-009, API Design §19.3)
export const revalidate = 86400;

export function GET(_req: NextRequest) {
  const tokens = {
    version: "1.0.0",
    colors: {
      light: lightColors,
      dark: darkColors,
    },
    spacing: spacingTokens,
    radii: radiiTokens,
    shadows: shadowTokens,
    animations: {
      durations: durationTokens,
      easings: easingTokens,
    },
  };

  return NextResponse.json(tokens, {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      "Content-Type": "application/json",
    },
  });
}
