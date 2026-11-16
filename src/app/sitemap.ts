import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://profitpulse.io";

  const routes = [
    "",
    "/calculators/etsy-fee-calculator",
    "/calculators/ebay-fee-calculator",
    "/calculators/stripe-fee-calculator",
    "/calculators/freelance-hourly-rate-calculator",
    "/calculators/shopify-vs-etsy-calculator",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/calculators") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/calculators") ? 0.9 : 0.6,
  }));
}

