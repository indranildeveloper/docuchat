import OpenAI from "openai";

export const openai = new OpenAI({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiKey: process.env.OPENAI_API_KEY!,
});
