import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/app/provider";
import { Toaster } from "sonner";

const appFont = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airtistub - AI-Powered UI Generation Tool",
  description:
    "Turn your ideas into beautiful UI mockups with AI. Describe your design and get stunning mobile and website interfaces instantly. Simple, fast, and magical.",
  keywords: [
    "AI UI generator",
    "design tool",
    "UI mockups",
    "mobile app design",
    "website design",
    "AI design",
    "interface generator",
  ],
  authors: [{ name: "Airtistub Team" }],
  creator: "Airtistub",
  publisher: "Airtistub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://airtistub.com"), // Replace with actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Airtistub - AI-Powered UI Generation",
    description:
      "Describe your design. Get stunning UI mockups instantly. Simple, fast, and magical.",
    url: "https://airtistub.com",
    siteName: "Airtistub",
    images: [
      {
        url: "/icons8-design-arcade/logo-100.png",
        width: 100,
        height: 100,
        alt: "Airtistub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "Airtistub - AI-Powered UI Generation",
    description: "Describe your design. Get stunning UI mockups instantly.",
    images: ["/icons8-design-arcade/logo-100.png"],
    creator: "@airtistub", // Replace if you have a Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Airtistub",
    description:
      "AI-powered UI generation tool that turns text descriptions into beautiful UI mockups",
    url: "https://airtistub.com",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Airtistub Team",
    },
    featureList: [
      "AI-powered UI generation",
      "Mobile and website design support",
      "Instant mockup creation",
      "Text-to-UI conversion",
    ],
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </head>
        <body className={`${appFont.className} antialiased`}>
          <Provider>{children}</Provider>
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
