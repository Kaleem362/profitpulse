import React from "react";
import Link from "next/link";
import { ChevronRight, Percent, Info } from "lucide-react";
import EbayCalculator from "@/components/calculators/EbayCalculator";
import AdBanner from "@/components/AdBanner";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata = {
  title: "eBay Fee & Net Profit Calculator (2026) - Final Value Fees",
  description:
    "Free 2026 eBay fee calculator. Calculate Final Value Fees (FVF), store subscriber discounts, promoted listings ad rates, and break-even flipper profits.",
  keywords: [
    "ebay fee calculator",
    "ebay final value fee 2026",
    "ebay profit calculator",
    "ebay flipper calculator",
    "ebay store fee rates",
  ],
};

const ebayFAQs: FAQItem[] = [
  {
    question: "What is eBay's standard Final Value Fee in 2026?",
    answer:
      "For most standard categories (clothing, home, toys), eBay charges 13.25% of the total sale amount (including buyer-paid shipping and sales tax) plus a $0.40 per-order fixed fee ($0.30 if the total sale is under $10).",
  },
  {
    question: "Do eBay Store subscribers pay lower fees?",
    answer:
      "Yes. If you have an active Basic, Premium, or Anchor eBay Store subscription, Final Value Fees in most general categories drop from 13.25% to 12.35%, and tech/electronics categories drop from 9.35% to 7.35%.",
  },
  {
    question: "How do Promoted Listings Standard ads work?",
    answer:
      "Promoted Listings Standard allows you to set an ad rate percentage (e.g. 2% to 15%). You only pay this fee if a buyer clicks on your promoted ad and purchases your item within 30 days. The fee is calculated on the total sale price including shipping.",
  },
  {
    question: "Does eBay charge fees on sales tax?",
    answer:
      "Yes. Under eBay's Managed Payments structure, the Final Value Fee percentage is applied to the gross payment, which includes state sales tax collected by eBay.",
  },
];

export default function EbayCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="hover:text-slate-900">Calculators</span>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-900">eBay Fee Calculator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
          <Percent className="h-3.5 w-3.5 text-blue-600" />
          <span>2026 eBay Managed Payments Schedule</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          eBay Final Value Fee & Profit Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Instantly calculate your net profit on eBay. Compare category-specific rates, calculate Promoted Listings ad costs, and see the exact impact of an eBay Store subscription.
        </p>
      </div>

      {/* Top Ad */}
      <AdBanner slot="ebay-top-banner" format="horizontal" />

      {/* Calculator */}
      <section className="mb-12">
        <EbayCalculator />
      </section>

      {/* Mid Content Ad */}
      <AdBanner slot="ebay-mid-banner" format="auto" />

      {/* Editorial & Formula Guide */}
      <article className="prose prose-slate max-w-none my-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900">
          How eBay Final Value Fees (FVF) Work
        </h2>
        <p>
          Unlike platforms that charge separate payment gateway fees, eBay consolidates seller payments under its Managed Payments system. A single Final Value Fee is deducted from each completed order. However, the exact percentage rate fluctuates heavily depending on the specific item category.
        </p>

        {/* Category Fee Table */}
        <div className="overflow-x-auto my-6 not-prose">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-800 font-bold">
                <th className="py-3 px-4">Item Category</th>
                <th className="py-3 px-4">Standard Rate</th>
                <th className="py-3 px-4">Store Subscriber Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Most Categories (Clothing, Home, Collectibles)</td>
                <td className="py-3 px-4 text-blue-700 font-bold">13.25% + $0.40</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">12.35% + $0.40</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Computers, Tablets, Smartphones & Electronics</td>
                <td className="py-3 px-4 text-blue-700 font-bold">9.35% + $0.40</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">7.35% + $0.40</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Guitars & Musical Instruments</td>
                <td className="py-3 px-4 text-blue-700 font-bold">6.35% + $0.40</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">5.35% + $0.40</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Books, DVDs, Movies & Music</td>
                <td className="py-3 px-4 text-blue-700 font-bold">14.95% + $0.40</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">14.35% + $0.40</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          When Does an eBay Store Subscription Pay for Itself?
        </h3>
        <p>
          A Basic eBay Store subscription costs approximately $27.95/month (billed monthly). Since a store subscription saves roughly 0.90% to 2.00% in Final Value Fees per transaction:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            In <strong>Electronics & Tech</strong>, an eBay Store pays for itself once your sales volume exceeds ~$1,400/month.
          </li>
          <li>
            In <strong>Standard Categories</strong>, you break even on the subscription cost once your monthly sales pass ~$3,100/month.
          </li>
          <li>
            Additionally, store subscribers receive 1,000 free insertion fee listings every month plus quarterly shipping supply coupons.
          </li>
        </ul>
      </article>

      {/* FAQ Section */}
      <FAQAccordion items={ebayFAQs} />

      {/* Bottom Ad */}
      <AdBanner slot="ebay-bottom-banner" format="horizontal" />
    </div>
  );
}

