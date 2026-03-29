import type { LucideProps } from "lucide-react";

/**
 * Standard icon props used across all `@designforge/icons` exports.
 *
 * Extends `LucideProps` with DesignForge defaults baked in:
 * - `size` defaults to `16`
 * - `strokeWidth` defaults to `1.5`
 * - `color` defaults to `"currentColor"` (inherits from CSS `color`)
 *
 * All props are individually overridable by consumers.
 */
export interface IconProps extends LucideProps {
  /**
   * Icon dimensions in pixels (sets both width and height).
   * @default 16
   */
  size?: number | string;
  /**
   * SVG stroke width.
   * @default 1.5
   */
  strokeWidth?: number | string;
  /**
   * Icon colour. Defaults to `"currentColor"` so the icon inherits
   * the parent element's text colour automatically.
   * @default "currentColor"
   */
  color?: string;
}
