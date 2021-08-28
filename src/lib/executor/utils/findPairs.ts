export const findPairs = (code: string) => {
  const lefts: number[] = [];
  const pairs = new Map<number, number>();

  code.split("").forEach((chr, idx) => {
    if (chr === "[") {
      lefts.push(idx);
    } else if (chr === "]") {
      const leftIdx = lefts.pop();

      if (!leftIdx) throw "too many right square brackets";

      pairs.set(idx, leftIdx);
      pairs.set(leftIdx, idx);
    }
  });

  if (lefts.length) throw "too many left square brackets";
  return pairs;
};
