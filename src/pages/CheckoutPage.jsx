import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PaymentOptions from '../components/checkout/PaymentOptions';
import OrderSummary from '../components/checkout/OrderSummary';

const cartItems = [
  { id: 1, name: 'Premium Wireless Headphones', quantity: 1, price: 8999 },
  { id: 2, name: 'Smart Fitness Band', quantity: 2, price: 2499 },
  { id: 3, name: 'Fast Charger 65W', quantity: 1, price: 1999 },
];

const initialFormState = {
  cardNumber: '',
  expiry: '',
  cvv: '',
  nameOnCard: '',
  saveCard: false,
  upiId: '',
  bankName: '',
  walletName: '',
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    []
  );
  const discount = Math.round((subtotal * discountPercent) / 100);
  const deliveryCharge = subtotal > 10000 ? 0 : 99;
  const total = subtotal - discount + deliveryCharge;

  const estimatedDelivery = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }, []);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    let updatedValue = type === 'checkbox' ? checked : value;

    if (name === 'cardNumber') {
      updatedValue = value.replace(/\D/g, '').slice(0, 16);
      updatedValue = updatedValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }

    if (name === 'cvv') {
      updatedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      updatedValue = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const applyCoupon = () => {
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'SAVE10') {
      setDiscountPercent(10);
      setCouponMessage('Coupon applied successfully. You saved 10%.');
      setIsCouponApplied(true);
      return;
    }
    if (normalized === 'FLAT500' && subtotal >= 5000) {
      setDiscountPercent((500 / subtotal) * 100);
      setCouponMessage('Coupon applied successfully. Rs. 500 discount added.');
      setIsCouponApplied(true);
      return;
    }
    setDiscountPercent(0);
    setCouponMessage('Invalid coupon code.');
    setIsCouponApplied(false);
  };

  const validateInputs = () => {
    const nextErrors = {};

    if (selectedMethod === 'card') {
      const cardDigits = formData.cardNumber.replace(/\s/g, '');
      if (cardDigits.length !== 16) nextErrors.cardNumber = 'Enter a valid 16-digit card number';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) nextErrors.expiry = 'Enter valid expiry MM/YY';
      if (!/^\d{3}$/.test(formData.cvv)) nextErrors.cvv = 'Enter valid 3-digit CVV';
    }

    if (selectedMethod === 'upi') {
      if (!/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(formData.upiId)) nextErrors.upiId = 'Enter a valid UPI ID';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const placeOrder = () => {
    if (!validateInputs()) return;

    setIsPlacingOrder(true);
    setTimeout(() => {
      navigate('/payment-success', {
        state: {
          amount: total,
          method: selectedMethod,
          estimatedDelivery,
        },
      });
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f1f3f6] pt-24 pb-10"
    >
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PaymentOptions
              selectedMethod={selectedMethod}
              formData={formData}
              errors={errors}
              total={total}
              isPlacingOrder={isPlacingOrder}
              onPlaceOrder={placeOrder}
              onMethodChange={handleMethodChange}
              onInputChange={handleInputChange}
            />
          </div>

          <OrderSummary
            items={cartItems}
            couponCode={couponCode}
            onCouponChange={setCouponCode}
            onApplyCoupon={applyCoupon}
            couponMessage={couponMessage}
            isCouponApplied={isCouponApplied}
            subtotal={subtotal}
            discount={discount}
            deliveryCharge={deliveryCharge}
            total={total}
            estimatedDelivery={estimatedDelivery}
          />
        </div>
      </div>
    </motion.div>
  );
}
