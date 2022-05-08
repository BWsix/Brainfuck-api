import Joi from "joi";
import { bf } from "lib/executor";
import { validate } from "lib/middlewares/validation";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "next-connect";

const schema = Joi.object({
  code: Joi.string(),
  input: Joi.any().optional(),
});

export default connect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res, _next) => {
    if (typeof err === "string") {
      return res.status(400).json({ error: err });
    }
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(405).end("Method not allowed");
  },
})
  .post(validate({ body: schema }), (req, res) => {
    const { code, input } = req.body;
    const { error, output } = bf(code, input);
    if (error) throw error;
    return res.json(output);
  })
  .options((_, res) => res.status(200).send(""));
