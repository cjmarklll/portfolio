"use client";

import { useI18n } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/constants";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
        </p>
        <div className="flex items-center gap-6">
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-bright transition-colors text-sm"
            >
              GitHub
            </a>
          )}
          {siteConfig.social.twitter && (
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-bright transition-colors text-sm"
            >
              Twitter
            </a>
          )}
          {siteConfig.social.linkedin && (
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-bright transition-colors text-sm"
            >
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="text-text-muted hover:text-accent-bright transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
