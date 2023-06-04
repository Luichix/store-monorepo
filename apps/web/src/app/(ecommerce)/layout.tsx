import { Footer, MobileNavigation, Navigation } from '@/components/layout';

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MobileNavigation />
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
