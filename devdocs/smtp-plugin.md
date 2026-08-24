# Custom SMTP Email Transport Plugin — Implementation Plan

## 1. Executive Summary & Feasibility Confirmation

### Can we replace Resend with our own mail server?
**YES, 100% supported.**

EmDash utilizes a capability-based plugin system. Any plugin that registers the capability `hooks.email-transport:register` and implements the exclusive `"email:deliver"` hook automatically becomes the primary email transport for the entire CMS.

Because SREDSOL runs on **Node.js 24 (`@astrojs/node`) in Docker/Dokploy**, we have full access to native TCP sockets, SSL/TLS, and the Node.js ecosystem, allowing seamless integration with any internal or private SMTP server (Postfix, Exim, Haraka, Mailcow, Microsoft 365, Google Workspace SMTP Relay, or a custom corporate mail cluster).

---

## 2. Architecture & EmDash Hook Mechanism

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EMDASH CMS CORE ENGINE                             │
│       (User Invitations · Magic Login Tokens · Password Resets)             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ Dispatches "email:deliver" event
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CUSTOM SMTP PLUGIN (src/emdash/smtp-email.ts)         │
│                                                                             │
│  1. Verifies SMTP environment credentials at runtime                        │
│  2. Initializes persistent Nodemailer connection pool                       │
│  3. Handles STARTTLS (587), SSL/TLS (465), or plain SMTP (25)               │
│  4. Formats HTML & Plaintext multipart MIME payload                         │
│  5. Delivers message directly to your private mail server                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ Native TCP Socket (TLS/STARTTLS)
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CORPORATE / INTERNAL MAIL SERVER                      │
│                  (e.g., mail.sredsol.com : 587 / 465)                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Environment Configuration Specification

Add the following environment variables to `.env` (and your Dokploy / Docker deployment environment):

```env
# =============================================================================
# Custom SMTP Mail Server Configuration
# =============================================================================
SMTP_HOST="mail.sredsol.com"           # FQDN or IP of your mail server
SMTP_PORT=587                         # 587 (STARTTLS), 465 (SSL/TLS), or 25
SMTP_SECURE=false                     # true for port 465; false for port 587/25
SMTP_USER="noreply@sredsol.com"       # SMTP authentication username
SMTP_PASS="your-secure-smtp-password" # SMTP authentication password
EMAIL_FROM="SREDSOL <noreply@sredsol.com>" # Sender address displayed to users

# Optional TLS overrides (for self-signed internal certs or local dev)
SMTP_REJECT_UNAUTHORIZED=true         # Set to false only if using self-signed certs
```

---

## 4. Implementation Specification

### Step 1: Install `nodemailer`
Add `nodemailer` and its TypeScript definitions:
```bash
pnpm add nodemailer
pnpm add -D @types/nodemailer
```

---

### Step 2: Create `src/emdash/smtp-email.ts`

```typescript
import { definePlugin } from "emdash";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface DeliverEvent {
  message: EmailMessage;
  source: string;
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const rejectUnauthorized = process.env.SMTP_REJECT_UNAUTHORIZED !== "false";

  if (!host) {
    throw new Error("SMTP_HOST is not defined — cannot initialize SMTP transport.");
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });

  return cachedTransporter;
}

async function deliver(event: DeliverEvent) {
  const from = process.env.EMAIL_FROM;
  if (!from) {
    throw new Error("EMAIL_FROM is not defined — SMTP requires a valid sender address.");
  }

  const { message } = event;
  const transporter = getTransporter();

  await transporter.sendMail({
    from,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}

/**
 * Creates the EmDash SMTP Email Transport Plugin.
 *
 * Lifecycle:
 * - If SMTP_HOST and EMAIL_FROM are configured: Registers exclusive 'email:deliver' hook.
 * - If not configured: Registers no hook, allowing EmDash to fall back to copy-link
 *   invitations for local offline development.
 */
export function createPlugin() {
  const configured = Boolean(process.env.SMTP_HOST && process.env.EMAIL_FROM);

  return definePlugin({
    id: "smtp-email",
    version: "1.0.0",
    capabilities: ["hooks.email-transport:register"],
    hooks: configured
      ? { "email:deliver": { exclusive: true, handler: deliver } }
      : {},
  });
}
```

