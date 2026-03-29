/**
 * @designforge/icons
 *
 * Thin wrapper around `lucide-react` that applies DesignForge icon defaults:
 *   - size:        16   (vs lucide default 24)
 *   - strokeWidth: 1.5  (vs lucide default 2)
 *   - color:       "currentColor" (inherits CSS text colour — unchanged)
 *
 * Every icon is a named React component accepting {@link IconProps}.
 * All defaults can be overridden per-instance:
 *
 * @example
 * import { Check, AlertCircle } from "@designforge/icons";
 *
 * // Uses DesignForge defaults (size=16, strokeWidth=1.5)
 * <Check />
 *
 * // Override any default
 * <AlertCircle size={20} strokeWidth={2} color="red" />
 *
 * @module
 */

import {
  // General UI
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Circle,
  Minus,
  Plus,
  // Navigation
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  // Actions
  Copy,
  ClipboardCheck,
  Download,
  Upload,
  Trash2,
  Pencil,
  Save,
  RefreshCw,
  Share2,
  Search,
  Filter,
  // Status / Feedback
  Info,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  // Layout
  Menu,
  SidebarOpen,
  SidebarClose,
  LayoutGrid,
  List,
  // Media / Content
  Eye,
  EyeOff,
  Code2,
  FileCode2,
  Palette,
  Wand2,
  Sparkles,
  // Theme
  Sun,
  Moon,
  Monitor,
  // Communication
  Bell,
  Mail,
  // Misc
  Star,
  Heart,
  Settings,
  User,
  Users,
  Lock,
  Unlock,
  Key,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { createElement } from "react";
import type { IconProps } from "./types";

export type { IconProps };
export type { LucideIcon, LucideProps };

/** DesignForge icon defaults applied to every wrapped icon. */
const DF_DEFAULTS = {
  size: 16,
  strokeWidth: 1.5,
  color: "currentColor",
} as const;

/**
 * Higher-order function that wraps a Lucide icon component and applies
 * DesignForge defaults. Consumer props always win over defaults.
 */
function withDefaults(Icon: LucideIcon, displayName: string) {
  function DesignForgeIcon({ size, strokeWidth, color, ...rest }: IconProps) {
    return createElement(Icon, {
      size: size ?? DF_DEFAULTS.size,
      strokeWidth: strokeWidth ?? DF_DEFAULTS.strokeWidth,
      color: color ?? DF_DEFAULTS.color,
      ...rest,
    });
  }
  DesignForgeIcon.displayName = displayName;
  return DesignForgeIcon;
}

// ─── General UI ──────────────────────────────────────────────────────────────
export const CheckIcon = withDefaults(Check, "CheckIcon");
export const XIcon = withDefaults(X, "XIcon");
export const ChevronDownIcon = withDefaults(ChevronDown, "ChevronDownIcon");
export const ChevronUpIcon = withDefaults(ChevronUp, "ChevronUpIcon");
export const ChevronLeftIcon = withDefaults(ChevronLeft, "ChevronLeftIcon");
export const ChevronRightIcon = withDefaults(ChevronRight, "ChevronRightIcon");
export const ChevronsUpDownIcon = withDefaults(ChevronsUpDown, "ChevronsUpDownIcon");
export const CircleIcon = withDefaults(Circle, "CircleIcon");
export const MinusIcon = withDefaults(Minus, "MinusIcon");
export const PlusIcon = withDefaults(Plus, "PlusIcon");

// ─── Navigation ──────────────────────────────────────────────────────────────
export const ArrowLeftIcon = withDefaults(ArrowLeft, "ArrowLeftIcon");
export const ArrowRightIcon = withDefaults(ArrowRight, "ArrowRightIcon");
export const ArrowUpIcon = withDefaults(ArrowUp, "ArrowUpIcon");
export const ArrowDownIcon = withDefaults(ArrowDown, "ArrowDownIcon");
export const ExternalLinkIcon = withDefaults(ExternalLink, "ExternalLinkIcon");

// ─── Actions ─────────────────────────────────────────────────────────────────
export const CopyIcon = withDefaults(Copy, "CopyIcon");
export const ClipboardCheckIcon = withDefaults(ClipboardCheck, "ClipboardCheckIcon");
export const DownloadIcon = withDefaults(Download, "DownloadIcon");
export const UploadIcon = withDefaults(Upload, "UploadIcon");
export const Trash2Icon = withDefaults(Trash2, "Trash2Icon");
export const PencilIcon = withDefaults(Pencil, "PencilIcon");
export const SaveIcon = withDefaults(Save, "SaveIcon");
export const RefreshCwIcon = withDefaults(RefreshCw, "RefreshCwIcon");
export const Share2Icon = withDefaults(Share2, "Share2Icon");
export const SearchIcon = withDefaults(Search, "SearchIcon");
export const FilterIcon = withDefaults(Filter, "FilterIcon");

// ─── Status / Feedback ───────────────────────────────────────────────────────
export const InfoIcon = withDefaults(Info, "InfoIcon");
export const AlertCircleIcon = withDefaults(AlertCircle, "AlertCircleIcon");
export const AlertTriangleIcon = withDefaults(AlertTriangle, "AlertTriangleIcon");
export const CheckCircle2Icon = withDefaults(CheckCircle2, "CheckCircle2Icon");
export const XCircleIcon = withDefaults(XCircle, "XCircleIcon");
export const Loader2Icon = withDefaults(Loader2, "Loader2Icon");

// ─── Layout ──────────────────────────────────────────────────────────────────
export const MenuIcon = withDefaults(Menu, "MenuIcon");
export const SidebarOpenIcon = withDefaults(SidebarOpen, "SidebarOpenIcon");
export const SidebarCloseIcon = withDefaults(SidebarClose, "SidebarCloseIcon");
export const LayoutGridIcon = withDefaults(LayoutGrid, "LayoutGridIcon");
export const ListIcon = withDefaults(List, "ListIcon");

// ─── Media / Content ─────────────────────────────────────────────────────────
export const EyeIcon = withDefaults(Eye, "EyeIcon");
export const EyeOffIcon = withDefaults(EyeOff, "EyeOffIcon");
export const Code2Icon = withDefaults(Code2, "Code2Icon");
export const FileCode2Icon = withDefaults(FileCode2, "FileCode2Icon");
export const PaletteIcon = withDefaults(Palette, "PaletteIcon");
export const Wand2Icon = withDefaults(Wand2, "Wand2Icon");
export const SparklesIcon = withDefaults(Sparkles, "SparklesIcon");

// ─── Theme ───────────────────────────────────────────────────────────────────
export const SunIcon = withDefaults(Sun, "SunIcon");
export const MoonIcon = withDefaults(Moon, "MoonIcon");
export const MonitorIcon = withDefaults(Monitor, "MonitorIcon");

// ─── Communication ───────────────────────────────────────────────────────────
export const BellIcon = withDefaults(Bell, "BellIcon");
export const MailIcon = withDefaults(Mail, "MailIcon");

// ─── Misc ────────────────────────────────────────────────────────────────────
export const StarIcon = withDefaults(Star, "StarIcon");
export const HeartIcon = withDefaults(Heart, "HeartIcon");
export const SettingsIcon = withDefaults(Settings, "SettingsIcon");
export const UserIcon = withDefaults(User, "UserIcon");
export const UsersIcon = withDefaults(Users, "UsersIcon");
export const LockIcon = withDefaults(Lock, "LockIcon");
export const UnlockIcon = withDefaults(Unlock, "UnlockIcon");
export const KeyIcon = withDefaults(Key, "KeyIcon");
