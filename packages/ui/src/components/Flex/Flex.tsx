import type { HTMLAttributes, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
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
    inline: {
      true: "inline-flex",
    },
  },
  defaultVariants: {
    direction: "row",
  },
});

interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * Flexbox layout container with shorthand variant props.
 *
 * @example
 * <Flex direction="col" gap="4" align="center">...</Flex>
 * <Flex justify="between" wrap="wrap">...</Flex>
 */
function Flex({
  className,
  direction,
  align,
  justify,
  wrap,
  gap,
  inline,
  ref,
  ...props
}: FlexProps) {
  return (
    <div
      ref={ref}
      className={cn(flexVariants({ direction, align, justify, wrap, gap, inline }), className)}
      {...props}
    />
  );
}

Flex.displayName = "Flex";

export { Flex, flexVariants };
export type { FlexProps };
