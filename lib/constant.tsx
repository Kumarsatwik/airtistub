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
