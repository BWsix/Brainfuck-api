import withJoi from "next-joi";

export const validate = withJoi({
  onValidationError: (_, res) => {
    res.status(400).end({ error: "Invalid request body was sent" });
  },
});
