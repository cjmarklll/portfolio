import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center justify-center py-2", className)}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <div className="w-24 h-px bg-gradient-to-r from-accent/50 via-cyan/30 to-accent/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent/50" />
      </div>
    </div>
  );
}
