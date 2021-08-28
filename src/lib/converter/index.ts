import { uniq, zip } from "lodash";

export const convert = (textArr: number[]) => {
  const lookupParsed = uniq(
    textArr.map((num) => Math.floor(num / 10)).sort((a, b) => a - b)
  );
  const lookup = textArr.map((num) =>
    lookupParsed.findIndex((tar) => Math.floor(num / 10) === tar)
  );

  let output = "++++++++++[";
  for (let num of lookupParsed) {
    output += ">" + "+".repeat(num);
  }
  output += "<".repeat(lookupParsed.length) + "-]" + String.fromCharCode(10);

  const values = lookupParsed.map((num) => num * 10);
  let prevIdx = -1;
  for (let [num, idx] of zip(textArr, lookup)) {
    if (prevIdx > idx!) output += "<".repeat(prevIdx - idx!);
    else if (prevIdx < idx!) output += ">".repeat(idx! - prevIdx);
    prevIdx = idx!;

    if (values[idx!] === 32) output += "\n";

    const offset = values[idx!] - num!;
    if (offset > 0) output += "-".repeat(offset);
    else if (offset < 0) output += "+".repeat(-offset);
    output += ".";
    values[idx!] = num!;
  }

  return { code: output };
};
