import ConditionalNav from './_components/ConditionalNav';
import Footer from './_components/Footer';
import './globals.css';

export const metadata = {
  title: 'Vrober - Web Solutions',
  description: 'providing srevices at your doorstep',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConditionalNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
