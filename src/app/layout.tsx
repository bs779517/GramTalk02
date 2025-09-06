import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'ConnectNow',
  description: 'A modern chat application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full bg-[#d1d7db] flex items-center justify-center p-0 sm:p-4">
        <div id="app-container" className="relative bg-background w-full h-full sm:max-w-[450px] sm:max-h-[950px] overflow-hidden sm:shadow-2xl sm:rounded-2xl flex flex-col">
          {children}
        </div>
        <audio id="ringtone" loop src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"></audio>
        <Toaster />
      </body>
    </html>
  );
}
