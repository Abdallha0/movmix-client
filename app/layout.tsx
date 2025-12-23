import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import { ToastProvider } from "./providers/toastProvider";
import ClientProviders from "./providers/Client-Providers";

export const metadata: Metadata = {
  title: "Movmix",
  description: "movmix movies films ceinma actors stream movie film watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Completly platform to watch your favorite movies" />
        <meta name="keywords" content="movmix movies films stream movie film watch" />
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
