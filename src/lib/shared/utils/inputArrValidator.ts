export const inputArrValidator = (input: number[]) => {
  for (let num of input) {
    if (isNaN(num)) return `invalid input type : ${typeof num}`;
    if (num < 0 || num > 255) return `invalid input value : ${num}`;
  }
  return undefined;
};
