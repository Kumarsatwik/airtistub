export type SuggestionIcon =
  | "CheckSquare"
  | "Activity"
  | "ShoppingBag"
  | "Code"
  | "BookOpen"
  | "TrendingUp";

export type SuggestionDevice = "mobile" | "website";

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
    device: "website",
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
    device: "website",
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
    device: "website",
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
  // --- Modern UI Themes ---
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
    // Gradients
    gradientLinear: "linear-gradient(135deg, #0b1020 0%, #1a2547 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #1a2547 0%, #0b1020 100%)",
    category: "modern",
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
    gradientLinear: "linear-gradient(135deg, #fbf7fb 0%, #f1e6f0 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #fbf7fb 100%)",
    category: "modern",
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
    gradientLinear: "linear-gradient(135deg, #0f141a 0%, #1f2a36 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #1f2a36 0%, #0f141a 100%)",
    category: "modern",
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
    gradientLinear: "linear-gradient(135deg, #f7f5ef 0%, #e7efe5 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #f7f5ef 100%)",
    category: "modern",
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
    gradientLinear: "linear-gradient(135deg, #f2fbff 0%, #e3f6f8 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #f2fbff 100%)",
    category: "modern",
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
    gradientLinear: "linear-gradient(135deg, #0a0a0d 0%, #1c1c25 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #1c1c25 0%, #0a0a0d 100%)",
    category: "modern",
  },

  // --- Material Design ---
  MATERIAL_OCEAN: {
    background: "#e3f2fd",
    foreground: "#0d47a1",
    card: "#ffffff",
    cardForeground: "#0d47a1",
    popover: "#ffffff",
    popoverForeground: "#0d47a1",
    primary: "#2196f3",
    primaryRgb: "33, 150, 243",
    primaryForeground: "#ffffff",
    secondary: "#bbdefb",
    secondaryForeground: "#0d47a1",
    muted: "#e1f5fe",
    mutedForeground: "#0277bd",
    accent: "#ff4081",
    accentForeground: "#ffffff",
    destructive: "#f44336",
    border: "#90caf9",
    input: "#ffffff",
    ring: "#2196f3",
    radius: "0.25rem",
    chart: ["#2196f3", "#ff4081", "#ffeb3b", "#4caf50", "#ff9800"],
    gradientLinear: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #e3f2fd 100%)",
    category: "material",
  },

  // --- Professional/Business ---
  CORP_SLATE: {
    background: "#f8fafc",
    foreground: "#0f172a",
    card: "#ffffff",
    cardForeground: "#0f172a",
    popover: "#ffffff",
    popoverForeground: "#0f172a",
    primary: "#0f172a",
    primaryRgb: "15, 23, 42",
    primaryForeground: "#f8fafc",
    secondary: "#e2e8f0",
    secondaryForeground: "#0f172a",
    muted: "#f1f5f9",
    mutedForeground: "#64748b",
    accent: "#3b82f6",
    accentForeground: "#ffffff",
    destructive: "#ef4444",
    border: "#cbd5e1",
    input: "#ffffff",
    ring: "#0f172a",
    radius: "0.5rem",
    chart: ["#0f172a", "#3b82f6", "#64748b", "#cbd5e1", "#ef4444"],
    gradientLinear: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%)",
    category: "professional",
  },

  // --- Vibrant Creative ---
  NEON_NIGHTS: {
    background: "#09090b",
    foreground: "#fafafa",
    card: "#18181b",
    cardForeground: "#fafafa",
    popover: "#18181b",
    popoverForeground: "#fafafa",
    primary: "#d946ef",
    primaryRgb: "217, 70, 239",
    primaryForeground: "#ffffff",
    secondary: "#27272a",
    secondaryForeground: "#fafafa",
    muted: "#27272a",
    mutedForeground: "#a1a1aa",
    accent: "#8b5cf6",
    accentForeground: "#ffffff",
    destructive: "#ef4444",
    border: "#27272a",
    input: "#27272a",
    ring: "#d946ef",
    radius: "0.75rem",
    chart: ["#d946ef", "#8b5cf6", "#f43f5e", "#ec4899", "#a855f7"],
    gradientLinear: "linear-gradient(135deg, #09090b 0%, #27272a 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #27272a 0%, #09090b 100%)",
    category: "creative",
  },

  // --- Additional Popular Themes ---
  SUNSET_ORANGE: {
    background: "#fff8f3",
    foreground: "#2d1810",
    card: "#ffffff",
    cardForeground: "#2d1810",
    popover: "#ffffff",
    popoverForeground: "#2d1810",
    primary: "#ea580c",
    primaryRgb: "234, 88, 12",
    primaryForeground: "#ffffff",
    secondary: "#fed7aa",
    secondaryForeground: "#2d1810",
    muted: "#fef3c7",
    mutedForeground: "#92400e",
    accent: "#f97316",
    accentForeground: "#ffffff",
    destructive: "#dc2626",
    border: "#fed7aa",
    input: "#ffffff",
    ring: "#ea580c",
    radius: "0.75rem",
    chart: ["#ea580c", "#f97316", "#fb923c", "#fdba74", "#fed7aa"],
    gradientLinear: "linear-gradient(135deg, #fff8f3 0%, #fed7aa 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #fff8f3 100%)",
    category: "modern",
  },

  FOREST_GREEN: {
    background: "#f0fdf4",
    foreground: "#14532d",
    card: "#ffffff",
    cardForeground: "#14532d",
    popover: "#ffffff",
    popoverForeground: "#14532d",
    primary: "#16a34a",
    primaryRgb: "22, 163, 74",
    primaryForeground: "#ffffff",
    secondary: "#bbf7d0",
    secondaryForeground: "#14532d",
    muted: "#dcfce7",
    mutedForeground: "#166534",
    accent: "#22c55e",
    accentForeground: "#ffffff",
    destructive: "#dc2626",
    border: "#bbf7d0",
    input: "#ffffff",
    ring: "#16a34a",
    radius: "0.75rem",
    chart: ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"],
    gradientLinear: "linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #f0fdf4 100%)",
    category: "modern",
  },

  MIDNIGHT_BLUE: {
    background: "#0f172a",
    foreground: "#f8fafc",
    card: "#1e293b",
    cardForeground: "#f8fafc",
    popover: "#1e293b",
    popoverForeground: "#f8fafc",
    primary: "#3b82f6",
    primaryRgb: "59, 130, 246",
    primaryForeground: "#ffffff",
    secondary: "#334155",
    secondaryForeground: "#f8fafc",
    muted: "#475569",
    mutedForeground: "#cbd5e1",
    accent: "#60a5fa",
    accentForeground: "#0f172a",
    destructive: "#ef4444",
    border: "#334155",
    input: "#334155",
    ring: "#3b82f6",
    radius: "0.75rem",
    chart: ["#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe", "#f1f5f9"],
    gradientLinear: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
    category: "modern",
  },

  LAVENDER_DREAM: {
    background: "#faf5ff",
    foreground: "#581c87",
    card: "#ffffff",
    cardForeground: "#581c87",
    popover: "#ffffff",
    popoverForeground: "#581c87",
    primary: "#9333ea",
    primaryRgb: "147, 51, 234",
    primaryForeground: "#ffffff",
    secondary: "#e9d5ff",
    secondaryForeground: "#581c87",
    muted: "#f3e8ff",
    mutedForeground: "#7c3aed",
    accent: "#a855f7",
    accentForeground: "#ffffff",
    destructive: "#dc2626",
    border: "#e9d5ff",
    input: "#ffffff",
    ring: "#9333ea",
    radius: "0.75rem",
    chart: ["#9333ea", "#a855f7", "#c084fc", "#ddd6fe", "#e9d5ff"],
    gradientLinear: "linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #faf5ff 100%)",
    category: "modern",
  },

  GALAXY_PURPLE: {
    background: "#1a103d",
    foreground: "#f5f3ff",
    card: "#2d1b69",
    cardForeground: "#f5f3ff",
    popover: "#2d1b69",
    popoverForeground: "#f5f3ff",
    primary: "#8b5cf6",
    primaryRgb: "139, 92, 246",
    primaryForeground: "#ffffff",
    secondary: "#4c1d95",
    secondaryForeground: "#f5f3ff",
    muted: "#5b21b6",
    mutedForeground: "#c4b5fd",
    accent: "#a78bfa",
    accentForeground: "#1a103d",
    destructive: "#ef4444",
    border: "#4c1d95",
    input: "#4c1d95",
    ring: "#8b5cf6",
    radius: "0.75rem",
    chart: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"],
    gradientLinear: "linear-gradient(135deg, #1a103d 0%, #4c1d95 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #4c1d95 0%, #1a103d 100%)",
    category: "creative",
  },

  DESERT_SAND: {
    background: "#fefce8",
    foreground: "#713f12",
    card: "#ffffff",
    cardForeground: "#713f12",
    popover: "#ffffff",
    popoverForeground: "#713f12",
    primary: "#d97706",
    primaryRgb: "217, 119, 6",
    primaryForeground: "#ffffff",
    secondary: "#fde68a",
    secondaryForeground: "#713f12",
    muted: "#fef3c7",
    mutedForeground: "#a16207",
    accent: "#f59e0b",
    accentForeground: "#ffffff",
    destructive: "#dc2626",
    border: "#fde68a",
    input: "#ffffff",
    ring: "#d97706",
    radius: "0.75rem",
    chart: ["#d97706", "#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"],
    gradientLinear: "linear-gradient(135deg, #fefce8 0%, #fde68a 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #fefce8 100%)",
    category: "modern",
  },

  OCEAN_WAVE: {
    background: "#f0f9ff",
    foreground: "#0c4a6e",
    card: "#ffffff",
    cardForeground: "#0c4a6e",
    popover: "#ffffff",
    popoverForeground: "#0c4a6e",
    primary: "#0284c7",
    primaryRgb: "2, 132, 199",
    primaryForeground: "#ffffff",
    secondary: "#bae6fd",
    secondaryForeground: "#0c4a6e",
    muted: "#e0f2fe",
    mutedForeground: "#0369a1",
    accent: "#0ea5e9",
    accentForeground: "#ffffff",
    destructive: "#dc2626",
    border: "#bae6fd",
    input: "#ffffff",
    ring: "#0284c7",
    radius: "0.75rem",
    chart: ["#0284c7", "#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"],
    gradientLinear: "linear-gradient(135deg, #f0f9ff 0%, #bae6fd 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #f0f9ff 100%)",
    category: "modern",
  },

  FIRE_RED: {
    background: "#fef2f2",
    foreground: "#7f1d1d",
    card: "#ffffff",
    cardForeground: "#7f1d1d",
    popover: "#ffffff",
    popoverForeground: "#7f1d1d",
    primary: "#dc2626",
    primaryRgb: "220, 38, 38",
    primaryForeground: "#ffffff",
    secondary: "#fecaca",
    secondaryForeground: "#7f1d1d",
    muted: "#fee2e2",
    mutedForeground: "#991b1b",
    accent: "#ef4444",
    accentForeground: "#ffffff",
    destructive: "#b91c1c",
    border: "#fecaca",
    input: "#ffffff",
    ring: "#dc2626",
    radius: "0.75rem",
    chart: ["#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fecaca"],
    gradientLinear: "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #ffffff 0%, #fef2f2 100%)",
    category: "modern",
  },

  RETRO_80S: {
    background: "#0f0f23",
    foreground: "#fffffe",
    card: "#1a1a2e",
    cardForeground: "#fffffe",
    popover: "#1a1a2e",
    popoverForeground: "#fffffe",
    primary: "#ff6b6b",
    primaryRgb: "255, 107, 107",
    primaryForeground: "#ffffff",
    secondary: "#4ecdc4",
    secondaryForeground: "#0f0f23",
    muted: "#2c2c54",
    mutedForeground: "#a8a8b8",
    accent: "#ffe66d",
    accentForeground: "#0f0f23",
    destructive: "#ff3838",
    border: "#2c2c54",
    input: "#2c2c54",
    ring: "#ff6b6b",
    radius: "0.5rem",
    chart: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#a8e6cf", "#ffd3a5"],
    gradientLinear: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
    gradientRadial:
      "radial-gradient(circle at center, #1a1a2e 0%, #0f0f23 100%)",
    category: "creative",
  },
} as const;

