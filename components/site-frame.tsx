import { SiteHeader } from '@/components/site-header';

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
    </>
  );
}
