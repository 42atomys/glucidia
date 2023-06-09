import { ThemeProvider } from '@/components/Theme';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GlucidIA - Compagnon de vie pour diabétiques',
  description:
    "GlucidIA est un compagnon de vie pour diabétiques propulsé par l'intelligence artificielle. Il vous permet de gérer votre diabète via l'insulinothérapie fonctionnelle (ITF) en toute sérénité. Testez dès maintenant pour votre repas !",
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
  robots: {
    index: true,
  },
  keywords: [
    'glucidia',
    'glucides',
    'itf',
    'insulinothérapie',
    'insulinothérapie fonctionnelle',
    'ia',
    'ai',
    'machine learning',
    'diabete',
    'compagnon',
    'compagnon de vie',
    'diabétique',
    'diabetique',
    'diabétiques',
    'diabetiques',
    'diabète',
    'diabete',
    'diabetes',
    'diabetic',
    'diabetics',
    'diabetes type 1',
    'diabetic type 1',
    'diabetics type 1',
    'diabetes type 2',
    'diabetic type 2',
    'diabetics type 2',
    'algorithm',
    'algorithme',
    'algorithme',
    'intelligence artificielle',
    'artificial intelligence',
    'ia',
    'ai',
    'machine learning',
    'machine-learning',
    'machinelearning',
    'ml',
    'deep learning',
    'deep-learning',
    'ratio',
    'insuline',
    'insulin',
    'insuline rapide',
    'insuline lente',
    'insuline mixte',
    'pompe à insuline',
  ],
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
