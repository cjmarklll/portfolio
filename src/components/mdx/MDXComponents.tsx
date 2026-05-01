import Link from "next/link";
import CodeBlock from "@/components/effects/CodeBlock";

export const MDXComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/") || href?.startsWith("#")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    // Extract language from code className (rehype-pretty-code adds data-language)
    const codeChild = children as React.ReactElement<{
      className?: string;
      "data-language"?: string;
      children?: React.ReactNode;
    }>;
    const language =
      codeChild?.props?.["data-language"] ||
      codeChild?.props?.className?.replace("language-", "") ||
      "";

    return (
      <CodeBlock data-language={language}>
        <pre {...props}>{children}</pre>
      </CodeBlock>
    );
  },
};
