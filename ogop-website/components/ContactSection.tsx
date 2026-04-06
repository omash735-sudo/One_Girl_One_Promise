"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

interface ContactContent {
  address?: string;
  phone?: string;
  email?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
}

export default function ContactSection({ content }: { content: ContactContent }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
        setForm({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">Get In Touch</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Whether you want to donate, volunteer, or partner — we&apos;d love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-8">Reach Out</h3>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: content.address },
                { icon: Phone, label: "Phone", value: content.phone },
                { icon: Mail, label: "Email", value: content.email },
              ].map(({ icon: Icon, label, value }) => value && (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-medium">{label}</div>
                    <div className="text-gray-800 font-semibold">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900 to-purple-700 rounded-3xl p-7 text-white">
              <h4 className="font-display text-xl font-bold mb-3">Support Our Mission</h4>
              <p className="text-purple-200 text-sm leading-relaxed">
                Your donation can change a girl&apos;s life. Every contribution helps us pay school fees, provide counselling, and build a brighter future for teen mothers in Malawi.
              </p>
              <div className="mt-4 inline-block bg-yellow-400 text-purple-900 font-bold px-5 py-2.5 rounded-full text-sm cursor-pointer hover:bg-yellow-300 transition">
                Make a Donation →
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                <p className="text-gray-500">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-purple-600 font-medium hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none"
                    placeholder="How can we help or collaborate?"
                  />
                </div>
                {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === "loading"}
                  className="w-full btn-primary justify-center py-3 rounded-xl disabled:opacity-60">
                  {status === "loading" ? "Sending..." : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
