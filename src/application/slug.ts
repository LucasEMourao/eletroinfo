/**
 * Generates a URL-safe slug from a title string.
 * Removes accents, special characters, and normalizes whitespace.
 */
export function generateSlug(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim leading/trailing hyphens
}

/**
 * Generates unique slugs for an array of titles.
 * Appends a numeric suffix if duplicates are found.
 */
export function generateUniqueSlug(titles: string[]): string[] {
  const slugCounts = new Map<string, number>();
  const result: string[] = [];

  for (const title of titles) {
    const baseSlug = generateSlug(title);
    const count = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, count + 1);

    if (count === 0) {
      result.push(baseSlug);
    } else {
      result.push(`${baseSlug}-${count + 1}`);
    }
  }

  return result;
}
