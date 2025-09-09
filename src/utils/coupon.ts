export function normalize(code: string) {
  return (code || "").trim().toUpperCase();
}

/** คืนส่วนลด (เป็นบาท) จากยอด subtotal กับคูปอง */
export function calcDiscount(subtotal: number, code?: string) {
  const c = normalize(code || "");
  if (!c || subtotal <= 0) return 0;

  switch (c) {
    case "EKS10": {
      // ลด 10% ขั้นต่ำ 1,000 (จะปรับเงื่อนไขก็แก้ตรงนี้)
      if (subtotal < 1000) return 0;
      return Math.round(subtotal * 0.10);
    }
    case "WELCOME50":
      return 50;

    default:
      return 0;
  }
}

/** คำอธิบายคูปอง (ไว้โชว์ใต้ช่องกรอก) */
export function couponHint() {
  return "โค้ดตัวอย่าง: EKS10 (ลด 10% ขั้นต่ำ 1,000) หรือ WELCOME50 (ลด 50 บาท)";
}
