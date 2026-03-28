import type { ComponentPropsWithoutRef, Ref } from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "../../lib/utils";

interface AspectRatioProps
  extends ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

/**
 * Constrains its child to a given aspect ratio.
 * Backed by Radix UI AspectRatio.
 *
 * @example
 * <AspectRatio ratio={16 / 9}>
 *   <img src="..." alt="..." className="object-cover w-full h-full" />
 * </AspectRatio>
 *
 * <AspectRatio ratio={1}>  {/* Square *\/}
 *   <img src="..." alt="..." className="object-cover w-full h-full" />
 * </AspectRatio>
 */
function AspectRatio({ className, ref, ...props }: AspectRatioProps) {
  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
}

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
export type { AspectRatioProps };
