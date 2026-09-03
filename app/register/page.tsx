import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Register | ACRES 2026",
};

const categories = [
  {
    href: "/register/attendee",
    title: "Attendee / Delegate",
    description: "Get access to the exhibition floor and general summit sessions.",
  },
  {
    href: "/register/exhibitor",
    title: "Exhibitor",
    description: "Book a booth and showcase your company at ACRES 2026.",
  },
  {
    href: "/register/vendor",
    title: "On-Site Vendor",
    description: "Sell food, snacks, or refreshments at the venue.",
  },
];

export default function RegisterHubPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Register for ACRES 2026</h1>
      <p className="mt-2 text-muted-foreground">
        12–14 November 2026 · Obi Wali International Conference Centre, Port
        Harcourt. Choose the category that applies to you.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        {categories.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="transition-colors hover:bg-accent">
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>{c.title}</CardTitle>
                  <CardDescription className="mt-1">{c.description}</CardDescription>
                </div>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
