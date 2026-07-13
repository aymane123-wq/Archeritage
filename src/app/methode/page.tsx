import type { Metadata } from 'next';
import { ShowcasePage } from '@/components/site/ShowcasePage';
import { methodePage } from '@/content/site';

export const metadata: Metadata = { title: methodePage.title, description: methodePage.introduction };
export default function MethodePage() { return <ShowcasePage page={methodePage} />; }
