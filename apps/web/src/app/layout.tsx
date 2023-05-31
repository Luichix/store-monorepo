import 'ui/styles.css';
import Footer from '../components/Footer';
import MobileNavigation from '../components/MobileNavigation';
import Navigation from '../components/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Mobile menu */}
        <MobileNavigation />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
