export type SuggestionIcon =
  | "CheckSquare"
  | "Activity"
  | "ShoppingBag"
  | "Code"
  | "BookOpen"
  | "TrendingUp";

export type SuggestionDevice = "mobile" | "web";

export type Suggestion = {
  id: string;
  name: string;
  label: string;
  description: string;
  prompt: string;
  icon: SuggestionIcon;
  device: SuggestionDevice;
  tags: string[];
};

export const suggestions: Suggestion[] = [
  {
    id: "taskflow",
    name: "TaskFlow",
    label: "Task Management Dashboard",
    description: "Kanban + collaboration + analytics for teams",
    device: "web",
    tags: ["dashboard", "kanban", "collaboration", "analytics"],
    prompt:
      "Design a comprehensive task management dashboard with kanban boards featuring drag-and-drop functionality, progress indicators with animated charts, and team collaboration features. Include modern design principles with consistent 8px spacing grid, typography hierarchy using Inter font family, and a cohesive color scheme with primary blue (#3B82F6) and neutral grays. Implement responsive layouts that adapt from mobile to desktop, with collapsible sidebars and adaptive grid layouts. Add smooth micro-interactions for task completion, hover states on cards, loading animations for data fetching, and contextual tooltips. Include accessibility features like keyboard navigation, screen reader support, and high contrast mode. Add real-time collaboration indicators, comment threads with rich text editing, and progress tracking with milestone celebrations.",
    icon: "CheckSquare",
  },
  {
    id: "fittracker",
    name: "FitTracker",
    label: "Fitness Tracker App",
    description: "Workouts, streaks, and progress visualization",
    device: "mobile",
    tags: ["mobile", "health", "charts", "gamification"],
    prompt:
      "Create a fitness tracking mobile app with workout plans featuring interactive exercise cards, progress charts with animated data visualization, and comprehensive health metrics dashboard. Apply modern design with rounded corners, subtle shadows, and a vibrant color palette featuring fitness-themed colors (orange #F97316 for energy, green #10B981 for progress). Ensure responsive design with touch-optimized controls, gesture-based navigation, and adaptive layouts for various screen sizes. Implement interactive features like swipeable workout cards, animated progress rings, form validation with real-time feedback, and loading states for data synchronization. Include accessibility features with proper touch targets, voice guidance for exercises, and adjustable text sizes. Add micro-interactions for workout completion celebrations, streak counters with confetti animations, and personalized coaching tips with contextual help.",
    icon: "Activity",
  },
  {
    id: "shophub",
    name: "ShopHub",
    label: "E-commerce Mobile Store",
    description: "Catalog, cart, and checkout with delightful UX",
    device: "mobile",
    tags: ["mobile", "ecommerce", "checkout", "search"],
    prompt:
      "Design an e-commerce mobile app with product catalog featuring image carousels, shopping cart with quantity controls, and user profiles with order history. Use modern design principles with clean layouts, consistent spacing using a 4px base grid, and an elegant color scheme with primary purple (#8B5CF6) and warm accents. Implement responsive design with infinite scroll, pull-to-refresh, and adaptive product grids. Add interactive elements like wishlist heart animations, cart quantity badges with bounce effects, product image zoom with gesture controls, and smooth transitions between screens. Include accessibility features with proper heading hierarchy, alt text for images, and keyboard navigation support. Add advanced UX features like search with autocomplete and filters, personalized recommendations with smooth reveal animations, and checkout flow with progress indicators and form validation feedback.",
    icon: "ShoppingBag",
  },
  {
    id: "codecollab",
    name: "CodeCollab",
    label: "Code Collaboration Platform",
    description: "Editor, review, presence, and team chat",
    device: "web",
    tags: ["web", "developer", "editor", "collaboration"],
    prompt:
      "Create a code collaboration platform with real-time editing featuring syntax highlighting, version control integration, and team chat functionality. Implement modern design with dark theme support, monospaced fonts for code, and a professional color scheme with blue accents (#2563EB) and neutral backgrounds. Ensure responsive layouts with collapsible panels, resizable editor areas, and adaptive toolbar positioning. Add interactive features like live cursors showing team members' positions, code completion with smooth animations, diff highlighting with fade transitions, and collaborative commenting system. Include accessibility features with keyboard shortcuts, screen reader support for code navigation, and adjustable font sizes. Implement advanced UX with conflict resolution interfaces, code review workflows with animated feedback, and real-time presence indicators with status updates.",
    icon: "Code",
  },
  {
    id: "learnflow",
    name: "LearnFlow",
    label: "Online Learning Platform",
    description: "Courses, quizzes, progress, and community",
    device: "web",
    tags: ["education", "courses", "quiz", "video"],
    prompt:
      "Design an online learning platform with course catalog featuring video previews, progress tracking with completion badges, and interactive lessons with quizzes. Apply modern educational design principles with clear information hierarchy, readable typography using system fonts, and an encouraging color palette with teal (#06B6D4) and warm yellow accents (#FBBF24). Implement responsive design with adaptive video players, collapsible lesson navigation, and mobile-optimized quiz interfaces. Add interactive elements like progress bars with animated completion, interactive quizzes with instant feedback animations, bookmarking with heart icons, and discussion forums with threaded replies. Include accessibility features with video captions, keyboard navigation for all interactive elements, and adjustable playback speeds. Add gamification elements like achievement badges with celebration animations, streak counters, and personalized learning paths with smooth transitions.",
    icon: "BookOpen",
  },
  {
    id: "financewise",
    name: "FinanceWise",
    label: "Personal Finance App",
    description: "Budgets, insights, and portfolio visuals",
    device: "mobile",
    tags: ["finance", "charts", "budgeting", "insights"],
    prompt:
      "Create a personal finance management app with expense tracking featuring receipt scanning, budget creation with visual charts, and investment portfolio insights. Use modern financial design with clean data visualization, consistent spacing, and a trustworthy color scheme with emerald green (#059669) and slate grays. Implement responsive layouts with swipeable transaction lists, collapsible budget categories, and adaptive chart displays. Add interactive features like expense categorization with drag-and-drop, animated chart transitions when filtering data, budget progress rings with color-coded warnings, and investment trend lines with smooth animations. Include accessibility features with high contrast data labels, keyboard navigation for all controls, and screen reader support for financial data. Add advanced UX with spending insights with contextual tooltips, savings goals with progress celebrations, and financial planning wizards with step-by-step guidance animations.",
    icon: "TrendingUp",
  },
];

