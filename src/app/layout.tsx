import './globals.css';

export const metadata = {
  title: 'FRYBIRD — Fried Chicken • Burgers | UAE',
  description:
    'FRYBIRD — Nashville-style fried chicken & smash burgers, born in the UAE. Fry. Eat. Repeat. Hotter than ever across Ajman, Fujairah & Oman.',
  icons: { icon: '/img/logo.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.className+=' js'" }}
        />
        {children}
      </body>
    </html>
  );
}
