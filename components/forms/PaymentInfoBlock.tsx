import { VENDOR_PAYMENT_INFO } from "@/lib/payment-info";

export function PaymentInfoBlock() {
  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <p className="text-sm font-semibold">Payment details</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Send your stall fee to the account below and bring proof of payment on
        the day, or as instructed by the ACRES team.
      </p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted-foreground">Bank</dt>
        <dd className="font-medium">{VENDOR_PAYMENT_INFO.bankName}</dd>
        <dt className="text-muted-foreground">Account Name</dt>
        <dd className="font-medium">{VENDOR_PAYMENT_INFO.accountName}</dd>
        <dt className="text-muted-foreground">Account Number</dt>
        <dd className="font-medium">{VENDOR_PAYMENT_INFO.accountNumber}</dd>
      </dl>
    </div>
  );
}
