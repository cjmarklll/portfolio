"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { siteConfig } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: any;
}

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

function getEventDescription(event: GitHubEvent, locale: string) {
  switch (event.type) {
    case "PushEvent":
      const commits = event.payload.commits?.length || 1;
      return locale === "zh"
        ? `推送了 ${commits} 个提交到`
        : `pushed ${commits} commit${commits > 1 ? "s" : ""} to`;
    case "CreateEvent":
      return locale === "zh"
        ? `创建了 ${event.payload.ref_type}`
        : `created ${event.payload.ref_type}`;
    case "PullRequestEvent":
      return event.payload.action === "opened"
        ? locale === "zh"
          ? "打开了 PR 到"
          : "opened PR in"
        : locale === "zh"
          ? "合并了 PR 在"
          : "merged PR in";
    case "IssuesEvent":
      return event.payload.action === "opened"
        ? locale === "zh"
          ? "在...开启了 issue"
          : "opened issue in"
        : locale === "zh"
          ? "关闭了 issue 在"
          : "closed issue in";
    case "WatchEvent":
      return locale === "zh" ? "starred" : "starred";
    default:
      return event.type.replace("Event", "").toLowerCase();
  }
}

function timeAgo(dateStr: string, locale: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string, string][] = [
    [31536000, "year", "年"],
    [2592000, "month", "个月"],
    [86400, "day", "天"],
    [3600, "hour", "小时"],
    [60, "minute", "分钟"],
  ];

  for (const [secs, en, zh] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count > 0) {
      return locale === "zh" ? `${count}${zh}前` : `${count} ${en}${count > 1 ? "s" : ""} ago`;
    }
  }
  return locale === "zh" ? "刚刚" : "just now";
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
};

export default function GitHubActivity() {
  const { t, locale } = useI18n();
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  const username = siteConfig.social.github?.split("/").pop() || "";

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${username}/events/public?per_page=6`)
        .then((r) => r.json())
        .catch(() => []),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`
      )
        .then((r) => r.json())
        .catch(() => []),
    ]).then(([eventsData, reposData]) => {
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setRepos(Array.isArray(reposData) ? reposData : []);
      setLoading(false);
    });
  }, [username]);

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            {locale === "zh" ? "开源" : "Open Source"}{" "}
            <span className="gradient-text">
              {locale === "zh" ? "动态" : "Activity"}
            </span>
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-16">
            {locale === "zh"
              ? "我在 GitHub 上的最新活动和热门仓库。"
              : "My latest activity and featured repositories on GitHub."}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent-bright"
                >
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                </svg>
                {locale === "zh" ? "最近活动" : "Recent Activity"}
              </h3>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-lg bg-surface-bright animate-pulse"
                    />
                  ))}
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-3">
                  {events.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-bright transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-text">
                          <span className="text-text-muted">
                            {getEventDescription(event, locale)}{" "}
                          </span>
                          <a
                            href={`https://github.com/${event.repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-bright hover:underline font-medium"
                          >
                            {event.repo.name}
                          </a>
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {timeAgo(event.created_at, locale)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted text-sm text-center py-8">
                  {locale === "zh"
                    ? "暂无公开活动"
                    : "No public activity yet"}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* Featured Repos */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent-bright"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                {locale === "zh" ? "热门仓库" : "Featured Repos"}
              </h3>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 rounded-lg bg-surface-bright animate-pulse"
                    />
                  ))}
                </div>
              ) : repos.length > 0 ? (
                <div className="space-y-3">
                  {repos.map((repo, i) => (
                    <motion.a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="block p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-surface-bright transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white group-hover:text-accent-bright transition-colors">
                          {repo.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {repo.stargazers_count}
                        </div>
                      </div>
                      {repo.description && (
                        <p className="text-xs text-text-muted mb-2 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        {repo.language && (
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  languageColors[repo.language] || "#8b8b9e",
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="text-xs text-text-muted">
                          {timeAgo(repo.updated_at, locale)}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted text-sm text-center py-8">
                  {locale === "zh"
                    ? "暂无仓库"
                    : "No repositories found"}
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
