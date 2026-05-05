"use client";

import { useState } from "react";
import { emailAddress, phoneNumber, whatsappHref } from "@/lib/content";
import { motion } from "framer-motion";
import type { SanitySection, SanitySiteSettings } from "@/lib/sanity";

type SubmitState = "idle" | "sending" | "sent" | "error";

interface Props {
  sanityData?: SanitySiteSettings | null;
  sectionData?: SanitySection | null;
}

export function Contact({ sanityData, sectionData }: Props) {
  const phone = sanityData?.phone ?? phoneNumber;
  const email = sanityData?.email ?? emailAddress;
  const address = sanityData?.address;
  const googleMap = sanityData?.googleMap;
  const waHref = sanityData?.whatsappMessage
    ? `https://wa.me/91${sanityData.phone}?text=${encodeURIComponent(sanityData.whatsappMessage)}`
    : whatsappHref;
  const eyebrow = sectionData?.eyebrow ?? "Contact Us";
  const title = sectionData?.title ?? "Ready to Plan Your";
  const highlight = sectionData?.highlight ?? "Feast?";
  const description =
    sectionData?.description ??
    "Fill out the form and our event specialists will get back to you within 24 hours.";
  const whatsappLabel = sectionData?.ctaLabel ?? "Chat on WhatsApp";
  const labels = sectionData?.formLabels ?? {};
  const locationOptions = sectionData?.options?.length
    ? sectionData.options
    : [
        { label: "Surat", value: "surat" },
        { label: "Navsari", value: "navsari" },
      ];
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [members, setMembers] = useState("");
  const [membersOpen, setMembersOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; location?: string }>({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors({});
    setError("");

    const data = {
      ...formData,
      location,
      members,
      category,
    };

    // Client-side validation
    const errors: { name?: string; phone?: string; location?: string } = {};
    if (!data.name.trim()) errors.name = labels.nameRequired ?? "Name is required";
    if (!data.phone.trim()) errors.phone = labels.phoneRequired ?? "Phone is required";
    if (!data.location) errors.location = labels.locationRequired ?? "Location is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Message could not be sent.");
      }

      setState("sent");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream py-16 sm:py-24 md:py-32"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-white/50 to-transparent" />

      <div className="section-shell relative z-10 grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              {eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-[2rem] font-black leading-tight text-charcoal sm:text-4xl md:text-5xl">
            {title} <br />
            <span className="text-primary italic">{highlight}</span>
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-muted sm:text-lg">
            {description}
          </p>

          <div className="mt-7 grid gap-4 sm:mt-10 sm:space-y-6">
            <div className="flex items-start gap-4 rounded-2xl bg-white/65 p-4 sm:gap-5 sm:bg-transparent sm:p-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-md sm:h-12 sm:w-12">
                <span className="text-xl">📞</span>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted">
                  {labels.phoneHeading ?? "Call Us"}
                </p>
                <a
                  href={`tel:+91${phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-black text-charcoal transition-colors hover:text-primary sm:text-xl"
                >
                  +91 {phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white/65 p-4 sm:gap-5 sm:bg-transparent sm:p-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-secondary shadow-md sm:h-12 sm:w-12">
                <span className="text-xl">✉️</span>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted">
                  {labels.emailHeading ?? "Email Us"}
                </p>
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-black text-charcoal transition-colors hover:text-primary sm:text-xl"
                >
                  {email}
                </a>
              </div>
            </div>

            {address && (
              <div className="flex items-start gap-4 rounded-2xl bg-white/65 p-4 sm:gap-5 sm:bg-transparent sm:p-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-md sm:h-12 sm:w-12">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted">
                    {labels.addressHeading ?? "Visit Us"}
                  </p>
                  {googleMap ? (
                    <a
                      href={googleMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-black text-charcoal transition-colors hover:text-primary sm:text-xl"
                    >
                      {address}
                    </a>
                  ) : (
                    <p className="text-lg font-black text-charcoal sm:text-xl">
                      {address}
                    </p>
                  )}
                </div>
              </div>
            )}

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-accent px-6 py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(230,126,34,0.3)] transition-all hover:scale-105 active:scale-95 sm:w-auto sm:rounded-full sm:px-8 sm:text-base"
              style={{ color: "#FFFFFF" }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white">
                <span>💬</span> {whatsappLabel}
              </span>
              <div className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-2 rounded-[32px] border-2 border-secondary/20 -z-10 sm:-inset-4 sm:rounded-[48px]" />

          <form
            onSubmit={handleSubmit}
            className="rounded-[24px] bg-white p-5 shadow-xl shadow-black/5 sm:rounded-[28px] sm:p-8 md:p-10"
          >
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                  {labels.name ?? "Your Name"}
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-base text-charcoal outline-none transition-all focus:bg-white sm:px-5 ${
                    formErrors.name ? "border-primary" : "border-gray-100 focus:border-primary"
                  }`}
                  placeholder={labels.namePlaceholder ?? "Full Name"}
                />
                {formErrors.name && (
                  <p className="mt-1 text-[10px] font-bold text-primary">{formErrors.name}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                  {labels.phone ?? "Phone Number"}
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-base text-charcoal outline-none transition-all focus:bg-white sm:px-5 ${
                    formErrors.phone ? "border-primary" : "border-gray-100 focus:border-primary"
                  }`}
                  placeholder={labels.phonePlaceholder ?? "+91 00000 00000"}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-[10px] font-bold text-primary">{formErrors.phone}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                  {labels.email ?? "Email Address"}
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-base text-charcoal outline-none transition-all focus:border-primary focus:bg-white sm:px-5"
                  placeholder={labels.emailPlaceholder ?? "name@email.com"}
                />
              </div>
              <div className="relative space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                  {labels.location ?? "Event Location"}
                </label>
                <input type="hidden" name="location" value={location} />
                <button
                  type="button"
                  onClick={() => {
                    setLocationOpen((open) => !open);
                    setMembersOpen(false);
                    setCategoryOpen(false);
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={locationOpen}
                  className={`flex w-full items-center justify-between rounded-xl border bg-gray-50 px-4 py-3 text-left text-base text-charcoal outline-none transition-all sm:px-5 ${
                    locationOpen
                      ? "border-primary bg-white"
                      : formErrors.location
                        ? "border-primary"
                        : "border-gray-100 focus:border-primary focus:bg-white"
                  }`}
                >
                  <span className={location ? "text-charcoal" : "text-muted"}>
                    {location === "surat"
                      ? (locationOptions.find((option) => option.value === "surat")?.label ?? "Surat")
                      : locationOptions.find((option) => option.value === location)?.label ?? labels.locationPlaceholder ?? "Select City"}
                  </span>
                  <span
                    className={`text-primary transition-transform ${locationOpen ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>
                {formErrors.location && (
                  <p className="mt-1 text-[10px] font-bold text-primary">{formErrors.location}</p>
                )}
                {locationOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-primary/10 bg-white p-2 shadow-2xl shadow-black/10"
                  >
                    {locationOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={location === option.value}
                        onClick={() => {
                          setLocation(option.value);
                          setLocationOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold transition-colors ${
                          location === option.value
                            ? "bg-primary text-white"
                            : "text-charcoal hover:bg-cream"
                        }`}
                      >
                        {option.label}
                        {location === option.value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Members Selection */}
              <div className="relative space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                  {labels.members ?? "How many members"}
                </label>
                <input type="hidden" name="members" value={members} />
                <button
                  type="button"
                  onClick={() => {
                    setMembersOpen((open) => !open);
                    setLocationOpen(false);
                    setCategoryOpen(false);
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={membersOpen}
                  className={`flex w-full items-center justify-between rounded-xl border bg-gray-50 px-4 py-3 text-left text-base text-charcoal outline-none transition-all sm:px-5 ${
                    membersOpen
                      ? "border-primary bg-white"
                      : "border-gray-100 focus:border-primary focus:bg-white"
                  }`}
                >
                  <span className={members ? "text-charcoal" : "text-muted"}>
                    {members || "Select member count"}
                  </span>
                  <span
                    className={`text-primary transition-transform ${membersOpen ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>
                {membersOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-primary/10 bg-white p-2 shadow-2xl shadow-black/10"
                  >
                    {[
                      "<50",
                      "50 - 100",
                      "100 - 200",
                      "200 - 500",
                      "More than 500",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        role="option"
                        aria-selected={members === opt}
                        onClick={() => {
                          setMembers(opt);
                          setMembersOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold transition-colors ${
                          members === opt
                            ? "bg-primary text-white"
                            : "text-charcoal hover:bg-cream"
                        }`}
                      >
                        {opt}
                        {members === opt && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Selection */}
              <div className="relative space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                  {labels.category ?? "Category"}
                </label>
                <input type="hidden" name="category" value={category} />
                <button
                  type="button"
                  onClick={() => {
                    setCategoryOpen((open) => !open);
                    setLocationOpen(false);
                    setMembersOpen(false);
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={categoryOpen}
                  className={`flex w-full items-center justify-between rounded-xl border bg-gray-50 px-4 py-3 text-left text-base text-charcoal outline-none transition-all sm:px-5 ${
                    categoryOpen
                      ? "border-primary bg-white"
                      : "border-gray-100 focus:border-primary focus:bg-white"
                  }`}
                >
                  <span className={category ? "text-charcoal" : "text-muted"}>
                    {category || "Select Category"}
                  </span>
                  <span
                    className={`text-primary transition-transform ${categoryOpen ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>
                {categoryOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-primary/10 bg-white p-2 shadow-2xl shadow-black/10"
                  >
                    {[
                      { label: "Wedding", value: "Wedding" },
                      { label: "Corporate event", value: "Corporate event" },
                      { label: "Party event (birthday, anniversary)", value: "Party event" },
                      { label: "Others", value: "Others" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={category === opt.value}
                        onClick={() => {
                          setCategory(opt.value);
                          setCategoryOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold transition-colors ${
                          category === opt.value
                            ? "bg-primary text-white"
                            : "text-charcoal hover:bg-cream"
                        }`}
                      >
                        {opt.label}
                        {category === opt.value && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-1.5 sm:mt-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
                {labels.message ?? "Requirement Message"}
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-base text-charcoal outline-none transition-all focus:border-primary focus:bg-white sm:px-5"
                placeholder={labels.messagePlaceholder ?? "Tell us about your event..."}
              />
            </div>

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-6 w-full rounded-2xl bg-accent py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-accent/10 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 sm:mt-8 sm:rounded-full sm:py-5 sm:tracking-[0.2em]"
            >
              {state === "sending" ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {labels.sending ?? "Sending..."}
                </span>
              ) : (
                labels.submit ?? "Request a Quote"
              )}
            </button>

            {state === "sent" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center font-bold text-green-600"
              >
                {labels.success ?? "Your request has been sent! We'll contact you soon."}
              </motion.p>
            )}
            {state === "error" && (
              <p className="mt-6 text-center font-bold text-primary">{error}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
