import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiKey: process.env.PINECONE_API_KEY!,
});
