import type { Metadata } from 'next';
import { ShowcasePage } from '@/components/site/ShowcasePage';
import { cabinetPage } from '@/content/site';

export const metadata: Metadata = { title: cabinetPage.title, description: cabinetPage.introduction };
export default function CabinetPage() { return <ShowcasePage page={cabinetPage} />; }
