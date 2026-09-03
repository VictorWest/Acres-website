"use client";

import { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function FormShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-destructive">{message}</p>;
}

export function SuccessNotice({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <CheckCircle2 className="size-12 text-green-600" />
      <p className="text-lg font-semibold">{heading}</p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
