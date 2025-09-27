import './globals.css';

export const metadata = {
  title: 'Vrober - Web Solutions',
  description: 'providing srevices at your doorstep',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
