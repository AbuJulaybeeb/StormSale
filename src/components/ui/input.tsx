import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "success" | "error" | "warning";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default:
        "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 dark:border-gray-600",
      success:
        "border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500 dark:border-emerald-400",
      error:
        "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-400",
      warning:
        "border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 dark:border-yellow-400",
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm",
          variantStyles[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
