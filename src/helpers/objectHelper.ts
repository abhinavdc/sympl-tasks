export const prefixObjectKeys = (
  obj: Record<string, unknown>,
  prefix: string
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`${prefix}${key}`, value])
  );
};
