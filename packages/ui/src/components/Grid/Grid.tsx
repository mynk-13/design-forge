import type { HTMLAttributes, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
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
    gapX: {
      "0": "gap-x-0",
      "1": "gap-x-1",
      "2": "gap-x-2",
      "3": "gap-x-3",
      "4": "gap-x-4",
      "6": "gap-x-6",
      "8": "gap-x-8",
    },
    gapY: {
      "0": "gap-y-0",
      "1": "gap-y-1",
      "2": "gap-y-2",
      "3": "gap-y-3",
      "4": "gap-y-4",
      "6": "gap-y-6",
      "8": "gap-y-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
  },
});

interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * CSS Grid layout container with shorthand variant props.
 *
 * @example
 * <Grid cols={3} gap="4">...</Grid>
 * <Grid cols={2} gapX="6" gapY="2" align="start">...</Grid>
 */
function Grid({
  className,
  cols,
  rows,
  gap,
  gapX,
  gapY,
  align,
  justify,
  flow,
  ref,
  ...props
}: GridProps) {
  return (
    <div
      ref={ref}
      className={cn(
        gridVariants({ cols, rows, gap, gapX, gapY, align, justify, flow }),
        className
      )}
      {...props}
    />
  );
}

Grid.displayName = "Grid";

export { Grid, gridVariants };
export type { GridProps };
