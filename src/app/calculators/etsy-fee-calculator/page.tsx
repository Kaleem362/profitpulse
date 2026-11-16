import React from "react";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Info, CheckCircle2 } from "lucide-react";
import EtsyCalculator from "@/components/calculators/EtsyCalculator";
import AdBanner from "@/components/AdBanner";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata = {
  title: "Etsy Fee & Profit Calculator (2026 Updated) - Calculate Net Margins",
  description:
    "Free 2026 Etsy fee calculator. Calculate exact listing fees ($0.20), 6.5% transaction cuts, payment processing, offsite ads, and break-even pricing.",
  keywords: [
    "etsy fee calculator",
    "etsy profit calculator",
    "etsy transaction fee 2026",
    "etsy offsite ads fee",
    "calculate etsy net profit",
  ],
};

const etsyFAQs: FAQItem[] = [
  {
    question: "What is the exact Etsy fee structure in 2026?",
    answer:
      "In 2026, Etsy charges: 1) A $0.20 listing fee per item (renews every 4 months or upon sale); 2) A 6.5% transaction fee on the total sale price (including buyer-paid shipping and gift wrap); 3) A payment processing fee (in the US, 3% + $0.25 per transaction); and 4) An optional or mandatory 12% to 15% offsite advertising fee if the customer purchased via an external Google or Bing advertisement.",
  },
  {
    question: "Does Etsy charge transaction fees on shipping?",
    answer:
      "Yes. Etsy applies its 6.5% transaction fee to both the item price and the shipping amount charged to the buyer. If you charge $5.00 for shipping, Etsy takes $0.33 of that shipping fee.",
  },
  {
    question: "When are Etsy Offsite Ads mandatory?",
    answer:
      "If your Etsy shop makes more than $10,000 USD in gross sales over any trailing 12-month period, Offsite Ads become mandatory for the lifetime of your shop at a discounted rate of 12%. If your shop has made less than $10,000, you can opt out in your Shop Settings, or pay 15% only when a sale is directly driven by an offsite ad.",
  },
  {
    question: "How do I calculate my Etsy break-even price?",
    answer:
      "Use our calculator above or apply this formula: Break-Even = (Material Cost + Shipping Paid + Packaging + $0.45) / (1 - 0.095). This accounts for both the 6.5% transaction fee, 3% processing fee, and the combined $0.45 fixed fees ($0.20 listing + $0.25 payment fixed).",
  },
];

export default function EtsyCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="hover:text-slate-900">Calculators</span>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-900">Etsy Fee Calculator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-3">
          <ShoppingBag className="h-3.5 w-3.5 text-orange-600" />
          <span>Updated for 2026 Etsy Seller Policies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Etsy Profit & Fee Calculator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Accurately calculate your real take-home earnings on Etsy after all cuts: the 6.5% transaction fee, $0.20 listing renewal, payment processing, postage, and offsite ad rates.
        </p>
      </div>

      {/* Top Ad */}
      <AdBanner slot="etsy-top-banner" format="horizontal" />

      {/* Interactive Tool */}
      <section className="mb-12">
        <EtsyCalculator />
      </section>

      {/* Mid Content Ad */}
      <AdBanner slot="etsy-mid-banner" format="auto" />

      {/* Editorial & Formula Guide (AdSense EEAT Value) */}
      <article className="prose prose-slate max-w-none my-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-black text-slate-900">
          Understanding the 2026 Etsy Fee Structure
        </h2>
        <p>
          Selling handmade crafts, vintage goods, or digital downloads on Etsy is one of the most popular ways to launch an online business. However, many makers discover that while their gross sales look healthy, their actual bank account deposits are surprisingly low. The reason? A compound stack of four distinct platform charges.
        </p>

        {/* 2026 Fee Schedule Table */}
        <div className="overflow-x-auto my-6 not-prose">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-800 font-bold">
                <th className="py-3 px-4">Fee Component</th>
                <th className="py-3 px-4">Amount / Rate</th>
                <th className="py-3 px-4">What It Applies To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Listing Fee</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">$0.20 USD</td>
                <td className="py-3 px-4 text-slate-600">Per item published; renews every 4 months or upon sale.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Transaction Fee</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">6.5%</td>
                <td className="py-3 px-4 text-slate-600">Total order amount, including shipping charged & gift wrap.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Payment Processing</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">3.0% + $0.25</td>
                <td className="py-3 px-4 text-slate-600">Total charge amount paid by the customer (US rate).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Offsite Ads (Optional / Mandatory)</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">12% or 15%</td>
                <td className="py-3 px-4 text-slate-600">Applied only to sales driven by Google, Bing, or social ads.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          How to Maximize Your Etsy Profit Margin
        </h3>
        <p>
          To maintain a healthy 30% to 50% net profit margin on Etsy, top sellers employ three key pricing strategies:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Bake Shipping Into Item Price:</strong> While offering &quot;Free Shipping&quot; appeals to buyers, remember that Etsy takes a 6.5% cut of shipping regardless. By calculating total cost upfront and offering bundles, you soften the impact of per-order fixed fees.
          </li>
          <li>
            <strong>Protect Against Offsite Ads:</strong> Assume that at least 15% of your orders might come through external advertising. If your net margin is only 10%, an offsite ad will cause you to sell that product at a financial loss.
          </li>
          <li>
            <strong>Monitor Material and Packaging Inflation:</strong> Keep updated records of boxes, bubble wrap, custom tape, and thank-you cards. A $1.50 packaging cost on a $15 item is a 10% profit drain.
          </li>
        </ul>
      </article>

      {/* FAQ Section */}
      <FAQAccordion items={etsyFAQs} />

      {/* Bottom Ad */}
      <AdBanner slot="etsy-bottom-banner" format="horizontal" />
    </div>
  );
}

