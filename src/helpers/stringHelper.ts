export function toHumanReadable(status: string): string {
  return status
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
}

export function toObjectKey(input: string): string {
  return input
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert to lowercase for consistency
    .replace(/[^a-z0-9]+/g, '_') // Replace non-alphanumeric characters with underscores
    .replace(/^_+|_+$/g, ''); // Remove leading and trailing underscores
}

export function generateUniqueId(): string {
  return `${String(Date.now())}-${Math.random().toString(36).slice(2, 11)}`;
}
