import type { MetadataRoute } from 'next';
import { siteRoutes } from '@/content/site';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({ url: new URL(route.href, site.url).toString() }));
}
