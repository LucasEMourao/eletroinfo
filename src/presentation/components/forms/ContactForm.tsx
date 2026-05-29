"use client";

import { useState } from "react";
import type { ContactFormData, ContactFormResult } from "@/domain";
import { Button } from "@/presentation/components/ui/Button";

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Nome é obrigatório";
  } else if (data.name.trim().length < 2) {
    errors.name = "Nome deve ter pelo menos 2 caracteres";
  }

  if (!data.email.trim()) {
    errors.email = "E-mail é obrigatório";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "E-mail inválido";
  }

  if (data.phone && !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(data.phone.trim())) {
    errors.phone = "Telefone inválido";
  }

  if (!data.message.trim()) {
    errors.message = "Mensagem é obrigatória";
  } else if (data.message.trim().length < 10) {
    errors.message = "Mensagem deve ter pelo menos 10 caracteres";
  }

  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ContactFormResult | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ContactFormResult = await response.json();
      setResult(data);

      if (data.success) {
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch {
      setResult({
        success: false,
        message: "Erro ao enviar mensagem. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground placeholder:text-gray-500 transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {result && (
        <div
          role="alert"
          className={`rounded-lg p-4 text-sm font-medium ${
            result.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {result.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
          Nome *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
          className={inputClasses}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className={errorClasses}>{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className={inputClasses}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={errorClasses}>{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-foreground">
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(11) 99999-9999"
          className={inputClasses}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className={errorClasses}>{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Descreva como podemos ajudar..."
          className={`${inputClasses} resize-vertical`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className={errorClasses}>{errors.message}</p>
        )}
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  );
}
