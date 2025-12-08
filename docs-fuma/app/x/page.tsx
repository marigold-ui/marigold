import { source } from '@/lib/source';
import { SiteHeader } from '../_components/SiteHeader';
import { HomeContent } from './HomeContent';

export default function HomePage() {
  console.log('page tree', source.getPages());
  return (
    <>
      <HomeContent />
    </>
  );
}
