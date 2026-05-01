"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">{t.notFound.title}</h1>
        <p className="text-text-muted mb-8">{t.notFound.subtitle}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-heading hover:bg-accent-bright transition-colors"
        >
          {t.notFound.goHome}
        </Link>
      </div>
    </div>
  );
}
