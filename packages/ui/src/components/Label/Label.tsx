import type { ComponentPropsWithoutRef, Ref } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils";

interface LabelProps extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  ref?: Ref<HTMLLabelElement>;
}

/**
 * Accessible form label backed by Radix UI Label.
 * Associates with a form control via `htmlFor` or by wrapping the control.
 */
function Label({ className, ref, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}

Label.displayName = "Label";

export { Label };
export type { LabelProps };
