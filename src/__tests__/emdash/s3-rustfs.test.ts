import { describe, it, expect } from "vitest";
import { S3Client } from "@aws-sdk/client-s3";

describe("RustFS S3 Media Storage Configuration", () => {
  it("initializes S3Client with RustFS endpoint and credentials", () => {
    const endpoint = process.env.S3_ENDPOINT || "http://localhost:9000";
    const bucket = process.env.S3_BUCKET || "sredsol-media";

    const client = new S3Client({
      endpoint,
      region: process.env.S3_REGION || "auto",
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "rustfsadmin",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "rustfsadmin",
      },
    });

    expect(client).toBeDefined();
    expect(bucket).toBe("sredsol-media");
  });
});
