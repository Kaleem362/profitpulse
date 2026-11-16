"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, 
  Menu, 
  X, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Briefcase, 
  Percent, 
  HelpCircle 
} from "lucide-react";

const navLinks = [
  { href: "/calculators/etsy-fee-calculator", label: "Etsy Calculator", icon: ShoppingBag },
  { href: "/calculators/ebay-fee-calculator", label: "eBay Calculator", icon: Percent },
  { href: "/calculators/stripe-fee-calculator", label: "Stripe & PayPal", icon: DollarSign },
  { href: "/calculators/freelance-hourly-rate-calculator", label: "Freelancer Rate", icon: Briefcase },
  { href: "/calculators/shopify-vs-etsy-calculator", label: "Shopify vs Etsy", icon: TrendingUp },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm transition group-hover:bg-emerald-500">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
              Profit<span className="text-emerald-600">Pulse</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-slate-400">
              E-COMMERCE & CREATOR TOOLS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition"
          >
            <HelpCircle className="h-4 w-4" />
            Methodology
          </Link>
          <Link
            href="/calculators/etsy-fee-calculator"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Calculate Profit
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4 text-emerald-600" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg"
            >
              About & Methodology
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg"
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

