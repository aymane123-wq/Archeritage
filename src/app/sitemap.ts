import type { MetadataRoute } from 'next';
import { siteRoutes } from '@/content/site';
import { expertiseSlugs } from '@/content/site/expertises';
import { referenceRecords } from '@/content/site/references';
import { site } from '@/data/site';
import { getPublishedJournalPosts } from '@/lib/journal';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedJournalPosts();
  const staticRoutes = Array.from(
    new Map([{ href: '/' }, ...siteRoutes].map((route) => [route.href, route])).values(),
  );

  const expertiseRoutes = expertiseSlugs.map((slug) => ({
    href: `/expertises/${slug}`,
  }));
  const referenceRoutes = referenceRecords.map(({ slug }) => ({
    href: `/references/${slug}`,
  }));

  return [
    ...[...staticRoutes, ...expertiseRoutes, ...referenceRoutes].map((route) => ({
      url: new URL(route.href, site.url).toString(),
      changeFrequency: route.href === '/journal' ? ('weekly' as const) : ('monthly' as const),
    })),
    ...posts.map((post) => ({
      url: new URL(`/journal/${post.slug}`, site.url).toString(),
      changeFrequency: 'monthly' as const,
    })),
  ];
}
