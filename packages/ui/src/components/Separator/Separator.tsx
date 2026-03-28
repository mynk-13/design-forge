import type { ComponentPropsWithoutRef, Ref } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// orientation comes from Radix props — no need to re-declare via VariantProps
interface SeparatorProps
  extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * Horizontal or vertical visual divider.
 * Backed by Radix UI Separator — correctly sets `role="separator"` or
 * `role="none"` based on the `decorative` prop.
 *
 * @example
 * <Separator />
 * <Separator orientation="vertical" className="h-6" />
 * <Separator decorative />  {/* no role, purely visual *\/}
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = false,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
}

Separator.displayName = "Separator";

export { Separator, separatorVariants };
export type { SeparatorProps };
