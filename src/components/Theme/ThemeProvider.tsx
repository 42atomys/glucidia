"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme="system">
      {children}
    </NextThemeProvider>
  );
};