import { inputArrValidator, inputParser } from "lib/shared/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "only allow post request for now." });

  const { text, asciiArr }: { text: string; asciiArr: number[] } = req.body;

  try {
    if (text) {
      if (typeof text !== "string") throw "field 'text' must be type of string";

      const arr = inputParser(text);
      res.status(200).json({ asciiArr: arr });
    } else if (asciiArr) {
      const error = inputArrValidator(asciiArr);
      if (error) throw error;

      const str = asciiArr.map((num) => String.fromCharCode(num)).join("");
      res.status(200).json({ text: str });
    } else return res.status(400).json({ error: "there's no input value" });
  } catch (err) {
    return res
      .status(400)
      .json({ error: typeof err === "string" ? err : "unexpected error" });
  }
}