---

### Step 3: Register in `astro.config.ts`

Replace `resend-email` with `smtp-email`:

```typescript
// astro.config.ts
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { createPlugin as smtpPluginEntry } from "./src/emdash/smtp-email";
import { createPlugin as sredsolExplorationsEntry } from "./src/emdash/sredsol-explorations";
import { createPlugin as sredsolSeoEntry } from "./src/emdash/sredsol-seo";
import { createPlugin as sredsolRelationshipsEntry } from "./src/emdash/sredsol-relationships";

const emdashPlugins = [
  {
    id: "smtp-email",
    version: "1.0.0",
    capabilities: ["hooks.email-transport:register"],
    entrypoint: smtpPluginEntry,
  },
  {
    id: "sredsol-explorations",
    version: "1.0.0",
    capabilities: ["content:read", "content:write"],
    entrypoint: sredsolExplorationsEntry,
  },
  {
    id: "sredsol-seo",
    version: "1.0.0",
    capabilities: ["content:read"],
    entrypoint: sredsolSeoEntry,
  },
  {
    id: "sredsol-relationships",
    version: "1.0.0",
    capabilities: ["content:read", "content:write"],
    entrypoint: sredsolRelationshipsEntry,
  },
];

export default defineConfig({
  integrations: [
    emdash({
      plugins: emdashPlugins,
    }),
  ],
});
```

---

## 5. Security & Operational Best Practices

1. **Connection Pooling (`pool: true`)**:
   - Keeps sockets open across requests to prevent latency overhead from TLS handshakes on every invite email.
2. **Graceful Fallback Mode**:
   - In local development without a mail server configured, EmDash automatically falls back to generating instant invitation URLs in the browser and terminal console.
3. **Encrypted Credentials**:
   - Store `SMTP_PASS` exclusively in server secrets (Dokploy environment variables or `.env.production`). Never check passwords into Git.
4. **DKIM / SPF / DMARC Compliance**:
   - Ensure your mail server domain's DNS contains SPF (`v=spf1 ...`) and DKIM TXT records matching `EMAIL_FROM` to ensure auth emails do not land in spam folders.

---

## 6. Verification & Testing Plan

### 1. Automated Unit Tests (`tests/smtp-plugin.test.ts`)
* Test that `createPlugin()` registers `hooks.email-transport:register` when `SMTP_HOST` & `EMAIL_FROM` are set.
* Test that `createPlugin()` returns empty hooks `{}` when environment variables are omitted.
* Mock `nodemailer.createTransport` to verify `sendMail` parameters (`from`, `to`, `subject`, `text`, `html`).

### 2. Manual Verification in EmDash Admin
1. Set SMTP test credentials in `.env`.
2. Start dev server (`pnpm dev`).
3. Open `http://localhost:4321/_emdash`.
4. Navigate to **Settings** $\rightarrow$ **Team & Users** $\rightarrow$ **Invite User**.
5. Send an invite to your test email and verify receipt from your mail server.

---

## 7. Migration Checklist

- [ ] Install dependencies: `pnpm add nodemailer` & `pnpm add -D @types/nodemailer`
- [ ] Create `src/emdash/smtp-email.ts`
- [ ] Update `astro.config.ts` to register `smtp-email`
- [ ] Add unit test in `tests/smtp-plugin.test.ts`
- [ ] Add `SMTP_*` variables to `.env.example`
- [ ] Run full project verification suite (`pnpm lint && pnpm check:kpis && pnpm test && pnpm build`)
- [ ] Update `devdocs/plugins.md` to document the SMTP transport configuration
