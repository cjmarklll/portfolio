# 个性化指南

## 修改个人信息

### 1. 基本信息

编辑 `src/lib/constants.ts`：

```typescript
export const siteConfig: SiteConfig = {
  name: "你的名字",                    // 显示在网站各处
  title: "你的名字 - Developer",       // 浏览器标签标题
  description: "你的个人简介...",       // 网站描述（SEO用）
  url: "https://yourdomain.com",      // 部署后的域名
  social: {
    github: "https://github.com/你的用户名",
    email: "your@email.com",
  },
};

export const skills = [
  "TypeScript",    // 修改为你的技能
  "React",
  "Next.js",
  // 添加更多...
];
```

### 2. 修改英文翻译

编辑 `src/lib/i18n/en.ts`：

```typescript
const en: TranslationDict = {
  hero: {
    welcome: "Welcome to my space",
    name: "Your Name",                    // 英文名
    titles: ["Full Stack Developer", ...], // 职业标签（打字机效果会循环显示）
    description: "Your bio...",            // 个人简介
    viewWork: "View My Work",
    getInTouch: "Get in Touch",
  },
  about: {
    title: "About Me",
    subtitle: "Your subtitle...",
    bio: [                                // 关于我的段落（数组形式）
      "First paragraph...",
      "Second paragraph...",
    ],
    skillsTitle: "Skills & Technologies",
  },
  // ... 其他翻译
};
```

### 3. 修改中文翻译

编辑 `src/lib/i18n/zh.ts`：

```typescript
const zh: TranslationDict = {
  hero: {
    welcome: "欢迎来到我的世界",
    name: "褚杰",                         // 中文名
    titles: ["全栈开发者", ...],
    description: "你的中文简介...",
    viewWork: "查看作品",
    getInTouch: "联系我",
  },
  about: {
    title: "关于我",
    subtitle: "你的中文副标题...",
    bio: [
      "第一段...",
      "第二段...",
    ],
    skillsTitle: "技能 & 技术",
  },
  // ... 其他翻译
};
```

---

## 发布博客文章

### 创建文章

在 `content/posts/` 目录下创建 `.mdx` 文件，例如 `my-new-post.mdx`：

```markdown
---
title: "文章标题"
date: "2025-05-01"
excerpt: "文章摘要，会显示在博客列表中"
tags: ["nextjs", "react", "tutorial"]
draft: false
---

## 正文内容

这里是文章正文，支持完整的 Markdown 语法。

### 代码块

```typescript
function hello() {
  console.log("Hello, World!");
}
```

### 列表

- 项目一
- 项目二
- 项目三

### 引用

> 这是一段引用文字。

### 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式：`YYYY-MM-DD` |
| `excerpt` | 是 | 文章摘要 |
| `tags` | 否 | 标签数组，如 `["react", "typescript"]` |
| `coverImage` | 否 | 封面图路径，如 `/images/posts/cover.jpg` |
| `draft` | 否 | 设为 `true` 则文章不会显示（默认 `false`） |

### 添加封面图

1. 将图片放入 `public/images/posts/` 目录
2. 在 frontmatter 中引用：

```yaml
coverImage: "/images/posts/my-cover.jpg"
```

### 草稿模式

不想发布的文章可以设为草稿：

```yaml
draft: true
```

草稿文章不会出现在博客列表中，也不会被构建。

---

## 发布项目

### 创建项目

在 `content/projects/` 目录下创建 `.mdx` 文件，例如 `my-project.mdx`：

```markdown
---
title: "项目名称"
description: "项目描述，会显示在项目卡片上"
image: "/images/projects/my-project.jpg"
tags: ["react", "typescript", "api"]
liveUrl: "https://demo.example.com"
githubUrl: "https://github.com/username/project"
featured: true
order: 1
---
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 项目名称 |
| `description` | 是 | 项目描述 |
| `tags` | 是 | 技术标签数组 |
| `image` | 否 | 项目截图路径（放入 `public/images/projects/`） |
| `liveUrl` | 否 | 在线演示链接 |
| `githubUrl` | 否 | GitHub 仓库链接 |
| `featured` | 否 | 设为 `true` 则显示在首页（默认 `false`） |
| `order` | 否 | 显示顺序，数字越小越靠前（默认 `99`） |

### 示例：添加一个新项目

1. 创建文件 `content/projects/ecommerce.mdx`：

```markdown
---
title: "电商平台"
description: "基于 Next.js 构建的全栈电商应用"
tags: ["nextjs", "prisma", "stripe"]
liveUrl: "https://shop.example.com"
githubUrl: "https://github.com/user/ecommerce"
featured: true
order: 2
---
```

2. 将项目截图放入 `public/images/projects/ecommerce.jpg`

---

## 添加图片

### 目录结构

```
public/images/
├── avatar.jpg          # 头像
├── posts/              # 博客封面图
│   ├── post-1.jpg
│   └── post-2.jpg
└── projects/           # 项目截图
    ├── project-1.jpg
    └── project-2.jpg
```

### 在文章中使用图片

```markdown
![图片描述](/images/posts/my-image.jpg)
```

---

## 常见问题

### Q: 如何预览修改效果？

运行开发服务器：

```bash
npm run dev
```

访问 http://localhost:3000 即可实时预览。

### Q: 如何部署到线上？

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动部署，每次推送代码都会自动更新

### Q: 如何绑定自定义域名？

1. 在 Vercel 项目设置中添加域名
2. 在域名服务商处添加 DNS 记录（CNAME 或 A 记录）
3. 等待 DNS 生效（通常几分钟到几小时）

### Q: 如何添加新语言？

1. 创建 `src/lib/i18n/ja.ts`（以日语为例）
2. 复制 `en.ts` 的结构，翻译所有内容
3. 在 `src/lib/i18n/index.ts` 中注册：

```typescript
import ja from "./ja";

export const translations: Record<Locale, TranslationDict> = { en, zh, ja };
```

4. 在 `src/lib/i18n/types.ts` 中更新类型：

```typescript
export type Locale = "en" | "zh" | "ja";
```

5. 更新语言切换器组件
