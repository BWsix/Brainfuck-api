import Joi from "joi";
import { convert } from "lib/converter";
import { validate } from "lib/middlewares/validation";
import { inputParser } from "lib/shared/utils";
import { NextApiRequest, NextApiResponse } from "next";
import connect from "next-connect";

const schema = Joi.object({
  text: Joi.string(),
});

export default connect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res, _next) => {
    if (typeof err === "string") {
      return res.status(400).send(err);
    }
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(405).end("Method not allowed");
  },
})
  .post(validate({ body: schema }), (req, res) => {
    const text = req.body.text as string;
    const textArr = inputParser(text);
    const result = convert(textArr);
    return res.json(result);
  })
  .options((_, res) => res.status(200).send(""));