export const THEMES = {
  AURORA_INK: {
    background: "#0b1020",
    foreground: "#f4f6ff",

    card: "#121a33",
    cardForeground: "#f4f6ff",

    popover: "#121a33",
    popoverForeground: "#f4f6ff",

    primary: "#7c5cff",
    primaryRgb: "124, 92, 255",
    primaryForeground: "#0b1020",

    secondary: "#1a2547",
    secondaryForeground: "#e8ebff",

    muted: "#141d3a",
    mutedForeground: "#a9b2d6",

    accent: "#2fe6c7",
    accentForeground: "#0b1020",

    destructive: "#ff4d6d",

    border: "#202c56",
    input: "#202c56",
    ring: "#7c5cff",
    radius: "0.9rem",

    chart: ["#7c5cff", "#2fe6c7", "#ffb84d", "#ff4d6d", "#66a6ff"],
  },

  DUSTY_ORCHID: {
    background: "#fbf7fb",
    foreground: "#221827",

    card: "#ffffff",
    cardForeground: "#221827",

    popover: "#ffffff",
    popoverForeground: "#221827",

    primary: "#b24c7c",
    primaryRgb: "178, 76, 124",
    primaryForeground: "#ffffff",

    secondary: "#f1e6f0",
    secondaryForeground: "#221827",

    muted: "#efe2ed",
    mutedForeground: "#6b5871",

    accent: "#3aa6a6",
    accentForeground: "#0f172a",

    destructive: "#e23a53",

    border: "#e4d6e2",
    input: "#ffffff",
    ring: "#b24c7c",
    radius: "0.75rem",

    chart: ["#b24c7c", "#3aa6a6", "#f0a24f", "#6a4fb3", "#2f6fdf"],
  },

  CITRUS_SLATE: {
    background: "#0f141a",
    foreground: "#f5f7fb",

    card: "#151c24",
    cardForeground: "#f5f7fb",

    popover: "#151c24",
    popoverForeground: "#f5f7fb",

    primary: "#ff7a2f",
    primaryRgb: "255, 122, 47",
    primaryForeground: "#0f141a",

    secondary: "#1f2a36",
    secondaryForeground: "#f5f7fb",

    muted: "#18212c",
    mutedForeground: "#aab5c3",

    accent: "#7dd3ff",
    accentForeground: "#0f141a",

    destructive: "#ff3b5c",

    border: "#2a394a",
    input: "#2a394a",
    ring: "#ff7a2f",
    radius: "0.6rem",

    chart: ["#ff7a2f", "#7dd3ff", "#9bff8b", "#c28bff", "#ffd36a"],
  },

  MOSS_PARCHMENT: {
    background: "#f7f5ef",
    foreground: "#1d261f",

    card: "#ffffff",
    cardForeground: "#1d261f",

    popover: "#ffffff",
    popoverForeground: "#1d261f",

    primary: "#2f7d4a",
    primaryRgb: "47, 125, 74",
    primaryForeground: "#ffffff",

    secondary: "#e7efe5",
    secondaryForeground: "#1d261f",

    muted: "#e3eadf",
    mutedForeground: "#5f6f63",

    accent: "#b26d2d",
    accentForeground: "#ffffff",

    destructive: "#d94444",

    border: "#d6e0d4",
    input: "#ffffff",
    ring: "#2f7d4a",
    radius: "1rem",

    chart: ["#2f7d4a", "#b26d2d", "#2b6cb0", "#8a4fff", "#d94444"],
  },

  POLAR_MINT: {
    background: "#f2fbff",
    foreground: "#0d1b2a",

    card: "#ffffff",
    cardForeground: "#0d1b2a",

    popover: "#ffffff",
    popoverForeground: "#0d1b2a",

    primary: "#00a6a6",
    primaryRgb: "0, 166, 166",
    primaryForeground: "#ffffff",

    secondary: "#e3f6f8",
    secondaryForeground: "#0d1b2a",

    muted: "#d7f0f4",
    mutedForeground: "#3e6470",

    accent: "#5b7cfa",
    accentForeground: "#ffffff",

    destructive: "#ff4b4b",

    border: "#cfe6ee",
    input: "#ffffff",
    ring: "#00a6a6",
    radius: "0.85rem",

    chart: ["#00a6a6", "#5b7cfa", "#ffb020", "#ff4b4b", "#7a52cc"],
  },

  OBSIDIAN_BLOOM: {
    background: "#0a0a0d",
    foreground: "#f7f7fb",

    card: "#14141a",
    cardForeground: "#f7f7fb",

    popover: "#14141a",
    popoverForeground: "#f7f7fb",

    primary: "#ff4fd8",
    primaryRgb: "255, 79, 216",
    primaryForeground: "#0a0a0d",

    secondary: "#1c1c25",
    secondaryForeground: "#f7f7fb",

    muted: "#171720",
    mutedForeground: "#a8a8b8",

    accent: "#6dffb2",
    accentForeground: "#0a0a0d",

    destructive: "#ff3d5a",

    border: "#2a2a37",
    input: "#2a2a37",
    ring: "#ff4fd8",
    radius: "0.7rem",

    chart: ["#ff4fd8", "#6dffb2", "#5cc8ff", "#ffb84d", "#b18cff"],
  },
} as const;

export const THEME_NAME_LIST = [
  "AURORA_INK",
  "DUSTY_ORCHID",
  "CITRUS_SLATE",
  "MOSS_PARCHMENT",
  "POLAR_MINT",
  "OBSIDIAN_BLOOM",
] as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];
