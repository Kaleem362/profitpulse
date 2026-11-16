import React from "react";
import Link from "next/link";
import { Calculator, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Calculator className="h-4 w-4" />
              </div>
              <span>Profit<span className="text-emerald-400">Pulse</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision e-commerce fee formulas and income optimization tools designed for modern independent makers, sellers, and freelance professionals.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Updated for 2026 Fee Schedules</span>
            </div>
          </div>

          {/* Calculator Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/calculators/etsy-fee-calculator" className="hover:text-emerald-400 transition">
                  Etsy Fee & Profit Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/ebay-fee-calculator" className="hover:text-emerald-400 transition">
                  eBay Final Value Fee Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/stripe-fee-calculator" className="hover:text-emerald-400 transition">
                  Stripe & PayPal Fee Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/freelance-hourly-rate-calculator" className="hover:text-emerald-400 transition">
                  Freelance Rate & Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/shopify-vs-etsy-calculator" className="hover:text-emerald-400 transition">
                  Shopify vs. Etsy Break-Even
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Resources & Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  About Our Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition">
                  Financial Disclaimer
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition">
                  Fee Optimization Strategy
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / AdSense Trust */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Legal & Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition">
                  Earnings Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="border-t border-slate-800 pt-6 text-[11px] text-slate-500 leading-normal">
          <p className="mb-2">
            <strong>Disclaimer:</strong> ProfitPulse is an independent software utility and is not affiliated, endorsed, or associated with Etsy, Inc., eBay Inc., Stripe, Inc., PayPal, Inc., or Shopify Inc. All trademarked names and logos are property of their respective owners. Calculation results are estimates based on published platform fee schedules and do not constitute certified financial, tax, or legal advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-slate-400">
            <p>© {currentYear} ProfitPulse. All rights reserved.</p>
            <p className="flex items-center gap-1 text-slate-400">
              Built with precision for creators & sellers worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

