import type { ElementType, HTMLAttributes, Ref } from "react";
import { cn } from "../../lib/utils";

interface BoxProps extends HTMLAttributes<HTMLElement> {
  /** Render as any HTML element or React component. Defaults to `div`. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}

/**
 * Base layout primitive — the foundation of the DesignForge layout system.
 * Renders as `div` by default. Use `as` to change the underlying element.
 *
 * @example
 * <Box as="section" className="p-4">...</Box>
 * <Box as="main">...</Box>
 */
function Box({ as: Comp = "div", className, ref, ...props }: BoxProps) {
  // Type cast is necessary for polymorphic ref — safe because Comp is a valid element
  const Component = Comp as ElementType;
  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(className)}
      {...props}
    />
  );
}

Box.displayName = "Box";

export { Box };
export type { BoxProps };
