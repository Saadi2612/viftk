import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viftk — Software Studio",
  description: "A focused software studio designing and engineering products for ambitious teams.",
  openGraph: {
    title: "Viftk — Software Studio",
    description:
      "A focused software studio designing and engineering products for ambitious teams.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9d70f489-a335-48ee-b52f-80831d547d78/id-preview-2ad70ddf--94ac20e6-a1a7-4148-bbe7-f77bf8171288.lovable.app-1778955627856.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viftk — Software Studio",
    description:
      "A focused software studio designing and engineering products for ambitious teams.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9d70f489-a335-48ee-b52f-80831d547d78/id-preview-2ad70ddf--94ac20e6-a1a7-4148-bbe7-f77bf8171288.lovable.app-1778955627856.png",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
