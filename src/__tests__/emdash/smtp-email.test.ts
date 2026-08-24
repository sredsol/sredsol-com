import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createPlugin } from "../../emdash/smtp-email";

describe("createPlugin (SMTP Email Transport)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns an empty hooks object when SMTP_HOST or EMAIL_FROM is missing", () => {
    delete process.env.SMTP_HOST;
    delete process.env.EMAIL_FROM;

    const plugin = createPlugin();
    expect(plugin.id).toBe("smtp-email");
    expect(plugin.version).toBe("1.0.0");
    expect(plugin.capabilities).toContain("hooks.email-transport:register");
    expect(plugin.hooks).toEqual({});
  });

  it("registers the exclusive email:deliver hook when configured", () => {
    process.env.SMTP_HOST = "mail.sredsol.com";
    process.env.SMTP_PORT = "587";
    process.env.EMAIL_FROM = "SREDSOL <noreply@sredsol.com>";

    const plugin = createPlugin();
    expect(plugin.id).toBe("smtp-email");
    expect(plugin.hooks?.["email:deliver"]).toBeDefined();
    expect(plugin.hooks?.["email:deliver"]?.exclusive).toBe(true);
    expect(typeof plugin.hooks?.["email:deliver"]?.handler).toBe("function");
  });
});
