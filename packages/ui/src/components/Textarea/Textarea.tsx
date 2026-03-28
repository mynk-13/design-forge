import type { ComponentPropsWithoutRef, Ref } from "react";
import { useId } from "react";
import { cn } from "../../lib/utils";
import { Label } from "../Label/Label";

interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  ref?: Ref<HTMLTextAreaElement>;
  label?: string;
  description?: string;
  error?: string;
  /** Show character count below the textarea */
  showCount?: boolean;
  wrapperClassName?: string;
}

/**
 * Multi-line text input with label, description, error, and optional character count.
 */
function Textarea({
  className,
  label,
  description,
  error,
  showCount = false,
  maxLength,
  value,
  defaultValue,
  id: externalId,
  wrapperClassName,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);
  const hasDescription = Boolean(description);

  const describedBy =
    [hasError ? errorId : null, hasDescription && !hasError ? descriptionId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const currentLength =
    typeof value === "string"
      ? value.length
      : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <textarea
        id={id}
        ref={ref}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          hasError && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
      <div className="flex items-start justify-between gap-2">
        <div>
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
        {showCount && maxLength && (
          <p
            className="text-xs text-muted-foreground tabular-nums"
            aria-live="polite"
            aria-label={`${currentLength} of ${maxLength} characters used`}
          >
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
