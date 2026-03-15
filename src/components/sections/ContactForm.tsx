"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Locale } from "@/types/locale";
import { Card } from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredLanguage: locale,
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent");
      }

      setStatus("done");
      setMessage("Your message has been recorded.");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        preferredLanguage: locale,
        subject: "",
        message: ""
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Message could not be sent");
    }
  }

  return (
    <Card>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        {message ? (
          <div
            className={`rounded-2xl p-4 text-sm ${
              status === "done" ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-100" : "border border-rose-400/20 bg-rose-500/10 text-rose-100"
            }`}
          >
            {message}
          </div>
        ) : null}

        <label className="grid gap-2 text-sm text-[#d7cbb6]">
          Full name
          <Input value={form.fullName} onChange={(e: any) => setForm({ ...form, fullName: e.target.value })} required />
        </label>
        <label className="grid gap-2 text-sm text-[#d7cbb6]">
          Email
          <Input type="email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label className="grid gap-2 text-sm text-[#d7cbb6]">
          Phone / WhatsApp
          <Input value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value })} />
        </label>
        <label className="grid gap-2 text-sm text-[#d7cbb6]">
          Preferred language
          <Select value={form.preferredLanguage} onChange={(e: any) => setForm({ ...form, preferredLanguage: e.target.value as Locale })}>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="ar">العربية</option>
          </Select>
        </label>
        <label className="grid gap-2 text-sm text-[#d7cbb6]">
          Subject
          <Input value={form.subject} onChange={(e: any) => setForm({ ...form, subject: e.target.value })} required />
        </label>
        <label className="grid gap-2 text-sm text-[#d7cbb6]">
          Message
          <Textarea value={form.message} onChange={(e: any) => setForm({ ...form, message: e.target.value })} required />
        </label>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send message"}
        </Button>
      </form>
    </Card>
  );
}
