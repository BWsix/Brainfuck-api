import { bf } from "lib/bf";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "only allow post request for now." });

  const { code, input } = req.body;
  let result: ExecuteRes;

  if (typeof code !== "string")
    return res
      .status(400)
      .json({ error: "there's no brainfuck code in your request." });

  if (
    typeof input === "undefined" ||
    typeof input === "string" ||
    Array.isArray(input)
  ) {
    result = bf(code, input);
  } else {
    return res.status(400).json({
      error: "input type must be undefined, string or array of number",
    });
  }

  return res.status(200).json(result);
}
