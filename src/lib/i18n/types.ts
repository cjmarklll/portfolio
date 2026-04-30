export type Locale = "en" | "zh";

export interface TranslationDict {
  nav: {
    home: string;
    about: string;
    projects: string;
    blog: string;
    contact: string;
  };
  hero: {
    welcome: string;
    name: string;
    titles: string[];
    description: string;
    viewWork: string;
    getInTouch: string;
  };
  about: {
    title: string;
    subtitle: string;
    bio: string[];
    skillsTitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    github: string;
    liveDemo: string;
  };
  blog: {
    title: string;
    subtitle: string;
    allTags: string;
    noPosts: string;
    minRead: string;
  };
  contact: {
    title: string;
    subtitle: string;
    sendEmail: string;
    emailDirect: string;
  };
  footer: {
    rights: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    goHome: string;
  };
}
