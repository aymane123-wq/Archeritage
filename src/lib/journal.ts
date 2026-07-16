import { journalPosts, type JournalPost } from '@/content/site/official';

const sanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET);

export async function getJournalPosts(): Promise<JournalPost[]> {
  // The local, approved publications remain the safe fallback until Sanity is configured.
  // A future Sanity adapter can be introduced here without coupling pages to the CMS.
  void sanityConfigured;
  return journalPosts;
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const posts = await getJournalPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
