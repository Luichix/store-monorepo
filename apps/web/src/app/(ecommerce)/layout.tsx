import { Footer, MobileNavigation, Navigation } from '@/components/layout';

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <MobileNavigation />
      {children}
      <Footer />
    </div>
  );
}
