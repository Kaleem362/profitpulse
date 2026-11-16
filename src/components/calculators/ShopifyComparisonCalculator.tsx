"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw, Copy, Check, Printer, TrendingUp, Scale, Sparkles } from "lucide-react";
import { CURRENCIES, formatCurrency } from "@/lib/currencies";

const VOLUME_PRESETS = [
  { label: "🌱 Boutique Hobbyist", orders: 35, aov: 32 },
  { label: "🛍️ Growing Brand", orders: 160, aov: 48 },
  { label: "🚀 High-Volume Store", orders: 650, aov: 55 },
];

export default function ShopifyComparisonCalculator() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(120);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(45.00);
  const [shopifyPlan, setShopifyPlan] = useState<"basic" | "regular">("basic");
  const [copied, setCopied] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const validOrders = Math.max(0, monthlyOrders || 0);
    const validAOV = Math.max(0, averageOrderValue || 0);
    const monthlyGrossRevenue = validOrders * validAOV;

    // Etsy Costs:
    const etsyListingFees = validOrders * 0.20;
    const etsyTransactionFees = monthlyGrossRevenue * 0.065;
    const etsyPaymentFees = (monthlyGrossRevenue * 0.03) + (validOrders * 0.25);
    const totalEtsyMonthlyCost = validOrders > 0 ? etsyListingFees + etsyTransactionFees + etsyPaymentFees : 0;
    const etsyEffectiveRate = monthlyGrossRevenue > 0 ? (totalEtsyMonthlyCost / monthlyGrossRevenue) * 100 : 0;

    // Shopify Costs:
    const planFee = shopifyPlan === "basic" ? 39.00 : 105.00;
    const paymentRate = shopifyPlan === "basic" ? 0.029 : 0.027;
    const paymentFixed = 0.30;
    const shopifyPaymentFees = (monthlyGrossRevenue * paymentRate) + (validOrders * paymentFixed);
    const totalShopifyMonthlyCost = planFee + (validOrders > 0 ? shopifyPaymentFees : 0);
    const shopifyEffectiveRate = monthlyGrossRevenue > 0 ? (totalShopifyMonthlyCost / monthlyGrossRevenue) * 100 : 0;

    // Difference (Etsy Cost - Shopify Cost)
    const monthlySavingsWithShopify = totalEtsyMonthlyCost - totalShopifyMonthlyCost;

    // Break-even revenue calculation where Shopify cost == Etsy cost:
    const netPerOrderDiff = 0.30 - (0.20 + 0.25); // -0.15
    const breakEvenMonthlyRevenue = (planFee + (validOrders * netPerOrderDiff)) / Math.max(0.01, 0.095 - paymentRate);

    return {
      monthlyGrossRevenue,
      totalEtsyMonthlyCost,
      etsyEffectiveRate,
      totalShopifyMonthlyCost,
      shopifyEffectiveRate,
      monthlySavingsWithShopify,
      breakEvenMonthlyRevenue: Math.max(0, breakEvenMonthlyRevenue),
      winner: monthlySavingsWithShopify > 0 ? "shopify" : "etsy",
    };
  }, [monthlyOrders, averageOrderValue, shopifyPlan]);

  const handleApplyPreset = (preset: typeof VOLUME_PRESETS[0]) => {
    setMonthlyOrders(preset.orders);
    setAverageOrderValue(preset.aov);
  };

  const handleReset = () => {
    setMonthlyOrders(120);
    setAverageOrderValue(45.00);
    setShopifyPlan("basic");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopy = () => {
    const text = `Etsy vs. Shopify Fee Comparison:
- Monthly Volume: ${monthlyOrders} orders at ${formatCurrency(averageOrderValue, currency.symbol)} AOV
- Gross Monthly Sales: ${formatCurrency(calculations.monthlyGrossRevenue, currency.symbol)}
- Etsy Total Monthly Fees: ${formatCurrency(calculations.totalEtsyMonthlyCost, currency.symbol)} (${calculations.etsyEffectiveRate.toFixed(1)}%)
- Shopify Total Monthly Cost: ${formatCurrency(calculations.totalShopifyMonthlyCost, currency.symbol)} (${calculations.shopifyEffectiveRate.toFixed(1)}%)
-----------------------
- VERDICT: ${calculations.winner === "shopify" ? `Shopify saves you ${formatCurrency(calculations.monthlySavingsWithShopify, currency.symbol)}/month` : `Etsy is cheaper by ${formatCurrency(Math.abs(calculations.monthlySavingsWithShopify), currency.symbol)}/month`}
- BREAK-EVEN INFLECTION: ~${formatCurrency(calculations.breakEvenMonthlyRevenue, currency.symbol, 0)}/mo
Calculated with ProfitPulse.io`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 p-4 sm:px-6 gap-3">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Platform Migration Break-Even Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="comp-curr" className="text-xs font-medium text-slate-500">
            Currency:
          </label>
          <select
            id="comp-curr"
            value={currency.code}
            onChange={(e) => {
              const found = CURRENCIES.find((c) => c.code === e.target.value);
              if (found) setCurrency(found);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Presets Bar */}
      <div className="border-b border-slate-100 bg-slate-50/40 px-4 py-2.5 sm:px-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-emerald-500" />
          Sales Scales:
        </span>
        {VOLUME_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition shadow-2xs"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Inputs (6 Cols) */}
        <div className="p-6 sm:p-8 lg:col-span-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">
            Store Sales Volume
          </h2>

          <div className="space-y-4">
            {/* Monthly orders */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <label htmlFor="orders-input">Monthly Orders Shipped</label>
                <span className="font-bold text-slate-900">{monthlyOrders} orders</span>
              </div>
              <input
                type="range"
                id="orders-input"
                min="5"
                max="1000"
                step="5"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(parseInt(e.target.value) || 5)}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Average Order Value */}
            <div>
              <label htmlFor="aov" className="block text-xs font-semibold text-slate-700 mb-1">
                Average Order Value (AOV) ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="aov"
                  step="1"
                  min="0"
                  value={averageOrderValue === 0 ? "" : averageOrderValue}
                  onChange={(e) => setAverageOrderValue(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Projected Gross Revenue display */}
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Projected Gross Monthly Sales:</span>
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(calculations.monthlyGrossRevenue, currency.symbol)}
              </span>
            </div>

            {/* Shopify Plan selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Shopify Subscription Plan
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShopifyPlan("basic")}
                  className={`p-3 rounded-xl border text-left transition ${
                    shopifyPlan === "basic"
                      ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold block text-slate-900">Basic Shopify</span>
                  <span className="text-[11px] text-slate-500">$39/mo + 2.9% & 30¢</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShopifyPlan("regular")}
                  className={`p-3 rounded-xl border text-left transition ${
                    shopifyPlan === "regular"
                      ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-bold block text-slate-900">Shopify (Regular)</span>
                  <span className="text-[11px] text-slate-500">$105/mo + 2.7% & 30¢</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output & Comparison (6 Cols) */}
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Monthly Cost Comparison
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-md transition shadow-2xs hover:bg-slate-50"
                  title="Print comparison"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md transition border border-emerald-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Report"}
                </button>
              </div>
            </div>

            {/* Verdict Card */}
            <div className={`rounded-xl p-5 border text-center transition-all ${
              calculations.winner === "shopify"
                ? "bg-emerald-50/90 border-emerald-200 text-emerald-950"
                : "bg-amber-50/90 border-amber-200 text-amber-950"
            }`}>
              <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
                {calculations.winner === "shopify" ? "Shopify Is More Cost Effective" : "Etsy Is Currently Cheaper"}
              </span>
              <div className="text-3xl font-black tracking-tight my-1">
                {calculations.winner === "shopify"
                  ? `Save ${formatCurrency(calculations.monthlySavingsWithShopify, currency.symbol)}/mo`
                  : `Save ${formatCurrency(Math.abs(calculations.monthlySavingsWithShopify), currency.symbol)}/mo on Etsy`}
              </div>
              <p className="text-xs mt-1 opacity-90">
                {calculations.winner === "shopify"
                  ? `At ${formatCurrency(calculations.monthlyGrossRevenue, currency.symbol)}/mo sales, Shopify saves you money even after paying the monthly subscription.`
                  : `At lower order volumes, Etsy's zero monthly subscription fee keeps your operational overhead lower.`}
              </p>
            </div>

            {/* Side-by-Side Breakdown */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Etsy column */}
              <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wide block">
                  Etsy Total
                </span>
                <div className="text-xl font-bold text-slate-900 my-1">
                  {formatCurrency(calculations.totalEtsyMonthlyCost, currency.symbol)}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Effective Fee: {calculations.etsyEffectiveRate.toFixed(1)}%
                </span>
              </div>

              {/* Shopify column */}
              <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide block">
                  Shopify Total
                </span>
                <div className="text-xl font-bold text-slate-900 my-1">
                  {formatCurrency(calculations.totalShopifyMonthlyCost, currency.symbol)}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Effective Fee: {calculations.shopifyEffectiveRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Break-Even Inflection Sales:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                ~{formatCurrency(calculations.breakEvenMonthlyRevenue, currency.symbol, 0)}/mo
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Once your store consistently grosses more than this, maintaining your own Shopify storefront is cheaper in platform fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
