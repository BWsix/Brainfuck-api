import { findPairs } from "./";

export const execute = (code: string, input?: number[]): ExecuteRes => {
  let codePtr = 0;
  const arr: number[] = [0];
  let arrPtr = 0;

  const pairs = findPairs(code);

  const output: number[] = [];

  try {
    while (codePtr < code.length) {
      switch (code[codePtr]) {
        case "+":
          arr[arrPtr]++;
          if (arr[arrPtr] > 255) arr[arrPtr] = 0;
          break;

        case "-":
          arr[arrPtr]--;
          if (arr[arrPtr] < 0) arr[arrPtr] = 255;
          break;

        case "[":
          if (arr[arrPtr] === 0) codePtr = pairs.get(codePtr)!;
          break;

        case "]":
          if (arr[arrPtr] !== 0) codePtr = pairs.get(codePtr)!;
          break;

        case ">":
          arrPtr++;
          if (arrPtr > 420)
            throw "(memory limit exceeded) memory size greater than 420";
          if (arrPtr > arr.length - 1) arr.push(0);

          console.log(">, now at ", arrPtr);
          break;

        case "<":
          arrPtr--;
          console.log("<, now at ", arrPtr);
          if (arrPtr < 0) throw "(memory error) pointer index less than 0";
          break;

        case ".":
          output.push(arr[arrPtr]);
          console.log("print: ", arr[arrPtr]);
          break;

        case ",":
          if (!input?.length) throw "there's no more input value";
          arr[arrPtr] = input.shift()!;
          console.log("input");
          break;
      }

      console.log(arr);
      codePtr++;
    }

    if (!output.length) throw "no output";
  } catch (err) {
    const error = typeof err !== "string" ? "unknown error" : err;

    return { error };
  }

  console.log(output);

  const output_str = output.map((num) => String.fromCharCode(num)).join("");
  return { output: { str: output_str, arr: output } };
};
