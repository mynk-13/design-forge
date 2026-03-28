import type { HTMLAttributes, Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-screen-sm",   // 640px
      md: "max-w-screen-md",   // 768px
      lg: "max-w-screen-lg",   // 1024px
      xl: "max-w-screen-xl",   // 1280px
      "2xl": "max-w-screen-2xl", // 1536px
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  ref?: Ref<HTMLDivElement>;
}

/**
 * Centered, max-width constrained layout wrapper with responsive horizontal padding.
 * Use as the outermost layout primitive on every page.
 *
 * @example
 * <Container size="lg">
 *   <h1>Page content</h1>
 * </Container>
 */
function Container({ className, size, ref, ...props }: ContainerProps) {
  return (
    <div
      ref={ref}
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}

Container.displayName = "Container";

export { Container, containerVariants };
export type { ContainerProps };