export const THEME_NAME_LIST = [
  "AURORA_INK",
  "DUSTY_ORCHID",
  "CITRUS_SLATE",
  "MOSS_PARCHMENT",
  "POLAR_MINT",
  "OBSIDIAN_BLOOM",
  "MATERIAL_OCEAN",
  "CORP_SLATE",
  "NEON_NIGHTS",
  "SUNSET_ORANGE",
  "FOREST_GREEN",
  "MIDNIGHT_BLUE",
  "LAVENDER_DREAM",
  "GALAXY_PURPLE",
  "DESERT_SAND",
  "OCEAN_WAVE",
  "FIRE_RED",
  "RETRO_80S",
] as const;

export type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];

export function themeToCssVars(theme: Theme | string | undefined): string {
  if (!theme) {
    return '';
  }

  const resolvedTheme: Theme | undefined = typeof theme === 'string' ? THEMES[theme as ThemeKey] : theme;

  return `
  :root {
    --background: ${resolvedTheme?.background ?? ''};
    --foreground: ${resolvedTheme?.foreground ?? ''};

    --card: ${resolvedTheme?.card ?? ''};
    --card-foreground: ${resolvedTheme?.cardForeground ?? ''};

    --popover: ${resolvedTheme?.popover ?? ''};
    --popover-foreground: ${resolvedTheme?.popoverForeground ?? ''};

    --primary: ${resolvedTheme?.primary ?? ''};
    --primary-rgb: ${resolvedTheme?.primaryRgb ?? ''};
    --primary-foreground: ${resolvedTheme?.primaryForeground ?? ''};

    --secondary: ${resolvedTheme?.secondary ?? ''};
    --secondary-foreground: ${resolvedTheme?.secondaryForeground ?? ''};

    --muted: ${resolvedTheme?.muted ?? ''};
    --muted-foreground: ${resolvedTheme?.mutedForeground ?? ''};

    --accent: ${resolvedTheme?.accent ?? ''};
    --accent-foreground: ${resolvedTheme?.accentForeground ?? ''};

    --destructive: ${resolvedTheme?.destructive ?? ''};

    --border: ${resolvedTheme?.border ?? ''};
    --input: ${resolvedTheme?.input ?? ''};
    --ring: ${resolvedTheme?.ring ?? ''};

    --radius: ${resolvedTheme?.radius ?? ''};

    /* charts */
    --chart-1: ${resolvedTheme?.chart?.[0] ?? ''};
    --chart-2: ${resolvedTheme?.chart?.[1] ?? ''};
    --chart-3: ${resolvedTheme?.chart?.[2] ?? ''};
    --chart-4: ${resolvedTheme?.chart?.[3] ?? ''};
    --chart-5: ${resolvedTheme?.chart?.[4] ?? ''};
  }
  `;
}

