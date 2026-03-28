import type { ComponentPropsWithoutRef, Ref } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

interface SliderProps extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ref?: Ref<HTMLSpanElement>;
}

/**
 * Range slider — supports single value and range (two thumbs) via `defaultValue` array.
 * Backed by Radix UI Slider (role=slider, arrow key navigation built-in).
 *
 * @example
 * <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
 * <Slider defaultValue={[20, 80]} max={100} step={5} aria-label="Price range" />
 */
function Slider({ className, ref, ...props }: SliderProps) {
  // Forward accessible name to each Thumb — Radix Root does NOT auto-propagate these
  const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, ...rest } = props;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      {...rest}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {(rest.defaultValue ?? rest.value ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

Slider.displayName = "Slider";

export { Slider };
export type { SliderProps };
