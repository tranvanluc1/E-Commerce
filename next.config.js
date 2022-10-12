/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://tranvanluc:12312324hdev@e-commerce.42lgwzh.mongodb.net/?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "Jd6KJ(M5(@7udR^VcmwZJWa^t$n!XPP$(WmA*DII)DQ%+ML(45",
    REFRESH_TOKEN_SECRET:
      "v@zZH+vs9&d*GTvvLE%hBgDdKDHPs9kFn(AG2*mQUJ+FqNy4Bncx)^UtBqWpEMm#",
  },
};

const withCSS = require("@zeit/next-css");
module.exports = withCSS();

module.exports = nextConfig;
