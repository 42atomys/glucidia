import { ThemeProvider } from '@/components/Theme';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GlucidIA - A Glucose Monitoring App for Diabetics',
  description: 'A Glucose Monitoring App for Diabetics powered by AI',
  applicationName: 'GlucidIA',
  authors: [
    {
      name: 'GlucidIA',
      url: 'https://glucid.ia',
    },
    {
      name: '42atomys',
      url: 'https://github.com/42atomys',
    },
  ],
  creator: '42atomys',
  category: 'Health',
  keywords: ['glucose', 'monitoring', 'diabetes', 'ai', 'machine learning'],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
