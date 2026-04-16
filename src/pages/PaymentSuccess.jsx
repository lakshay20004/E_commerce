import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const labelByMethod = {
  card: 'Credit / Debit Card',
  upi: 'UPI',
  netbanking: 'Net Banking',
  wallet: 'Wallet',
  cod: 'Cash on Delivery',
};

export default function PaymentSuccess() {
  const { state } = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-28"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-emerald-500" />
        <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
        <p className="mt-2 text-sm text-slate-600">Your order is confirmed and is being processed.</p>

        <div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-700">
          <p>
            Amount Paid: <span className="font-semibold">Rs. {state?.amount?.toLocaleString?.() ?? '0'}</span>
          </p>
          <p>
            Payment Mode: <span className="font-semibold">{labelByMethod[state?.method] ?? 'N/A'}</span>
          </p>
          <p>
            Delivery Estimate: <span className="font-semibold">{state?.estimatedDelivery ?? 'Within 3-5 days'}</span>
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
}
