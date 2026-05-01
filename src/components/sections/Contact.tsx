"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import MagneticButton from "@/components/effects/MagneticButton";
import { useI18n } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/constants";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            {t.contact.title.split(" ").map((word, i) =>
              i === 1 ? (
                <span key={i} className="gradient-text"> {word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-text-muted mb-10">
            {t.contact.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <MagneticButton
              href={`mailto:${siteConfig.social.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-heading hover:bg-accent-bright hover:shadow-[0_0_20px_var(--color-glow)] transition-all duration-200"
            >
              {t.contact.sendEmail}
            </MagneticButton>
            {siteConfig.social.github && (
              <MagneticButton
                href={siteConfig.social.github}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium text-text hover:border-accent/50 hover:text-accent-bright transition-all duration-200"
              >
                GitHub
              </MagneticButton>
            )}
            {siteConfig.social.linkedin && (
              <MagneticButton
                href={siteConfig.social.linkedin}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium text-text hover:border-accent/50 hover:text-accent-bright transition-all duration-200"
              >
                LinkedIn
              </MagneticButton>
            )}
            {siteConfig.social.twitter && (
              <MagneticButton
                href={siteConfig.social.twitter}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium text-text hover:border-accent/50 hover:text-accent-bright transition-all duration-200"
              >
                Twitter
              </MagneticButton>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-text-muted text-sm">
            {t.contact.emailDirect}{" "}
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="text-accent-bright hover:underline"
            >
              {siteConfig.social.email}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
