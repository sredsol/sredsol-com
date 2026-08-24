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

  console.info(`[smtp-email] Initializing SMTP transport for host: ${host}:${port} (secure: ${secure})`);

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

  const { message, source } = event;
  console.info(`[smtp-email] Delivering email from "${from}" (source: ${source}) to "${message.to}"...`);

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });

    console.info(`[smtp-email] ✅ Email delivered successfully to ${message.to}. MessageId: ${info.messageId}`);
  } catch (error) {
    console.error(`[smtp-email] ❌ Failed to deliver email via SMTP:`, error);
    throw error;
  }
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
  const host = process.env.SMTP_HOST;
  const from = process.env.EMAIL_FROM;
  const configured = Boolean(host && from);

  if (configured) {
    console.info(`[smtp-email] Plugin activated with host: ${host}, from: ${from}`);
  }

  return definePlugin({
    id: "smtp-email",
    version: "1.0.0",
    capabilities: ["hooks.email-transport:register"],
    hooks: configured
      ? { "email:deliver": { exclusive: true, handler: deliver } }
      : {},
  });
}
