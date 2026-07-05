"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-dark-border rounded-lg text-foreground placeholder-muted focus:border-gold focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-dark-border rounded-lg text-foreground placeholder-muted focus:border-gold focus:outline-none"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-dark-border rounded-lg text-foreground placeholder-muted focus:border-gold focus:outline-none"
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-dark-border rounded-lg text-foreground placeholder-muted focus:border-gold focus:outline-none"
        />
      </div>
      <textarea
        placeholder="Your Message *"
        required
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 bg-white border border-dark-border rounded-lg text-foreground placeholder-muted focus:border-gold focus:outline-none resize-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 px-8 py-3 gradient-gold text-white font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
      >
        <Send className="w-4 h-4" />
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-green-400 text-sm">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm">Failed to send. Please try again.</p>
      )}
    </form>
  );
}
