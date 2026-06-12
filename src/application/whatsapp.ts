import type { WhatsAppIntent, WhatsAppLink } from "@/domain";

/**
 * Strips all non-numeric characters from a phone string.
 */
function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Generates a WhatsApp link (wa.me) from an intent.
 */
export function generateWhatsAppLink(intent: WhatsAppIntent): WhatsAppLink {
  const phone = sanitizePhone(intent.phone);
  const encodedMessage = encodeURIComponent(intent.message);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  return { url, intent };
}

/**
 * Generates a WhatsApp link with a pre-filled message for a specific service.
 */
export function generateServiceWhatsAppLink(
  phone: string,
  serviceName: string
): WhatsAppLink {
  const message = `Olá! Gostaria de saber mais sobre ${serviceName}. Podem me ajudar?`;

  return generateWhatsAppLink({ phone, message });
}

/**
 * Generates a generic WhatsApp link for the business.
 */
export function generateGenericWhatsAppLink(phone: string): WhatsAppLink {
  const message =
    "Olá! Gostaria de saber mais sobre os serviços da Eletrônica Fernandes.";

  return generateWhatsAppLink({ phone, message });
}
