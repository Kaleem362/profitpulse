"use client";

import React, { useState, useMemo } from "react";
import { 
  DollarSign, 
  Percent, 
  RotateCcw, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";
import { CURRENCIES, formatCurrency } from "@/lib/currencies";

const ETSY_PRESETS = [
  { label: "☕ Ceramic Mug", price: 28.00, cost: 7.50, shipCharged: 5.50, shipCost: 5.20, pack: 1.20 },
  { label: "👕 POD Graphic Tee", price: 34.00, cost: 14.50, shipCharged: 4.99, shipCost: 4.50, pack: 0.50 },
  { label: "📁 Digital Planner (100% Margin)", price: 15.00, cost: 0.00, shipCharged: 0.00, shipCost: 0.00, pack: 0.00 },
  { label: "💍 Custom Jewelry", price: 68.00, cost: 16.00, shipCharged: 4.50, shipCost: 4.00, pack: 2.50 },
];

export default function EtsyCalculator() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [itemPrice, setItemPrice] = useState<number>(35.00);
  const [itemCost, setItemCost] = useState<number>(10.00);
  const [shippingCharged, setShippingCharged] = useState<number>(4.99);
  const [shippingCost, setShippingCost] = useState<number>(4.50);
  const [packagingCost, setPackagingCost] = useState<number>(1.50);
  const [adsSpend, setAdsSpend] = useState<number>(0);
  const [offsiteAdsRate, setOffsiteAdsRate] = useState<number>(0); // 0, 12, 15
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const calculations = useMemo(() => {
    const validPrice = Math.max(0, itemPrice || 0);
    const validCost = Math.max(0, itemCost || 0);
    const validShipCharged = Math.max(0, shippingCharged || 0);
    const validShipCost = Math.max(0, shippingCost || 0);
    const validPackCost = Math.max(0, packagingCost || 0);
    const validAds = Math.max(0, adsSpend || 0);

    const revenue = validPrice + validShipCharged;
    
    // Etsy Listing Fee: $0.20
    const listingFee = revenue > 0 ? 0.20 : 0;

    // Etsy Transaction Fee: 6.5% on (Item Price + Shipping Charged)
    const transactionFee = revenue * 0.065;

    // Payment Processing Fee: 3.0% + $0.25 on total buyer payment
    const paymentProcessingFee = revenue > 0 ? (revenue * 0.03) + 0.25 : 0;

    // Offsite Ads: percentage on total revenue if order originated via offsite ad
    const offsiteAdsFee = revenue * (offsiteAdsRate / 100);

    // Total Platform Fees
    const totalEtsyFees = listingFee + transactionFee + paymentProcessingFee + offsiteAdsFee;

    // Total Direct Costs
    const totalCosts = validCost + validShipCost + validPackCost + validAds;

    // Net Profit & Margins
    const netProfit = revenue - totalEtsyFees - totalCosts;
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const totalExpense = totalEtsyFees + totalCosts;
    const roi = totalExpense > 0 ? (netProfit / totalExpense) * 100 : 0;

    // Break-even price calculation:
    const fixedFees = 0.20 + 0.25;
    const variableFeeRate = 0.065 + 0.03 + (offsiteAdsRate / 100);
    const breakEvenPrice = (totalCosts + fixedFees - (validShipCharged * (1 - variableFeeRate))) / Math.max(0.01, 1 - variableFeeRate);

    // Visual Percentage Distribution
    const profitPct = revenue > 0 ? Math.max(0, (netProfit / revenue) * 100) : 0;
    const feesPct = revenue > 0 ? Math.min(100, (totalEtsyFees / revenue) * 100) : 0;
    const materialPct = revenue > 0 ? Math.min(100, (validCost / revenue) * 100) : 0;
    const shippingPct = revenue > 0 ? Math.min(100, ((validShipCost + validPackCost) / revenue) * 100) : 0;

    return {
      revenue,
      listingFee,
      transactionFee,
      paymentProcessingFee,
      offsiteAdsFee,
      totalEtsyFees,
      totalCosts,
      netProfit,
      profitMargin,
      roi,
      breakEvenPrice: Math.max(0, breakEvenPrice),
      feePercentageOfRevenue: revenue > 0 ? (totalEtsyFees / revenue) * 100 : 0,
      distribution: {
        profit: profitPct,
        fees: feesPct,
        material: materialPct,
        shipping: shippingPct,
      },
    };
  }, [itemPrice, itemCost, shippingCharged, shippingCost, packagingCost, adsSpend, offsiteAdsRate]);

  const handleApplyPreset = (preset: typeof ETSY_PRESETS[0]) => {
    setItemPrice(preset.price);
    setItemCost(preset.cost);
    setShippingCharged(preset.shipCharged);
    setShippingCost(preset.shipCost);
    setPackagingCost(preset.pack);
    setAdsSpend(0);
    setOffsiteAdsRate(0);
  };

  const handleReset = () => {
    setItemPrice(35.00);
    setItemCost(10.00);
    setShippingCharged(4.99);
    setShippingCost(4.50);
    setPackagingCost(1.50);
    setAdsSpend(0);
    setOffsiteAdsRate(0);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyBreakdown = () => {
    const text = `Etsy Profit Breakdown:
- Sale Price: ${formatCurrency(itemPrice, currency.symbol)}
- Shipping Charged: ${formatCurrency(shippingCharged, currency.symbol)}
- Total Revenue: ${formatCurrency(calculations.revenue, currency.symbol)}
- Total Etsy Fees: ${formatCurrency(calculations.totalEtsyFees, currency.symbol)} (${calculations.feePercentageOfRevenue.toFixed(1)}%)
- Production & Shipping Costs: ${formatCurrency(calculations.totalCosts, currency.symbol)}
-----------------------
- NET PROFIT: ${formatCurrency(calculations.netProfit, currency.symbol)}
- PROFIT MARGIN: ${calculations.profitMargin.toFixed(1)}%
- BREAK-EVEN PRICE: ${formatCurrency(calculations.breakEvenPrice, currency.symbol)}
Calculated with ProfitPulse.io`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Top Header / Currency Switcher */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 p-4 sm:px-6 gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            2026 Etsy Fee Rules Active
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="currency-select" className="text-xs font-medium text-slate-500">
            Currency:
          </label>
          <select
            id="currency-select"
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
            title="Reset to default values"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Quick One-Click Presets Bar */}
      <div className="border-b border-slate-100 bg-slate-50/40 px-4 py-2.5 sm:px-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-amber-500" />
          Quick Presets:
        </span>
        {ETSY_PRESETS.map((preset) => (
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
        {/* Left Inputs Section (7 Cols) */}
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Pricing & Cost Variables
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sale Price */}
            <div>
              <label htmlFor="itemPrice" className="block text-xs font-semibold text-slate-700 mb-1">
                Item Listing Price ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="itemPrice"
                  step="0.01"
                  min="0"
                  value={itemPrice === 0 ? "" : itemPrice}
                  onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Item Cost */}
            <div>
              <label htmlFor="itemCost" className="block text-xs font-semibold text-slate-700 mb-1">
                Item Production / Material Cost ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="itemCost"
                  step="0.01"
                  min="0"
                  value={itemCost === 0 ? "" : itemCost}
                  onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Shipping Charged */}
            <div>
              <label htmlFor="shippingCharged" className="block text-xs font-semibold text-slate-700 mb-1">
                Shipping Charged to Buyer ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="shippingCharged"
                  step="0.01"
                  min="0"
                  value={shippingCharged === 0 ? "" : shippingCharged}
                  onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                  placeholder="0.00 (Free Shipping)"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Leave blank or enter 0 if offering Free Shipping.</p>
            </div>

            {/* Actual Shipping Cost */}
            <div>
              <label htmlFor="shippingCost" className="block text-xs font-semibold text-slate-700 mb-1">
                Actual Postage Cost Paid by You ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="shippingCost"
                  step="0.01"
                  min="0"
                  value={shippingCost === 0 ? "" : shippingCost}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Packaging / Prep Cost */}
            <div>
              <label htmlFor="packagingCost" className="block text-xs font-semibold text-slate-700 mb-1">
                Packaging / Label Cost ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="packagingCost"
                  step="0.01"
                  min="0"
                  value={packagingCost === 0 ? "" : packagingCost}
                  onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Optional Ad Spend */}
            <div>
              <label htmlFor="adsSpend" className="block text-xs font-semibold text-slate-700 mb-1">
                Etsy On-Site Ads Cost/Item ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="adsSpend"
                  step="0.01"
                  min="0"
                  value={adsSpend === 0 ? "" : adsSpend}
                  onChange={(e) => setAdsSpend(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Offsite Ads Selection */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Etsy Offsite Ads Fee
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "None (0%)", val: 0 },
                { label: "Standard (15%)", val: 15 },
                { label: "High Volume (12%)", val: 12 },
              ].map((tier) => (
                <button
                  key={tier.val}
                  type="button"
                  onClick={() => setOffsiteAdsRate(tier.val)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition ${
                    offsiteAdsRate === tier.val
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Etsy charges 15% (or 12% if your store made over $10,000 in the past 12 months) when an order is made through an offsite Google/Bing ad.
            </p>
          </div>
        </div>

        {/* Right Output & Summary Section (5 Cols) */}
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Profit Summary
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-md transition shadow-2xs hover:bg-slate-50"
                  title="Print or Save PDF report"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleCopyBreakdown}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md transition border border-emerald-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Report"}
                </button>
              </div>
            </div>

            {/* Net Profit Hero Display */}
            <div className={`rounded-xl p-5 border text-center transition-all ${
              calculations.netProfit > 0
                ? "bg-emerald-50/90 border-emerald-200 text-emerald-950"
                : calculations.netProfit === 0
                ? "bg-slate-50 border-slate-200 text-slate-700"
                : "bg-rose-50 border-rose-200 text-rose-950"
            }`}>
              <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
                Estimated Net Profit
              </span>
              <div className="text-4xl font-black tracking-tight my-1">
                {formatCurrency(calculations.netProfit, currency.symbol)}
              </div>
              <div className="flex items-center justify-center gap-4 text-xs font-semibold mt-2">
                <span className={calculations.netProfit > 0 ? "text-emerald-700" : "text-rose-700"}>
                  Margin: {calculations.profitMargin.toFixed(1)}%
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">
                  ROI: {calculations.roi.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Profit Health Badge & Advice */}
            <div className="mt-3">
              {calculations.netProfit <= 0 ? (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-100/70 border border-rose-200 text-rose-800 text-xs">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                  <div>
                    <strong>Unprofitable Product:</strong> Increase your sale price to at least{" "}
                    <strong>{formatCurrency(calculations.breakEvenPrice, currency.symbol)}</strong> to break even.
                  </div>
                </div>
              ) : calculations.profitMargin < 20 ? (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-800 text-xs">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <strong>Slim Margin Warning:</strong> An unexpected refund or offsite ad could push this product into a loss. Target 30%+ margin.
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <strong>Healthy Unit Economics:</strong> Excellent profit margin. You have healthy buffer for marketing and packaging.
                  </div>
                </div>
              )}
            </div>

            {/* Visual Revenue Distribution Progress Bar */}
            {calculations.revenue > 0 && (
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Revenue Breakdown</span>
                  <span>{formatCurrency(calculations.revenue, currency.symbol)}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.profit)}%` }} 
                    className="bg-emerald-500 transition-all duration-300"
                    title={`Profit: ${calculations.distribution.profit.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.fees)}%` }} 
                    className="bg-rose-500 transition-all duration-300"
                    title={`Etsy Fees: ${calculations.distribution.fees.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.material)}%` }} 
                    className="bg-slate-400 transition-all duration-300"
                    title={`Material: ${calculations.distribution.material.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.shipping)}%` }} 
                    className="bg-sky-400 transition-all duration-300"
                    title={`Shipping: ${calculations.distribution.shipping.toFixed(1)}%`}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Profit ({calculations.distribution.profit.toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span> Fees ({calculations.distribution.fees.toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span> Cost ({calculations.distribution.material.toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-sky-400"></span> Ship ({calculations.distribution.shipping.toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}

            {/* Detailed Fee Line-Item Breakdown */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Gross Buyer Payment:</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(calculations.revenue, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Etsy Listing Fee:</span>
                <span className="font-medium text-rose-600">
                  -{formatCurrency(calculations.listingFee, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Transaction Fee (6.5%):</span>
                <span className="font-medium text-rose-600">
                  -{formatCurrency(calculations.transactionFee, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Payment Processing (3% + 0.25):</span>
                <span className="font-medium text-rose-600">
                  -{formatCurrency(calculations.paymentProcessingFee, currency.symbol)}
                </span>
              </div>

              {calculations.offsiteAdsFee > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Offsite Ads Fee ({offsiteAdsRate}%):</span>
                  <span className="font-medium text-rose-600">
                    -{formatCurrency(calculations.offsiteAdsFee, currency.symbol)}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-100 font-semibold">
                <span className="text-slate-800">Total Etsy Fees ({calculations.feePercentageOfRevenue.toFixed(1)}%):</span>
                <span className="text-rose-700">
                  -{formatCurrency(calculations.totalEtsyFees, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Item & Shipping Costs:</span>
                <span className="font-medium text-slate-800">
                  -{formatCurrency(calculations.totalCosts, currency.symbol)}
                </span>
              </div>
            </div>
          </div>

          {/* Break-even badge */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Break-Even Listing Price:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                {formatCurrency(calculations.breakEvenPrice, currency.symbol)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Minimum listing price required to avoid losing money with current costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
