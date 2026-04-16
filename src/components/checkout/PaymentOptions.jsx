import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CreditCard,
  Gift,
  Loader2,
  Smartphone,
  BadgePercent,
  IndianRupee,
} from 'lucide-react';

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit / ATM Card', icon: CreditCard, status: 'active' },
  { id: 'cod', label: 'Cash on Delivery', icon: IndianRupee, status: 'active' },
  { id: 'gift', label: 'Have a Gift Card?', icon: Gift, status: 'active' },
  { id: 'upi', label: 'UPI', icon: Smartphone, status: 'unavailable' },
  { id: 'emi', label: 'EMI', icon: BadgePercent, status: 'unavailable' },
];

const fieldClass =
  'w-full rounded-md border px-3 py-2.5 text-sm outline-none transition focus:ring-1 focus:ring-blue-500';

export default function PaymentOptions({
  selectedMethod,
  formData,
  errors,
  total,
  isPlacingOrder,
  onPlaceOrder,
  onMethodChange,
  onInputChange,
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-4">
        <h2 className="text-[28px] font-semibold text-slate-900">Complete Payment</h2>
        <p className="text-sm font-medium text-slate-600">100% Secure</p>
      </div>

      <div className="grid overflow-hidden rounded-md border border-slate-200 bg-white lg:grid-cols-[310px,1fr]">
        <div className="border-r border-slate-200">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isActive = selectedMethod === method.id;
            const isUnavailable = method.status === 'unavailable';
            return (
              <button
                key={method.id}
                onClick={() => !isUnavailable && onMethodChange(method.id)}
                disabled={isUnavailable}
                className={`flex w-full items-center justify-between border-b border-slate-200 px-4 py-4 text-left transition ${
                  isActive
                    ? 'bg-slate-100'
                    : 'bg-white hover:bg-slate-50'
                }`}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-slate-700" />
                  <span className={`text-sm font-medium ${isUnavailable ? 'text-slate-400' : 'text-slate-900'}`}>
                    {method.label}
                  </span>
                </div>
                {isUnavailable && <span className="text-xs text-slate-400">Unavailable</span>}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-50 p-4">
          <AnimatePresence mode="wait">
            {selectedMethod === 'card' && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-md bg-white p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Enter your card details</h3>
                  <p className="text-xs text-emerald-600">Up to 5% cashback available</p>
                </div>
                <div>
                  <input
                    className={`${fieldClass} ${errors.cardNumber ? 'border-red-400' : 'border-slate-300'} bg-white`}
                    name="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={formData.cardNumber}
                    onChange={onInputChange}
                  />
                  {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <input
                      className={`${fieldClass} ${errors.expiry ? 'border-red-400' : 'border-slate-300'} bg-white`}
                      name="expiry"
                      placeholder="MM / YY"
                      value={formData.expiry}
                      onChange={onInputChange}
                    />
                    {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
                  </div>
                  <div>
                    <input
                      className={`${fieldClass} ${errors.cvv ? 'border-red-400' : 'border-slate-300'} bg-white`}
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={onInputChange}
                    />
                    {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    className={`${fieldClass} border-slate-300 bg-white`}
                    name="nameOnCard"
                    placeholder="Name on Card"
                    value={formData.nameOnCard}
                    onChange={onInputChange}
                  />
                </div>
                <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={onInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                  Save this card for faster checkout
                </label>
                <button
                  type="button"
                  onClick={onPlaceOrder}
                  disabled={isPlacingOrder}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-yellow-300 disabled:opacity-70"
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay Rs. ${total.toLocaleString()}`
                  )}
                </button>
              </motion.div>
            )}

            {selectedMethod === 'cod' && (
              <motion.div
                key="cod"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-md bg-white p-4"
              >
                <h3 className="text-sm font-semibold text-slate-900">Cash on Delivery</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Pay in cash at delivery. A convenience fee may apply in some locations.
                </p>
                <button
                  type="button"
                  onClick={onPlaceOrder}
                  disabled={isPlacingOrder}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-yellow-300 disabled:opacity-70"
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Confirm Order Rs. ${total.toLocaleString()}`
                  )}
                </button>
              </motion.div>
            )}

            {(selectedMethod === 'gift' || selectedMethod === 'upi' || selectedMethod === 'emi') && (
              <motion.div
                key={selectedMethod}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-md bg-white p-4 text-sm text-slate-600"
              >
                This payment method is currently unavailable in this demo screen.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
