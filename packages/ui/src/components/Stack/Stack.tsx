import type { HTMLAttributes, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    gap: {
      "0": "gap-0",
      "1": "gap-1",
      "2": "gap-2",
      "3": "gap-3",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
      "8": "gap-8",
      "10": "gap-10",
      "12": "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "vertical",
    gap: "4",
  },
});

interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * Opinionated one-dimensional stack layout (vertical by default).
 * A simpler, more semantic alternative to Flex for linear layouts.
 *
 * @example
 * <Stack gap="6">
 *   <Card />
 *   <Card />
 * </Stack>
 *
 * <Stack direction="horizontal" gap="3" align="center">
 *   <Avatar />
 *   <span>Username</span>
 * </Stack>
 */
function Stack({
  className,
  direction,
  gap,
  align,
  justify,
  wrap,
  ref,
  ...props
}: StackProps) {
  return (
    <div
      ref={ref}
      className={cn(
        stackVariants({ direction, gap, align, justify, wrap }),
        className
      )}
      {...props}
    />
  );
}

Stack.displayName = "Stack";

export { Stack, stackVariants };
export type { StackProps };
