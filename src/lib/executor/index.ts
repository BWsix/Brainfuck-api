import { inputParser, inputArrValidator } from "lib/shared/utils";
import { codeParser, execute } from "./utils";

export const bf = (_code: string, input?: string | number[]): ExecuteRes => {
  const code = codeParser(_code);
  if (!code.length) return { error: "(no output)" };
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
    return { error: "unexpected error" };
  }
};
