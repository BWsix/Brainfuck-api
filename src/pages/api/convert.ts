import { convert } from "lib/converter";
import { inputParser } from "lib/shared/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "only allow post request for now." });

  const { text } = req.body;
  if (typeof text !== "string")
    return res
      .status(405)
      .json({ error: "field 'text' must be type of string" });

  try {
    const textArr = inputParser(text);
    const result = convert(textArr);
    return res.status(200).json(result);
  } catch (err) {
    return res
      .status(400)
      .json({ error: typeof err === "string" ? err : "unexpected error" });
  }
}