// Utility Functions

/**
 * Parses a hex color string to RGB values.
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) formats.
 * Returns null if the format is invalid.
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const cleanHex = hex.replace("#", "");
  let r: number, g: number, b: number;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else {
    return null;
  }

  // Validate that all components are numbers
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }

  return { r, g, b };
};

/**
 * Calculates the relative luminance of a color according to WCAG guidelines.
 * Formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * Where R, G, B are adjusted for gamma correction.
 */
const getRelativeLuminance = (r: number, g: number, b: number): number => {
  // Normalize to 0-1 range
  const normalize = (channel: number) => {
    channel = channel / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  };

  const rNorm = normalize(r);
  const gNorm = normalize(g);
  const bNorm = normalize(b);

  return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
};

/**
 * Calculates the contrast ratio between two colors according to WCAG guidelines.
 * Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color.
 */
const getContrastRatio = (color1: string, color2: string): number | null => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return null;
  }

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Validates the contrast ratio between two colors according to WCAG guidelines.
 * Returns true if the contrast ratio meets or exceeds the specified threshold.
 * Default threshold is 3.0 (suitable for large text, 18pt+ or 14pt+ bold).
 * For normal text, use threshold 4.5. For enhanced contrast, use 7.0.
 *
 * @param background - Background color as hex string (#RGB or #RRGGBB)
 * @param foreground - Foreground color as hex string (#RGB or #RRGGBB)
 * @param threshold - Minimum contrast ratio required (default: 3.0)
 * @returns true if contrast is sufficient, false if insufficient or invalid colors
 */
export const hasSufficientContrast = (
  background: string,
  foreground: string,
  threshold: number = 3.0
): boolean => {
  const ratio = getContrastRatio(background, foreground);
  return ratio !== null && ratio >= threshold;
};

/**
 * Returns the theme object for a given theme key.
 */
export const getTheme = (key: ThemeKey): Theme => {
  return THEMES[key];
};

/**
 * Returns all themes in a specific category.
 */
export const getThemesByCategory = (category: string): Theme[] => {
  return Object.values(THEMES).filter((theme) => theme.category === category);
};

/**
 * Generates a CSS variable string for the theme.
 * Useful for injecting theme variables into the document.
 */
export const getThemeCssVariables = (theme: Theme): React.CSSProperties => {
  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--card": theme.card,
    "--card-foreground": theme.cardForeground,
    "--popover": theme.popover,
    "--popover-foreground": theme.popoverForeground,
    "--primary": theme.primary,
    "--primary-foreground": theme.primaryForeground,
    "--secondary": theme.secondary,
    "--secondary-foreground": theme.secondaryForeground,
    "--muted": theme.muted,
    "--muted-foreground": theme.mutedForeground,
    "--accent": theme.accent,
    "--accent-foreground": theme.accentForeground,
    "--destructive": theme.destructive,
    "--border": theme.border,
    "--input": theme.input,
    "--ring": theme.ring,
    "--radius": theme.radius,
  } as React.CSSProperties;
};
