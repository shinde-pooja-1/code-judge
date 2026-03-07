/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    generateRobotsTxt: true, // generates robots.txt alongside sitemap.xml
    exclude: [
        "/api/*", // keep API routes out of sitemap
    ],
}
