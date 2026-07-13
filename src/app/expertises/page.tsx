import type { Metadata } from 'next';
import { ShowcasePage } from '@/components/site/ShowcasePage';
import { expertisesPage } from '@/content/site';

export const metadata: Metadata = { title: expertisesPage.title, description: expertisesPage.introduction };
export default function ExpertisesPage() { return <ShowcasePage page={expertisesPage} />; }
