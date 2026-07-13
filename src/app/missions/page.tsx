import type { Metadata } from 'next';
import { ShowcasePage } from '@/components/site/ShowcasePage';
import { missionsPage } from '@/content/site';

export const metadata: Metadata = { title: missionsPage.title, description: missionsPage.introduction };
export default function MissionsPage() { return <ShowcasePage page={missionsPage} />; }
