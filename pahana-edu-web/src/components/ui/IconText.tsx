import { memo, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface IconTextProps {
  icon?: LucideIcon;
  children?: ReactNode;
  text?: string;
  className?: string;
  iconSize?: number;
  variant?: "default" | "muted" | "dark";
}

const IconText = memo<IconTextProps>(
  ({
    icon: Icon,
    children,
    text,
    className = "",
    iconSize = 18,
    variant = "default",
  }) => {
    // Use children if provided, otherwise fall back to text prop
    const content = children ?? text;

    // Early return if no content
    if (!content) {
      return null;
    }

    const variants = {
      default: "text-gray-700",
      muted: "text-gray-500",
      dark: "text-gray-900",
    } as const;

    const baseClasses = "flex items-center gap-2";
    const variantClasses = variants[variant];
    const combinedClasses =
      `${baseClasses} ${variantClasses} ${className}`.trim();

    return (
      <div className={combinedClasses}>
        {Icon && (
          <Icon
            size={iconSize}
            className="text-gray-500 flex-shrink-0"
            aria-hidden="true"
          />
        )}
        <span className="text-sm font-medium text-gray-400">{content}</span>
      </div>
    );
  }
);

IconText.displayName = "IconText";

export default IconText;
