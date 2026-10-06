import { MetadataRoute } from "next";

const siteUrl = "https://studentos.pages.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/gpa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cgpa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/planner`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}