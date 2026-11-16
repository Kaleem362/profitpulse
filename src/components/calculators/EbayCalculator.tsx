"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw, Copy, Check, Printer, Percent, Sparkles, ShieldAlert, ShieldCheck } from "lucide-react";
import { CURRENCIES, formatCurrency } from "@/lib/currencies";

const EBAY_CATEGORIES = [
  { name: "Most Categories (Standard)", rate: 0.1325, storeRate: 0.1235 },
  { name: "Computers, Tablets & Networking", rate: 0.0935, storeRate: 0.0735 },
  { name: "Cell Phones & Smartphones", rate: 0.0935, storeRate: 0.0735 },
  { name: "Consumer Electronics", rate: 0.0935, storeRate: 0.0735 },
  { name: "Guitars & Musical Instruments", rate: 0.0635, storeRate: 0.0535 },
  { name: "Books, Movies & Music (Media)", rate: 0.1495, storeRate: 0.1435 },
  { name: "Clothing, Shoes & Accessories", rate: 0.1325, storeRate: 0.1235 },
  { name: "Jewelry & Watches (under $1k)", rate: 0.1500, storeRate: 0.1300 },
];

const EBAY_PRESETS = [
  { label: "👟 Sneakers", price: 120.00, cost: 45.00, shipCharged: 12.00, shipCost: 10.50, pack: 2.00, cat: 6 },
  { label: "📱 Refurbished Phone", price: 290.00, cost: 180.00, shipCharged: 9.99, shipCost: 8.50, pack: 2.50, cat: 2 },
  { label: "🎸 Vintage Guitar", price: 650.00, cost: 350.00, shipCharged: 45.00, shipCost: 40.00, pack: 8.00, cat: 4 },
  { label: "🧥 Vintage Jacket", price: 55.00, cost: 12.00, shipCharged: 8.50, shipCost: 7.20, pack: 1.50, cat: 6 },
];

