"use client";

import { useState, useRef } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  "data-language"?: string;
  className?: string;
}

export default function CodeBlock({
  children,
  "data-language": language,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const code = codeRef.current?.textContent;
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-border">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {/* Filename / language */}
          {language && (
            <span className="ml-3 text-xs text-text-muted font-mono">
              {language}
            </span>
          )}
        </div>
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-text-muted hover:text-white hover:bg-surface-bright transition-all opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <div ref={codeRef} className="[&>pre]:!m-0 [&>pre]:!border-0 [&>pre]:!rounded-none">
        {children}
      </div>
    </div>
  );
}
