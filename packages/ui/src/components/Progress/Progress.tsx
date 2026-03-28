import type { ComponentPropsWithoutRef, Ref } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const progressVariants = cva("relative w-full overflow-hidden rounded-full bg-secondary", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    },
  },
  defaultVariants: { size: "md" },
});

interface ProgressProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * Progress bar — determinate (value 0–100) or indeterminate (value=null/undefined).
 * Backed by Radix UI Progress (role=progressbar, aria-valuenow managed).
 */
function Progress({ className, value, size, ref, ...props }: ProgressProps) {
  const isIndeterminate = value === null || value === undefined;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size }), className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          isIndeterminate && "animate-[progress-indeterminate_1.5s_ease-in-out_infinite]"
        )}
        style={{
          transform: isIndeterminate
            ? undefined
            : `translateX(-${100 - (value ?? 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
export type { ProgressProps };