export default function EbayCalculator() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [salePrice, setSalePrice] = useState<number>(65.00);
  const [itemCost, setItemCost] = useState<number>(20.00);
  const [shippingCharged, setShippingCharged] = useState<number>(8.50);
  const [shippingCost, setShippingCost] = useState<number>(7.20);
  const [packagingCost, setPackagingCost] = useState<number>(1.25);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [hasStoreSubscription, setHasStoreSubscription] = useState<boolean>(false);
  const [promotedAdRate, setPromotedAdRate] = useState<number>(0); // % e.g. 5%
  const [copied, setCopied] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const validPrice = Math.max(0, salePrice || 0);
    const validCost = Math.max(0, itemCost || 0);
    const validShipCharged = Math.max(0, shippingCharged || 0);
    const validShipCost = Math.max(0, shippingCost || 0);
    const validPack = Math.max(0, packagingCost || 0);

    const totalOrderRevenue = validPrice + validShipCharged;
    const selectedCategory = EBAY_CATEGORIES[categoryIndex] || EBAY_CATEGORIES[0];
    
    // Effective FVF rate based on store subscription
    const feeRate = hasStoreSubscription ? selectedCategory.storeRate : selectedCategory.rate;
    
    // Per-order fixed fee: $0.30 if under $10, otherwise $0.40
    const perOrderFee = totalOrderRevenue > 0 ? (totalOrderRevenue < 10.00 ? 0.30 : 0.40) : 0;

    // Final Value Fee (variable)
    const finalValueFee = (totalOrderRevenue * feeRate) + perOrderFee;

    // Promoted Listings Standard Ad Fee (calculated on total sale including shipping)
    const promotedFee = totalOrderRevenue * (promotedAdRate / 100);

    // Total eBay Fees
    const totalEbayFees = finalValueFee + promotedFee;

    // Direct Costs
    const totalDirectCosts = validCost + validShipCost + validPack;

    // Net Profit & Margins
    const netProfit = totalOrderRevenue - totalEbayFees - totalDirectCosts;
    const profitMargin = totalOrderRevenue > 0 ? (netProfit / totalOrderRevenue) * 100 : 0;
    const totalExpense = totalEbayFees + totalDirectCosts;
    const roi = totalExpense > 0 ? (netProfit / totalExpense) * 100 : 0;

    // Break Even Price
    const variableRates = feeRate + (promotedAdRate / 100);
    const breakEven = (totalDirectCosts + perOrderFee - (validShipCharged * (1 - variableRates))) / Math.max(0.01, 1 - variableRates);

    // Visual Distribution
    const profitPct = totalOrderRevenue > 0 ? Math.max(0, (netProfit / totalOrderRevenue) * 100) : 0;
    const feesPct = totalOrderRevenue > 0 ? Math.min(100, (totalEbayFees / totalOrderRevenue) * 100) : 0;
    const materialPct = totalOrderRevenue > 0 ? Math.min(100, (validCost / totalOrderRevenue) * 100) : 0;
    const shippingPct = totalOrderRevenue > 0 ? Math.min(100, ((validShipCost + validPack) / totalOrderRevenue) * 100) : 0;

    return {
      totalOrderRevenue,
      finalValueFee,
      promotedFee,
      totalEbayFees,
      totalDirectCosts,
      netProfit,
      profitMargin,
      roi,
      breakEven: Math.max(0, breakEven),
      effectiveFeePercentage: totalOrderRevenue > 0 ? (totalEbayFees / totalOrderRevenue) * 100 : 0,
      distribution: {
        profit: profitPct,
        fees: feesPct,
        material: materialPct,
        shipping: shippingPct,
      },
    };
  }, [salePrice, itemCost, shippingCharged, shippingCost, packagingCost, categoryIndex, hasStoreSubscription, promotedAdRate]);

  const handleApplyPreset = (preset: typeof EBAY_PRESETS[0]) => {
    setSalePrice(preset.price);
    setItemCost(preset.cost);
    setShippingCharged(preset.shipCharged);
    setShippingCost(preset.shipCost);
    setPackagingCost(preset.pack);
    setCategoryIndex(preset.cat);
    setPromotedAdRate(0);
  };

  const handleReset = () => {
    setSalePrice(65.00);
    setItemCost(20.00);
    setShippingCharged(8.50);
    setShippingCost(7.20);
    setPackagingCost(1.25);
    setCategoryIndex(0);
    setHasStoreSubscription(false);
    setPromotedAdRate(0);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyBreakdown = () => {
    const text = `eBay Profit Breakdown:
- Sale Price: ${formatCurrency(salePrice, currency.symbol)}
- Shipping Charged: ${formatCurrency(shippingCharged, currency.symbol)}
- Total Revenue: ${formatCurrency(calculations.totalOrderRevenue, currency.symbol)}
- Total eBay Fees: ${formatCurrency(calculations.totalEbayFees, currency.symbol)} (${calculations.effectiveFeePercentage.toFixed(1)}%)
- Total Expenses: ${formatCurrency(calculations.totalDirectCosts, currency.symbol)}
-----------------------
- NET PROFIT: ${formatCurrency(calculations.netProfit, currency.symbol)}
- PROFIT MARGIN: ${calculations.profitMargin.toFixed(1)}%
- BREAK-EVEN PRICE: ${formatCurrency(calculations.breakEven, currency.symbol)}
Calculated with ProfitPulse.io`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 p-4 sm:px-6 gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            2026 eBay Managed Payments Schedule
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="ebay-currency" className="text-xs font-medium text-slate-500">
            Currency:
          </label>
          <select
            id="ebay-currency"
            value={currency.code}
            onChange={(e) => {
              const found = CURRENCIES.find((c) => c.code === e.target.value);
              if (found) setCurrency(found);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none"
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

      {/* Quick Presets Bar */}
      <div className="border-b border-slate-100 bg-slate-50/40 px-4 py-2.5 sm:px-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-blue-500" />
          Popular Presets:
        </span>
        {EBAY_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50/50 transition shadow-2xs"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Inputs (7 Cols) */}
        <div className="p-6 sm:p-8 lg:col-span-7 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">
            Listing & Order Details
          </h2>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-slate-700 mb-1">
              eBay Item Category
            </label>
            <select
              id="category"
              value={categoryIndex}
              onChange={(e) => setCategoryIndex(parseInt(e.target.value))}
              className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {EBAY_CATEGORIES.map((cat, i) => (
                <option key={i} value={i}>
                  {cat.name} ({(cat.rate * 100).toFixed(2)}%)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sale Price */}
            <div>
              <label htmlFor="ebay-price" className="block text-xs font-semibold text-slate-700 mb-1">
                Final Sale Price ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="ebay-price"
                  step="0.01"
                  min="0"
                  value={salePrice === 0 ? "" : salePrice}
                  onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Item Cost */}
            <div>
              <label htmlFor="ebay-cost" className="block text-xs font-semibold text-slate-700 mb-1">
                Item Sourcing / Cost Price ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="ebay-cost"
                  step="0.01"
                  min="0"
                  value={itemCost === 0 ? "" : itemCost}
                  onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Shipping Charged */}
            <div>
              <label htmlFor="ebay-ship-charged" className="block text-xs font-semibold text-slate-700 mb-1">
                Shipping Charged to Buyer ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="ebay-ship-charged"
                  step="0.01"
                  min="0"
                  value={shippingCharged === 0 ? "" : shippingCharged}
                  onChange={(e) => setShippingCharged(parseFloat(e.target.value) || 0)}
                  placeholder="0.00 (Free Shipping)"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actual Shipping Cost */}
            <div>
              <label htmlFor="ebay-ship-paid" className="block text-xs font-semibold text-slate-700 mb-1">
                Actual Postage Cost Paid ({currency.symbol})
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                  {currency.symbol}
                </span>
                <input
                  type="number"
                  id="ebay-ship-paid"
                  step="0.01"
                  min="0"
                  value={shippingCost === 0 ? "" : shippingCost}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="block w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Store Subscriber & Promoted Listings */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">eBay Store Subscriber</span>
                <span className="text-[11px] text-slate-500">
                  Basic, Premium, or Anchor store owners receive discounted FVF rates.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasStoreSubscription(!hasStoreSubscription)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  hasStoreSubscription ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    hasStoreSubscription ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="promoted-rate" className="text-xs font-bold text-slate-800">
                  Promoted Listings Standard Ad Rate: {promotedAdRate}%
                </label>
                <span className="text-xs font-semibold text-blue-700">
                  {promotedAdRate > 0 ? `+${promotedAdRate}% ad fee` : "No Promotion"}
                </span>
              </div>
              <input
                type="range"
                id="promoted-rate"
                min="0"
                max="20"
                step="0.5"
                value={promotedAdRate}
                onChange={(e) => setPromotedAdRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
                <span>20%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output & Summary (5 Cols) */}
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                eBay Profit Summary
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md transition border border-blue-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Report"}
                </button>
              </div>
            </div>

            {/* Net Profit Hero Display */}
            <div className={`rounded-xl p-5 border text-center transition-all ${
              calculations.netProfit > 0
                ? "bg-blue-50/90 border-blue-200 text-blue-950"
                : calculations.netProfit === 0
                ? "bg-slate-50 border-slate-200 text-slate-700"
                : "bg-rose-50 border-rose-200 text-rose-950"
            }`}>
              <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
                Estimated Net Profit
              </span>
              <div className="text-4xl font-black tracking-tight my-1 text-blue-950">
                {formatCurrency(calculations.netProfit, currency.symbol)}
              </div>
              <div className="flex items-center justify-center gap-4 text-xs font-semibold mt-2">
                <span className={calculations.netProfit > 0 ? "text-blue-700" : "text-rose-700"}>
                  Margin: {calculations.profitMargin.toFixed(1)}%
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">
                  ROI: {calculations.roi.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Margin Health Assessment */}
            <div className="mt-3">
              {calculations.netProfit <= 0 ? (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-100/70 border border-rose-200 text-rose-800 text-xs">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                  <div>
                    <strong>Loss Risk:</strong> At current costs, you need at least{" "}
                    <strong>{formatCurrency(calculations.breakEven, currency.symbol)}</strong> to break even.
                  </div>
                </div>
              ) : calculations.profitMargin < 20 ? (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-800 text-xs">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <strong>Thin Margin:</strong> Flipping below 20% margin exposes you to return shipping losses.
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <strong>Solid Flip Margin:</strong> High return on sourcing investment.
                  </div>
                </div>
              )}
            </div>

            {/* Visual Revenue Distribution */}
            {calculations.totalOrderRevenue > 0 && (
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Revenue Distribution</span>
                  <span>{formatCurrency(calculations.totalOrderRevenue, currency.symbol)}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.profit)}%` }} 
                    className="bg-blue-600 transition-all duration-300"
                    title={`Profit: ${calculations.distribution.profit.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.fees)}%` }} 
                    className="bg-rose-500 transition-all duration-300"
                    title={`eBay Fees: ${calculations.distribution.fees.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.material)}%` }} 
                    className="bg-slate-400 transition-all duration-300"
                    title={`Cost: ${calculations.distribution.material.toFixed(1)}%`}
                  />
                  <div 
                    style={{ width: `${Math.min(100, calculations.distribution.shipping)}%` }} 
                    className="bg-sky-400 transition-all duration-300"
                    title={`Shipping: ${calculations.distribution.shipping.toFixed(1)}%`}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span> Profit ({calculations.distribution.profit.toFixed(0)}%)
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

            {/* Detailed Line Items */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Total Buyer Paid:</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(calculations.totalOrderRevenue, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">eBay Final Value Fee:</span>
                <span className="font-medium text-rose-600">
                  -{formatCurrency(calculations.finalValueFee, currency.symbol)}
                </span>
              </div>

              {calculations.promotedFee > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Promoted Listings ({promotedAdRate}%):</span>
                  <span className="font-medium text-rose-600">
                    -{formatCurrency(calculations.promotedFee, currency.symbol)}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-100 font-semibold">
                <span className="text-slate-800">Total eBay Fees ({calculations.effectiveFeePercentage.toFixed(1)}%):</span>
                <span className="text-rose-700">
                  -{formatCurrency(calculations.totalEbayFees, currency.symbol)}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Item & Shipping Expenses:</span>
                <span className="font-medium text-slate-800">
                  -{formatCurrency(calculations.totalDirectCosts, currency.symbol)}
                </span>
              </div>
            </div>
          </div>

          {/* Break-even box */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Break-Even Sale Price:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                {formatCurrency(calculations.breakEven, currency.symbol)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Minimum selling price needed to recover item acquisition and shipping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
