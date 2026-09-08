import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
);

const nextConfig: NextConfig = {
  // Ảnh Docker gọn hơn cho triển khai VPS (chỉ copy .next/standalone).
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
