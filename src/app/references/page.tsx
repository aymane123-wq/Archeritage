import type { Metadata } from 'next';
import { ShowcasePage } from '@/components/site/ShowcasePage';
import { referencesPage } from '@/content/site';

export const metadata: Metadata = { title: referencesPage.title, description: referencesPage.introduction };
export default function ReferencesPage() { return <ShowcasePage page={referencesPage} />; }
