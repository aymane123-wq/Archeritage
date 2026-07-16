import type { MetadataRoute } from 'next';
import { siteRoutes } from '@/content/site';
import { site } from '@/data/site';
import { getJournalPosts } from '@/lib/journal';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getJournalPosts();
  const staticRoutes = [{ href: '/' }, ...siteRoutes, { href: '/mentions-legales' }, { href: '/confidentialite' }];
  return [...staticRoutes.map((route) => ({ url: new URL(route.href, site.url).toString(), changeFrequency: route.href === '/journal' ? 'weekly' as const : 'monthly' as const })), ...posts.map((post) => ({ url: new URL(`/journal/${post.slug}`, site.url).toString(), changeFrequency: 'monthly' as const }))];
}
