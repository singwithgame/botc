import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "ss-pattern-control inline-flex items-center justify-center whitespace-nowrap font-bold transition-colors duration-150 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand/20",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-button hover:opacity-90 active:scale-[0.98]",
        neutral: "bg-card text-card-foreground border border-border hover:bg-accent active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-80 active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.98]",
        outline: "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        brandGhost: "bg-transparent text-primary hover:bg-primary/10 active:scale-[0.98]",
      },
      size: {
        xs: "h-8 px-3.5 gap-1 text-[13px] [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-9 px-3.5 gap-1 text-[14px] [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 px-4 gap-1.5 text-[14px] [&_svg:not([class*='size-'])]:size-4",
        lg: "h-[52px] px-5 gap-2 text-[18px] [&_svg:not([class*='size-'])]:size-[22px]",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={props.disabled || isLoading}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
