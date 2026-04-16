import React from 'react';
import { Tag, Truck } from 'lucide-react';

export default function OrderSummary({
  items,
  couponCode,
  onCouponChange,
  onApplyCoupon,
  couponMessage,
  isCouponApplied,
  subtotal,
  discount,
  deliveryCharge,
  total,
  estimatedDelivery,
}) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="space-y-4 rounded-md border border-slate-200 bg-[#f7f8ff] p-4">
        <h3 className="text-base font-semibold text-slate-900">Price Details</h3>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <p className="text-sm font-medium text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-md border border-dashed border-slate-300 bg-white p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Tag className="h-4 w-4" />
            Apply Coupon
          </div>
          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={(event) => onCouponChange(event.target.value)}
              placeholder="Try SAVE10"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500"
            />
            <button
              type="button"
              onClick={onApplyCoupon}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <p className={`mt-2 text-xs ${isCouponApplied ? 'text-emerald-500' : 'text-red-500'}`}>{couponMessage}</p>
          )}
        </div>

        <div className="space-y-2 rounded-md bg-white p-4">
          <div className="flex justify-between text-sm text-slate-700">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-emerald-600">
            <span>Discount</span>
            <span>- Rs. {discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? 'Free' : `Rs. ${deliveryCharge.toLocaleString()}`}</span>
          </div>
          <div className="border-t border-slate-200 pt-2 text-base font-semibold text-blue-700">
            <div className="flex justify-between">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          <Truck className="h-4 w-4" />
          Estimated delivery by {estimatedDelivery}
        </div>
      </div>
    </aside>
  );
}
