/**
 * Strips all non-numeric characters from a phone string.
 */
export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Formats a Brazilian phone number for display: (XX) XXXXX-XXXX
 * Accepts with or without country code (55).
 */
export function formatPhoneDisplay(phone: string): string {
  const digits = formatPhone(phone);

  // Remove country code if present
  const local = digits.startsWith("55") ? digits.slice(2) : digits;

  if (local.length === 11) {
    const ddd = local.slice(0, 2);
    const part1 = local.slice(2, 7);
    const part2 = local.slice(7);
    return `(${ddd}) ${part1}-${part2}`;
  }

  if (local.length === 10) {
    const ddd = local.slice(0, 2);
    const part1 = local.slice(2, 6);
    const part2 = local.slice(6);
    return `(${ddd}) ${part1}-${part2}`;
  }

  return phone;
}
