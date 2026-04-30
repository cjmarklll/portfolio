import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-surface-bright px-3 py-1 text-xs font-medium text-accent-bright border border-border",
        className
      )}
    >
      {children}
    </span>
  );
}
