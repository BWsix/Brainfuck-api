export const codeParser = (code: string) => {
  const parsed = code.replace(/[^+-<>\.,\[\]]/g, "");
  return parsed;
};
