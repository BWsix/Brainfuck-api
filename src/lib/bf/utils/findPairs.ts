export const findPairs = (code: string) => {
  const lefts: number[] = [];
  const pairs = new Map<number, number>();

  code.split("").forEach((chr, idx) => {
    if (chr === "[") {
      lefts.push(idx);
    } else if (chr === "]") {
      const leftIdx = lefts.pop();

      if (!leftIdx)
        throw "found an extra right square bracket parsing the code.";

      pairs.set(idx, leftIdx);
      pairs.set(leftIdx, idx);
    }
  });

  return pairs;
};
