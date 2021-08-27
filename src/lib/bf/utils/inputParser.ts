import { inputArrValidator } from "./";

export const inputParser = (input: string) => {
  const parsed = input.split("").map((chr) => chr.charCodeAt(0));
  const error = inputArrValidator(parsed);
  if (error) throw error;

  return parsed;
};
