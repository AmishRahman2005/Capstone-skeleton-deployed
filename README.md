# Enterprise AI SaaS Starter Template

A production-ready, highly polished, and fully responsive project skeleton built using **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui** styling principles. This project serves as a premium starting layout for enterprise AI SaaS platforms, including a robust theme toggle engine, accessibility integration, and code quality workflows.

---

## Features

- **Next.js 15 App Router**: Modern rendering structure with root layout, global loading indicators, error boundaries, and custom 404 views.
- **Dynamic Routing & Shell**: Responsive global sidebar drawer, top navigation bar, footer wrapper, and dynamic breadcrumbs.
- **Lucide Icons & Theme Engine**: Class-based theme selector (persisted to `localStorage` and system preference) matching shadcn/ui custom theme palettes.
- **TanStack React Query & Axios**: Standardized API service client featuring pre-configured GET, POST, PUT, and DELETE methods.
- **Framer Motion Animations**: Subtle fade-in, popups, and hover/tap micro-interactions.
- **Responsive Layout**: Validated across mobile (375px), tablet (768px), and desktop (1024px to 1440px+).
- **Accessibility & SEO**: Keyboard-navigable dialogs, HTML5 semantic layout structures, screen reader labels, and Next.js metadata.
- **JSON Payload Pretty-Printer**: Specialized `/health` screen displaying JSON responses inside code blocks under skeleton loading states.
- **Strict Quality Control**: Configured TypeScript type checks, formatting lint targets, and unified build scripts.

---

## Folder Structure

```
c:\Users\amish\Documents\react\intern4/
├── app/
│   ├── layout.tsx             # Root layout wrapping HTML, metadata, and body
│   ├── page.tsx               # Landing page with CTA buttons and features
│   ├── loading.tsx            # Global dashboard loading skeletons
│   ├── error.tsx              # Catch-all runtime error boundaries
│   ├── not-found.tsx          # Custom 404 page
│   ├── providers.tsx          # React Query and Theme contexts
│   ├── dashboard/             # Dashboard screen with CSS-only charts
│   ├── customers/             # Customers screen (Coming Soon empty state)
│   ├── predictions/           # Predictions screen (Coming Soon empty state)
│   ├── collections/           # Collections screen (Coming Soon empty state)
│   ├── analytics/             # Analytics screen (Coming Soon empty state)
│   ├── reports/               # Reports screen (Coming Soon empty state)
│   ├── settings/              # Settings screen (Coming Soon empty state)
│   └── health/                # TanStack query integration (JSON response preview)
├── components/
│   ├── ui/                    # Reusable primitive UI components
│   │   ├── button.tsx         # Framer-motion interactive buttons
│   │   ├── card.tsx           # Standardized card layouts
│   │   ├── badge.tsx          # Theme-aware badges
│   │   ├── table.tsx          # Styled HTML table elements
│   │   ├── dialog.tsx         # spring-animated modals
│   │   ├── tabs.tsx           # context-controlled layout tabs
│   │   ├── input.tsx          # standard accessibility input
│   │   ├── select.tsx         # customized select dropdown
│   │   ├── textarea.tsx       # text areas
│   │   ├── skeleton.tsx       # loading placeholder skeletons
│   │   ├── empty-state.tsx    # detailed screen placeholder
│   │   ├── page-header.tsx    # reusable header title container
│   │   ├── loading-spinner.tsx# SVG loader spinner
│   │   └── stat-card.tsx      # dashboard metric indicators
│   └── layout/                # Shell shell structure layout elements
│       ├── sidebar.tsx        # responsive panel layout
│       ├── navbar.tsx         # header with notifications, search, profile
│       ├── footer.tsx         # meta copyright credits and system versions
│       ├── breadcrumb.tsx     # dynamic pathname parser breadcrumb
│       └── theme-toggle.tsx   # switch Sun and Moon themes
├── hooks/
│   ├── use-theme.ts           # hook context managing light/dark preference
│   └── use-window-size.ts     # track screen width for drawer overlays
├── lib/
│   ├── theme.ts               # design tokens (spacing, radii, transitions)
│   └── utils.ts               # standard classname merge utility
├── services/
│   └── api.ts                 # Axios instance defaults and wrappers
├── types/
│   └── index.ts               # shared TypeScript models
├── styles/
│   └── globals.css            # Tailwind directives and CSS variables
├── public/                    # static assets
├── .env.example               # local environment variables template
├── tsconfig.json              # TypeScript compilation rules
├── tailwind.config.ts         # Tailwind directives mapping colors
└── package.json               # dependencies and script configuration
```

---

## Environment Variables

Create a `.env.local` file in the root directory based on `.env.example`:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_APP_NAME="AI SaaS Starter"
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

1. Clone or copy this repository to your local directory.
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. Set up the local environment file:
   ```bash
   cp .env.example .env.local
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Runs the app in development mode at `http://localhost:3000`.
- **`npm run build`**: Compiles the application for production deployment. Runs lints, type-checks, and builds the static structure.
- **`npm run lint`**: Checks codebase for compilation warnings, code patterns, and ESLint rule validations.
- **`npm run type-check`**: Validates strict TypeScript compilation without producing output files.
- **`npm run format`**: Re-formats the code structure using Prettier.

---

## Deployment on Vercel

This template is fully optimized for Vercel preview and production deployments.

1. Install the Vercel CLI globally or link the project in your Vercel Dashboard.
2. Ensure you add the variables listed in `.env.example` to your Vercel Project Settings Environment Variables.
3. Deploy immediately:
   ```bash
   vercel
   ```

---

## Conventional Commit Examples

To maintain a clean git version control workflow, it is recommended to use conventional commit tags:

- **`feat: add responsive modal overlay`** (new features)
- **`fix: adjust theme toggler hydration flash`** (bug fixes)
- **`docs: update README install instructions`** (documentation changes)
- **`style: reformat page header spacing`** (styling changes)
- **`refactor: delegate layout side effects`** (code restructuring)
- **`chore: bump axios production dependency`** (maintenance tasks)

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
