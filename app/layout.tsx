import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import { ToastProvider } from "./providers/toastProvider";
import ClientProviders from "./providers/Client-Providers";

export const metadata: Metadata = {
  title: "Movmix",
  description: "movmix movies films ceinma actors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProviders>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
