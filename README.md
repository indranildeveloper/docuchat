# Quill AI

This project allows users to upload a PDF and chat with the contents of the PDF using OpenAI. The uploaded PDF is stored in a vector database, and users can ask questions about the contents of the PDF with the help of LangChain and OpenAI.

## Features

- Upload PDFs and chat with the contents of the PDF using OpenAI.
- Store uploaded PDFs in a vector database.
- Ask questions about the contents of the PDF with the help of LangChain and OpenAI.

## Plans

- **Free Plan**: Users can upload a PDF under 4MB and less than 5 pages.
- **Pro Plan**: Users can upload a PDF under 16MB and under 25 pages.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository.

```
gh repo clone indranildeveloper/quill
```

2. Install the required dependencies with yarn.

```
yarn install
```

3. Add the environment variables.

```
KINDE_CLIENT_ID=<KINDE_CLIENT_ID>
KINDE_CLIENT_SECRET=<KINDE_CLIENT_SECRET>
KINDE_ISSUER_URL=<KINDE_ISSUER_URL>
KINDE_SITE_URL=<KINDE_SITE_URL>
KINDE_POST_LOGOUT_REDIRECT_URL=<KINDE_POST_LOGOUT_REDIRECT_URL>
KINDE_POST_LOGIN_REDIRECT_URL=<KINDE_POST_LOGIN_REDIRECT_URL>
DATABASE_URL=<DATABASE_URL>
UPLOADTHING_SECRET=<UPLOADTHING_SECRET>
UPLOADTHING_APP_ID=<UPLOADTHING_APP_ID>
PINECONE_API_KEY=<PINECONE_API_KEY>
OPENAI_API_KEY=<OPENAI_API_KEY>
STRIPE_SECRET_KEY=<STRIPE_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<STRIPE_WEBHOOK_SECRET>
DEPLOYMENT_URL=<DEPLOYMENT_URL>
```

4. Run the application.

```
yarn dev
```

## Dependencies

- NextJS 14
- Tailwind CSS
- Shadcn UI
- Kinde Auth
- TypeScript
- trpc
- React Query
- Langchain
- Pinecone
- OpenAI
- Prisma
- PostgreSQL
- Stripe Payment Gateway

## Usage

To use this project, follow these steps:

1. Sign up for an account.
2. Choose a plan.
3. Upload a PDF.
4. Chat with the contents of the PDF using OpenAI.

## Contributing

Upcoming.

## License

This project is licensed under the MIT License.
