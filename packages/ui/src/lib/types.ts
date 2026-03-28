import type { VariantProps } from "class-variance-authority";

/**
 * Extracts CVA variant props from a CVA-generated class function.
 * Use this to build component prop interfaces cleanly.
 *
 * @example
 * const buttonVariants = cva("...", { variants: { variant: {...} } });
 * interface ButtonProps extends VariantPropsOf<typeof buttonVariants> {}
 */
export type VariantPropsOf<T extends (...args: never[]) => string> =
  VariantProps<T>;

/**
 * Adds the `asChild` prop to a component's props.
 * When `asChild` is true, the component renders as its child element
 * using @radix-ui/react-slot, merging props and behavior.
 */
export interface AsChildProps {
  asChild?: boolean;
}

/**
 * Utility type: makes all specified keys required.
 */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type: omits `ref` from HTML element props.
 * Use with React 19 ref-as-prop pattern to avoid duplicate ref declaration.
 */
export type PropsWithoutRef<T> = Omit<T, "ref">;
