import { codeParser, execute, inputParser, inputArrValidator } from "./utils";

export const bf = (_code: string, input?: string | number[]): ExecuteRes => {
  const code = codeParser(_code);
  if (!code.length) return { error: "no valid brainfuck code is provided." };
  try {
    let result;

    if (typeof input === "undefined") {
      result = execute(code);
    } else if (typeof input === "string") {
      const inputArr = inputParser(input);

      result = execute(code, inputArr);
    } else if (Array.isArray(input)) {
      const error = inputArrValidator(input);
      if (error) throw error;

      result = execute(code, input);
    } else {
      return {
        error: "input type must be undefined, string or array of number",
      };
    }

    return result;
  } catch (err) {
    if (typeof err === "string") return { error: err };
    return { error: "unknown error." };
  }
};
