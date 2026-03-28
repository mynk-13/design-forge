import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { useId } from "react";
import { cn } from "../../lib/utils";
import { Label } from "../Label/Label";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  ref?: Ref<HTMLInputElement>;
  /** Visible label text */
  label?: string;
  /** Helper text shown below the input */
  description?: string;
  /** Error message — replaces description and sets aria-invalid */
  error?: string;
  /** Icon or element placed on the left inside the input */
  leftIcon?: ReactNode;
  /** Icon or element placed on the right inside the input */
  rightIcon?: ReactNode;
  /** Additional className for the outer wrapper div */
  wrapperClassName?: string;
}

/**
 * Text input with label, description, error state, and optional icons.
 * Fully accessible: aria-describedby connects label → description/error.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Password" error="Password is too short" type="password" />
 */
function Input({
  className,
  label,
  description,
  error,
  leftIcon,
  rightIcon,
  id: externalId,
  wrapperClassName,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  const hasDescription = Boolean(description);
  const hasError = Boolean(error);
  const describedBy =
    [hasError ? errorId : null, hasDescription && !hasError ? descriptionId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            hasError && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute right-3 flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      {hasError && (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      {hasDescription && !hasError && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

Input.displayName = "Input";

export { Input };
export type { InputProps };
