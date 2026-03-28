import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-success/50 bg-success/10 text-foreground [&>svg]:text-success",
        warning:
          "border-warning/50 bg-warning/10 text-foreground [&>svg]:text-warning",
        info:
          "border-info/50 bg-info/10 text-foreground [&>svg]:text-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const AlertIcons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: TriangleAlert,
  info: Info,
} as const;

interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Show the variant-appropriate icon automatically */
  showIcon?: boolean;
}

/**
 * Inline notification — 5 variants with semantic roles.
 * Destructive/warning → role=alert (assertive). Default/success/info → role=status (polite).
 */
function Alert({ className, variant = "default", showIcon = true, children, ...props }: AlertProps) {
  const Icon = AlertIcons[variant ?? "default"];
  const role =
    variant === "destructive" || variant === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {showIcon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </div>
  );
}

function AlertTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props}>
      {children}
    </h5>
  );
}

function AlertDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

Alert.displayName = "Alert";
AlertTitle.displayName = "AlertTitle";
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
export type { AlertProps };
