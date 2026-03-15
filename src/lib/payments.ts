import type { PaymentMethod } from "@/types/booking";

export interface PaymentOption {
  id: PaymentMethod;
  label: string;
  description: string;
  href?: string;
  enabled: boolean;
}

export const paymentOptions: PaymentOption[] = [
  {
    id: "pay_later",
    label: "Reserve now, confirm later",
    description:
      "Secure the request online, then finalize payment details after manual confirmation.",
    enabled: true
  },
  {
    id: "stripe",
    label: "Credit card / Stripe",
    description: "Future-ready card payment integration.",
    href: process.env.PAYMENT_STRIPE_URL,
    enabled: Boolean(process.env.PAYMENT_STRIPE_URL)
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "International checkout placeholder ready to connect.",
    href: process.env.PAYMENT_PAYPAL_URL,
    enabled: Boolean(process.env.PAYMENT_PAYPAL_URL)
  },
  {
    id: "bank_transfer",
    label: "Bank transfer",
    description: "Ideal for private and larger custom bookings.",
    href: process.env.PAYMENT_BANK_TRANSFER_URL,
    enabled: Boolean(process.env.PAYMENT_BANK_TRANSFER_URL)
  },
  {
    id: "cmi",
    label: "CMI / local Morocco payment",
    description: "Prepared for Moroccan local payment integration.",
    href: process.env.PAYMENT_CMI_URL,
    enabled: Boolean(process.env.PAYMENT_CMI_URL)
  }
];

export function getPaymentOption(id: PaymentMethod) {
  return paymentOptions.find((option) => option.id === id) ?? paymentOptions[0];
}
