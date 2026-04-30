import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function GlowText({
  children,
  className,
  as: Tag = "span",
}: GlowTextProps) {
  return (
    <Tag className={cn("gradient-text", className)}>{children}</Tag>
  );
}
