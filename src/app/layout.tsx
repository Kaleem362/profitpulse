import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://profitpulse.io"),
  title: {
    default: "ProfitPulse - Free E-Commerce & Freelancer Profit Calculators",
    template: "%s | ProfitPulse",
  },
  description:
    "Free precision fee calculators for Etsy sellers, eBay flippers, Stripe/PayPal merchants, and freelancers. Calculate net profit, break-even price, and platform fees updated for 2026.",
  keywords: [
    "etsy fee calculator",
    "ebay fee calculator",
    "stripe fee calculator",
    "paypal invoice fee calculator",
    "freelance hourly rate calculator",
    "etsy profit margin calculator",
    "shopify vs etsy calculator",
  ],
  authors: [{ name: "ProfitPulse Editorial Team" }],
  creator: "ProfitPulse",
  publisher: "ProfitPulse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://profitpulse.io",
    siteName: "ProfitPulse",
    title: "ProfitPulse - Free E-Commerce & Freelancer Profit Calculators",
    description:
      "Instant, transparent profit calculators for online sellers and freelancers. Updated for 2026 platform fee schedules.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfitPulse - Free E-Commerce & Freelancer Profit Calculators",
    description:
      "Instant, transparent profit calculators for online sellers and freelancers. Updated for 2026 platform fee schedules.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en">
      <head>
        {adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ProfitPulse",
              "url": "https://profitpulse.io",
              "description":
                "Free precision profit and fee calculators for online sellers and freelancers.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://profitpulse.io/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
