"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

interface ConsultationFormProps {
  services?: { documentId: string; name: string }[];
}

type Status = "idle" | "submitting" | "success" | "error";

export function ConsultationForm({ services = [] }: ConsultationFormProps) {
  const t = useTranslations("form");
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorKey(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      serviceDocumentId: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorKey(
          data.error === "rate_limited"
            ? "errorRateLimited"
            : data.error === "validation"
              ? "errorValidation"
              : "errorGeneric"
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setErrorKey("errorGeneric");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-6 text-primary-700">
        <p className="font-semibold">{t("successTitle")}</p>
        <p className="mt-1 text-sm">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot: ẩn khỏi người dùng thật, bot thường vẫn điền vào */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-neutral-700">
            {t("fullName")} *
          </label>
          <input
            type="text"
            name="fullName"
            required
            minLength={2}
            maxLength={200}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700">
            {t("email")} *
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700">
            {t("phone")}
          </label>
          <input
            type="tel"
            name="phone"
            maxLength={50}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700">
            {t("organization")}
          </label>
          <input
            type="text"
            name="organization"
            maxLength={200}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
      </div>

      {services.length > 0 ? (
        <div>
          <label className="text-sm font-medium text-neutral-700">
            {t("service")}
          </label>
          <select
            name="service"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          >
            <option value="">{t("serviceNone")}</option>
            {services.map((service) => (
              <option key={service.documentId} value={service.documentId}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div>
        <label className="text-sm font-medium text-neutral-700">
          {t("message")} *
        </label>
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={5000}
          rows={5}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
        />
      </div>

      {errorKey ? (
        <p className="text-sm font-medium text-red-600">{t(errorKey)}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
