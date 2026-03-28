import type { HTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const bannerVariants = cva(
  "relative flex w-full items-center gap-3 px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        info: "bg-info text-info-foreground",
        warning: "bg-warning text-warning-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        success: "bg-success text-success-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Unique id — if provided, dismiss state is persisted to localStorage */
  storageKey?: string;
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Icon element to show on the left */
  icon?: ReactNode;
}

/**
 * Full-width informational banner — role=banner.
 * Dismiss state is persisted to localStorage when `storageKey` is provided.
 */
function Banner({
  className,
  variant,
  storageKey,
  dismissible = true,
  icon,
  children,
  ...props
}: BannerProps) {
  const dismissed = storageKey
    ? (() => {
        try {
          return localStorage.getItem(`banner-dismissed-${storageKey}`) === "true";
        } catch {
          return false;
        }
      })()
    : false;

  const [visible, setVisible] = useState(!dismissed);

  const handleDismiss = () => {
    setVisible(false);
    if (storageKey) {
      try {
        localStorage.setItem(`banner-dismissed-${storageKey}`, "true");
      } catch {
        // localStorage unavailable (SSR or private browsing) — ignore
      }
    }
  };

  if (!visible) return null;

  return (
    <div
      role="banner"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    >
      {icon && <span aria-hidden="true" className="shrink-0">{icon}</span>}
      <div className="flex-1">{children}</div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

Banner.displayName = "Banner";

export { Banner, bannerVariants };
export type { BannerProps };
