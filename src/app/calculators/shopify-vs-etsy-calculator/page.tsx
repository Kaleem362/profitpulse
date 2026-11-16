import React from "react";
import Link from "next/link";
import { ChevronRight, TrendingUp, Scale, CheckCircle2 } from "lucide-react";
import ShopifyComparisonCalculator from "@/components/calculators/ShopifyComparisonCalculator";
import AdBanner from "@/components/AdBanner";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata = {
  title: "Shopify vs. Etsy Fee Comparison & Break-Even Calculator (2026)",
  description:
    "Compare Etsy fees vs. Shopify monthly subscription and payment processing costs. Calculate the exact sales break-even inflection point where Shopify is cheaper.",
  keywords: [
    "shopify vs etsy calculator",
    "when to switch from etsy to shopify",
    "shopify fee comparison",
    "is shopify cheaper than etsy",
    "etsy migration break-even point",
  ],
};

const comparisonFAQs: FAQItem[] = [
  {
    question: "At what monthly revenue is Shopify cheaper than Etsy?",
    answer:
      "For a typical shop selling products with a $35 to $50 average order value, Shopify generally becomes cheaper in direct platform and transaction fees once your monthly gross sales cross approximately $1,500 to $2,000/month. Below that number, Etsy's zero monthly subscription fee is more cost-effective.",
  },
  {
    question: "If Shopify has lower transaction fees, why stay on Etsy?",
    answer:
      "Etsy is a marketplace with built-in search traffic and millions of active buyers already browsing for unique gifts. On Shopify, you have zero built-in traffic and must generate all visitors yourself through social media, SEO, email lists, or paid Meta/Google ads. Many successful brands maintain both: Etsy as a customer acquisition funnel, and Shopify for repeat buyers.",
  },
  {
    question: "What are Shopify's hidden transaction fees?",
    answer:
      "If you use Shopify Payments, you pay only standard credit card processing (2.9% + $0.30 on the Basic plan). However, if you choose to use an external payment gateway (like an external PayPal or Authorize.net) instead of Shopify Payments, Shopify charges an additional 2.0% transaction penalty on the Basic plan.",
  },
  {
    question: "Can I run both Etsy and Shopify simultaneously?",
    answer:
      "Yes! Millions of sellers run both simultaneously. You can use inventory syncing software to ensure product quantities update automatically on both channels when an order takes place.",
  },
];

export default function ShopifyComparisonPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="hover:text-slate-900">Calculators</span>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-900">Shopify vs. Etsy Calculator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold mb-3">
          <Scale className="h-3.5 w-3.5 text-purple-600" />
          <span>E-Commerce Migration Analytics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Shopify vs. Etsy Fee Comparison Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Should you keep paying Etsy&apos;s 9.5%+ fee cuts or move to a self-hosted Shopify store? Enter your monthly sales volume to uncover your exact cost differences and break-even point.
        </p>
      </div>

      {/* Top Ad */}
      <AdBanner slot="comp-top-banner" format="horizontal" />

      {/* Calculator */}
      <section className="mb-12">
        <ShopifyComparisonCalculator />
      </section>

      {/* Mid Content Ad */}
      <AdBanner slot="comp-mid-banner" format="auto" />

      {/* Editorial Content */}
      <article className="prose prose-slate max-w-none my-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900">
          The True Trade-Off: Marketplace Traffic vs. Platform Autonomy
        </h2>
        <p>
          When you sell on Etsy, you pay for access to an active marketplace with over 90 million global buyers. In exchange, Etsy extracts an effective 9.5% to 12% cut from every order (or up to 25%+ if offsite advertising triggered the sale).
        </p>
        <p>
          On Shopify, you pay a flat monthly subscription ($39/mo for Basic) and standard credit card rates (2.9% + $0.30). At $3,000 in monthly sales, Etsy takes approximately $290 to $350 in fees, whereas Shopify takes only around $135—saving you more than $1,800 every year in platform fees.
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          The Hybrid Strategy (Best of Both Worlds)
        </h3>
        <p>
          Rather than quitting Etsy cold-turkey, the highest-earning e-commerce operators use a two-step multichannel strategy:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Acquire on Etsy:</strong> Use Etsy search and discoverability to attract first-time customers without spending heavy upfront marketing dollars.
          </li>
          <li>
            <strong>Retain on Shopify:</strong> Insert a branded postcard or care guide with a 15% discount code into every order packaging, encouraging repeat orders on your dedicated Shopify store where you keep 97% of the revenue.
          </li>
        </ol>
      </article>

      {/* FAQ */}
      <FAQAccordion items={comparisonFAQs} />

      {/* Bottom Ad */}
      <AdBanner slot="comp-bottom-banner" format="horizontal" />
    </div>
  );
}

