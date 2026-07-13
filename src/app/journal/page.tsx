import type { Metadata } from 'next';
import { ShowcasePage } from '@/components/site/ShowcasePage';
import { journalPage } from '@/content/site';

export const metadata: Metadata = { title: journalPage.title, description: journalPage.introduction };
export default function JournalPage() { return <ShowcasePage page={journalPage} />; }
