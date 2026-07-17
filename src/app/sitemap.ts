import type { MetadataRoute } from 'next';
import { siteRoutes } from '@/content/site';
import { site } from '@/data/site';
import { getPublishedJournalPosts } from '@/lib/journal';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedJournalPosts();
  const staticRoutes = [{ href: '/' }, ...siteRoutes];
  return [...staticRoutes.map((route) => ({ url: new URL(route.href, site.url).toString(), changeFrequency: route.href === '/journal' ? 'weekly' as const : 'monthly' as const })), ...posts.map((post) => ({ url: new URL(`/journal/${post.slug}`, site.url).toString(), changeFrequency: 'monthly' as const }))];
}
