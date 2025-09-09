export type CheckoutInfo = {
  name: string; email: string; phone?: string;
  address?: string; note?: string;
  shipping: "standard" | "express";
  payMethod: "card" | "promptpay" | "cod";
}

export type OrderItem = {
  id: number; name: string; priceTHB: number; qty: number; image?: string;
}

export type Order = {
  id: string;             // ex. EKS-20250314-AB12
  createdAt: number;      // Date.now()
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  info: CheckoutInfo;
  status: "PAID" | "COD" | "PENDING";
}

const KEY = "eksgg_orders_v1";

export function genOrderId() {
  const d = new Date();
  const date = d.toISOString().slice(0,10).replace(/-/g,"");
  const rand = Math.random().toString(36).slice(2,6).toUpperCase();
  return `EKS-${date}-${rand}`;
}

export function saveOrder(o: Order) {
  try {
    const arr: Order[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    arr.unshift(o);
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

export function getOrder(id: string): Order | undefined {
  try {
    const arr: Order[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    return arr.find(x => x.id === id);
  } catch { return undefined; }
}
