import React from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Percent, 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap
} from "lucide-react";
import EtsyCalculator from "@/components/calculators/EtsyCalculator";
import AdBanner from "@/components/AdBanner";
import FAQAccordion, { FAQItem } from "@/components/FAQAccordion";

export const metadata = {
  title: "ProfitPulse - Free E-Commerce & Freelancer Profit Calculators (2026)",
  description:
    "Free precision fee calculators for Etsy sellers, eBay flippers, Stripe/PayPal merchants, and freelancers. Calculate true net profit and break-even sales instantly.",
};

const homeFAQs: FAQItem[] = [
  {
    question: "Why do I need a specialized profit calculator instead of a regular spreadsheet?",
    answer:
      "Most online platforms like Etsy and eBay apply fee percentages to the total transaction value (including buyer-paid shipping and sales tax), rather than just your item price. Additionally, flat per-order fees ($0.20 to $0.40) and payment processing cuts quickly erode low-ticket profit margins. ProfitPulse automatically incorporates the newest 2026 platform rules and calculates your exact break-even point with zero spreadsheet formulas required.",
  },
  {
    question: "Are these calculations updated for the latest 2026 fee schedules?",
    answer:
      "Yes. Our formulas reflect Etsy's 6.5% transaction fee + 3.0%+$0.25 payment processing, eBay's managed payments category rate cards, Stripe's standard 2.9%+$0.30, and PayPal's 3.49%+$0.49 invoicing fee schedules.",
  },
  {
    question: "Is ProfitPulse completely free to use?",
    answer:
      "100% free with no registration, no email capture, and no usage limits. We support our server costs through non-intrusive banner advertisements.",
  },
  {
    question: "How do I calculate my break-even price?",
    answer:
      "Break-even price is the exact listing price where your gross revenue equals your combined platform fees, postage, packaging, and product acquisition cost. Any price above your break-even point produces profit; anything below produces an out-of-pocket loss.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Billboard Ad Placement */}
      <AdBanner slot="home-top-billboard" format="horizontal" />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto pt-6 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
          <Zap className="h-3.5 w-3.5 text-emerald-600" />
          <span>Updated for 2026 E-Commerce & Creator Fees</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Stop Guessing Your Profits. <br />
          <span className="text-emerald-600">Calculate Exact Take-Home Income.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Free, instant fee calculators for Etsy makers, eBay resellers, Stripe merchants, and freelancers. Uncover hidden transaction cuts and price with confidence.
        </p>

        {/* Quick Links Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <a
            href="#featured-tool"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
          >
            Featured: Etsy Calculator
          </a>
          <Link
            href="/calculators/ebay-fee-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
          >
            eBay Fees
          </Link>
          <Link
            href="/calculators/stripe-fee-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
          >
            Stripe & PayPal
          </Link>
          <Link
            href="/calculators/freelance-hourly-rate-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
          >
            Freelancer Day-Rate
          </Link>
        </div>
      </div>

      {/* Featured Interactive Calculator Section */}
      <section id="featured-tool" className="mb-14 scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Interactive Etsy Profit & Fee Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Tweak item price, packaging costs, and shipping to see live net profit margins.
            </p>
          </div>
          <Link
            href="/calculators/etsy-fee-calculator"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            Full Page View <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <EtsyCalculator />
      </section>

      {/* In-Content Ad Placement */}
      <AdBanner slot="home-mid-banner" format="auto" />

      {/* Suite of Tools Grid */}
      <section className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Dedicated Calculators for Every Seller
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Select a specialized tool designed specifically for your sales channel or business model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Etsy */}
          <Link
            href="/calculators/etsy-fee-calculator"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 mb-4 group-hover:scale-105 transition">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition">
                Etsy Profit & Fee Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Includes 6.5% transaction cuts, 3%+$0.25 payment processing, listing fees, and offsite ad rates.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-emerald-600">
              Calculate Etsy Margin <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2: eBay */}
          <Link
            href="/calculators/ebay-fee-calculator"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4 group-hover:scale-105 transition">
                <Percent className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                eBay Final Value Fee Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Category-based rates (computers, musical instruments, media, clothing), Promoted Listings ads, and store discounts.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-600">
              Calculate eBay Margin <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3: Stripe & PayPal */}
          <Link
            href="/calculators/stripe-fee-calculator"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-indigo-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-105 transition">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                Stripe & PayPal Merchant Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Includes reverse invoice calculator (&quot;How much to bill?&quot;) and international currency surcharge rules.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-indigo-600">
              Calculate Payouts <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4: Freelancer */}
          <Link
            href="/calculators/freelance-hourly-rate-calculator"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4 group-hover:scale-105 transition">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition">
                Freelance Hourly Rate & Day Rate
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Reverse engineer your ideal rate based on take-home goals, unpaid vacations, overhead, and self-employment tax.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-emerald-600">
              Calculate Hourly Rate <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 5: Shopify vs Etsy */}
          <Link
            href="/calculators/shopify-vs-etsy-calculator"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4 group-hover:scale-105 transition">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition">
                Shopify vs. Etsy Break-Even
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Determine the exact monthly gross revenue threshold where hosting your own store saves money over marketplace cuts.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-purple-600">
              Compare Platform Costs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Trust Box */}
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-6 flex flex-col justify-between">
            <div>
              <ShieldCheck className="h-8 w-8 text-emerald-600 mb-3" />
              <h4 className="text-base font-bold text-slate-900">Why Transparent Calculations Matter</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Over 42% of online sellers underestimate platform cuts by ignoring buyer shipping surcharges and payment handling fees. ProfitPulse helps you price for genuine sustainable profitability.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-4 text-xs font-semibold text-slate-700 hover:text-emerald-600 underline"
            >
              Read our calculation methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Content Section (Crucial for AdSense & EEAT) */}
      <section className="my-16 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-4">
          How to Protect Your Margins: The 3 Rules of Marketplace Selling
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">1</span>
              Factor Buyer-Paid Shipping
            </h3>
            <p className="text-xs">
              Both Etsy and eBay charge transaction fees on the <em>combined total</em> of item price plus shipping charged to the buyer. If you charge $10 shipping and spend $10 on postage, you actually lose money because the marketplace takes up to $1.30 of that postage.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">2</span>
              Beware of Fixed Per-Order Fees
            </h3>
            <p className="text-xs">
              Fixed fees ($0.20 on Etsy, $0.40 on eBay, $0.30 to $0.49 on payment gateways) disproportionately hurt low-ticket items. On a $5 sale, a 40¢ fee is an immediate 8% loss before percentage cuts even apply. Consider bundling items into multi-packs to lift your average order value (AOV).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">3</span>
              Track Offsite Ad Attribution
            </h3>
            <p className="text-xs">
              Etsy offsite ads add an extra 12% to 15% surcharge whenever a buyer clicks a Google or Bing ad within 30 days of purchasing. If your gross margin is only 20%, an offsite ad will completely wipe out your profit on that sale.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section with JSON-LD Schema */}
      <FAQAccordion items={homeFAQs} />

      {/* Bottom Ad Placement */}
      <AdBanner slot="home-bottom-banner" format="horizontal" />
    </div>
  );
}

