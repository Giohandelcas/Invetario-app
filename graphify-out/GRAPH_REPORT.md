# Graph Report - .  (2026-07-09)

## Corpus Check
- Corpus is ~1,098 words - fits in a single context window. You may not need a graph.

## Summary
- 70 nodes · 58 edges · 15 communities (7 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.8)
- Token cost: 163,974 input · 0 output

## Community Hubs (Navigation)
- TS Compiler Options
- Project Docs & Framework Notice
- Package Scripts
- Dev Dependencies
- Runtime Dependencies
- Root Layout
- TS Config
- ESLint Config
- Next Config
- PostCSS Config
- File Icon Asset
- Globe Icon Asset
- Vercel Logo Asset
- Window Icon Asset

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 5 edges
3. `Next.js Project (create-next-app)` - 5 edges
4. `Next.js Breaking Changes Notice` - 3 edges
5. `next` - 2 edges
6. `paths` - 2 edges
7. `next/font` - 2 edges
8. `Next.js Framework` - 2 edges
9. `geistSans` - 1 edges
10. `geistMono` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Breaking Changes Notice` --semantically_similar_to--> `Next.js Project (create-next-app)`  [INFERRED] [semantically similar]
  AGENTS.md → README.md
- `CLAUDE.md Root Config` --references--> `Next.js Breaking Changes Notice`  [EXTRACTED]
  CLAUDE.md → AGENTS.md

## Import Cycles
- None detected.

## Communities (15 total, 8 thin omitted)

### Community 0 - "TS Compiler Options"
Cohesion: 0.12
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 1 - "Project Docs & Framework Notice"
Cohesion: 0.22
Nodes (9): node_modules/next/dist/docs Guide, Next.js Breaking Changes Notice, CLAUDE.md Root Config, app/page.tsx, create-next-app, Geist Font, next/font, Next.js Project (create-next-app) (+1 more)

### Community 2 - "Package Scripts"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 3 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.33
Nodes (6): Next.js Framework, dependencies, next, react, react-dom, Next.js Logo (next.svg)

### Community 5 - "Root Layout"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

## Knowledge Gaps
- **51 isolated node(s):** `geistSans`, `geistMono`, `metadata`, `eslintConfig`, `nextConfig` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `compilerOptions` connect `TS Compiler Options` to `TS Config`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `metadata` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TS Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._