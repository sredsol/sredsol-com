# Implementation Plan — SREDSOL Company & Philosophy Page

**Target Page**: [`/company`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/company.astro)  
**Reference Review**: [`devdocs/reviews/after-logo.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/reviews/after-logo.md)  
**Status**: IMPLEMENTED & VERIFIED (0 Errors across all gates)

---

## 1. Executive Summary & Objective

The review of the SREDSOL Company page ([`devdocs/reviews/after-logo.md`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/devdocs/reviews/after-logo.md)) establishes that the Company page functions as the **philosophical & intellectual layer ("WHY")** in SREDSOL's three-tier corporate narrative:

```
┌────────────────────────────────────────────────────────────────────────┐
│ WHY     │ How We Build (Philosophy & Engineering Principles on /company)│
│ WHAT    │ Explorations & Technologies (/technology, /explorations)      │
│ PROOF   │ Studios, Instruments & Systems (/explorations/[slug])         │
└────────────────────────────────────────────────────────────────────────┘
```

The goal of this work package is to refine `/company` by:
1. Re-aligning the **4 Guiding Principles** into a complete conceptual system with explicit **"What this means in practice"** engineering consequences.
2. Introducing a compact **System Pipeline Artifact (`OBSERVE → MODEL → BUILD → MEASURE → REFLECT`)** in the hero section to bridge philosophy with living system instruments.
3. Structuring the **Three-Tier Architecture Diagram** linking *Philosophy* $\rightarrow$ *Explorations* $\rightarrow$ *Studios*.
4. Maintaining strict design token compliance, dark/light mode parity, zero-JS baseline, and zero generic marketing boilerplate.

---

## 2. Detailed Work Packages

### Work Package 1: Four-Part Conceptual Principles Architecture

Update the principles data structure in `src/pages/company.astro` to:

| Code | Principle Title | Philosophical Thesis | Engineering Translation ("What this means in practice") |
|---|---|---|---|
| `01 // EMPIRICISM` | **Observation Precedes Explanation** | *Observe, manipulate, and experiment before imposing formal explanations.* | We construct interactive environments where researchers and learners manipulate a system, inspect real-time waveforms and data streams, and only then derive formal abstractions. |
| `02 // COMPUTATION` | **Computation as a Medium of Thought** | *Computation isn't merely a delivery mechanism; it is a medium for constructing, testing, and expressing ideas.* | We build executable simulation models, dynamic geometry engines, and interactive parameter graphs as active thinking tools—not static instructional content. |
| `03 // PHYSICAL BRIDGES` | **Bridging Abstract and Tangible** | *Connect mathematical and computational models to sensors, instruments, hardware, and physical phenomena.* | We develop high-speed sensor buses (I2C/SPI), microcontroller bridges (WebSerial/UART), and hardware-in-the-loop telemetry instruments that ground theory in physical physics. |
| `04 // AGENCY` | **Systems Should Invite Exploration** | *Technology should expand human capacity to ask questions, construct mental models, and reflect.* | We design constructivist environments (like LearningOS) with local-first SQLite persistence, transparent state, and explorable interfaces that invite autonomous inquiry. |

---

### Work Package 2: Hero System Pipeline Artifact

Between the hero header and the principles grid, insert a restrained computational pipeline component:

```
[ ·──●──· COGNITIVE CYCLE BUS ]
┌───────────┐     ┌─────────┐     ┌─────────┐     ┌───────────┐     ┌───────────┐
│  OBSERVE  │ ──► │  MODEL  │ ──► │  BUILD  │ ──► │  MEASURE  │ ──► │  REFLECT  │
└───────────┘     └─────────┘     └─────────┘     └───────────┘     └───────────┘
Telemetry Streams   Math Formalism   Executable     Scope Telemetry    Cognitive
& Sensor Bridges    & Topology       Engines        & Feedback Loops   Synthesis
```

- **Visuals**: Tokenized dark/light styling (`border-border`, `bg-card`, `text-primary`, `font-mono`), active node dot pulses, responsive flow for mobile/tablet.
- **Accessibility**: Semantic HTML list with `aria-label="SREDSOL Engineering Methodology Cycle"` and prefers-reduced-motion guards.

---

### Work Package 3: Three-Tier Ecosystem Conduit

Add a section at the bottom of the page (before `LabCTA`) showing how SREDSOL operates across its 3 levels:

1. **WHY — How We Build**: The foundational philosophy (Current page).
2. **WHAT — Explorations & Technologies**: Mathematical and physical domains ([`/explorations`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/explorations.astro) & [`/technology`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/technology.astro)).
3. **PROOF — Interactive Studios**: The 5 live computational workbenches ([`/explorations/physical-computing`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/explorations/%5Bslug%5D.astro), [`/explorations/learning-os`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/explorations/%5Bslug%5D.astro), [`/explorations/observation-studio`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/explorations/%5Bslug%5D.astro), [`/explorations/oxigeo`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/explorations/%5Bslug%5D.astro), [`/explorations/math-art`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/explorations/%5Bslug%5D.astro)).

---

## 3. Files to Modify

| File | Type | Changes |
|---|---|---|
| [`src/pages/company.astro`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/pages/company.astro) | MODIFY | Implement the 4 refined principles with "What this means" cards, hero system pipeline artifact, updated subheadings, and 3-tier ecosystem conduit. |
| [`src/registry.json`](file:///Users/shsarma/DEVEL/TESTING/astro-emdash-sqlite-r2-starter/src/registry.json) | VERIFY | Ensure metadata for `/company` matches description and component dependencies. |

---

## 4. Verification Plan

1. **Type & Compilation Integrity**:
   ```bash
   ASTRO_TELEMETRY_DISABLED=1 pnpm run type-check
   ```
2. **Style & Code Quality**:
   ```bash
   pnpm run lint:js && pnpm run lint:css
   ```
3. **Design Tokens & KPI Compliance**:
   ```bash
   pnpm run check:kpis
   ```
4. **i18n Sync**:
   ```bash
   pnpm run validate:i18n
   ```
