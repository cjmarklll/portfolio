import { TranslationDict } from "./types";

const en: TranslationDict = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
  },
  hero: {
    welcome: "Welcome to my space",
    name: "Chu Jie",
    titles: [
      "Full Stack Developer",
      "Open Source Enthusiast",
      "Creative Problem Solver",
    ],
    description:
      "Personal portfolio and blog. I build things for the web and share what I learn.",
    viewWork: "View My Work",
    getInTouch: "Get in Touch",
  },
  about: {
    title: "About Me",
    subtitle: "A passionate developer who loves building things for the web.",
    bio: [
      "I'm a full-stack developer with a passion for creating elegant, performant web applications. With experience spanning from frontend frameworks to backend infrastructure, I enjoy tackling complex problems and turning ideas into reality.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through blog posts and community talks.",
      "I believe in writing clean, maintainable code and building products that make a real difference.",
    ],
    skillsTitle: "Skills & Technologies",
  },
  projects: {
    title: "Featured Projects",
    subtitle: "Some of the things I've built.",
    github: "GitHub",
    liveDemo: "Live Demo",
  },
  blog: {
    title: "Blog",
    subtitle: "Thoughts, tutorials, and insights on web development.",
    allTags: "All",
    noPosts: "No posts found for this tag.",
    minRead: "min read",
  },
  contact: {
    title: "Get in Touch",
    subtitle:
      "Have a project in mind or just want to chat? Feel free to reach out.",
    sendEmail: "Send an Email",
    emailDirect: "Or email me directly at",
  },
  footer: {
    rights: "All rights reserved.",
  },
  notFound: {
    title: "404",
    subtitle: "Page not found",
    goHome: "Go Home",
  },
};

export default en;
