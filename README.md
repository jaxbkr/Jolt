This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Use Node.js 24 LTS. With nvm, install and select the project version, then install dependencies:

```bash
nvm install
nvm use
npm ci
```

Run `npm test` for the API tests and `npm run build` for a production build.
Configure hosted builds to use Node.js 24 as well.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

Set `API_KEY` in the Vercel project's environment variables for **Production**
(and **Preview** if you use preview deployments). Use your direct API-Sports key.
Jolt sends it to `v1.american-football.api-sports.io` using `x-apisports-key`;
a RapidAPI subscription key is not interchangeable.

Keep the name `API_KEY`. Do not use `NEXT_PUBLIC_API_KEY` or add the key to
`next.config.mjs`: the credential must stay on the server.

Redeploy after adding or changing the variable. Existing Vercel deployments do
not receive updated environment variables. Data pages use the Node.js runtime
and render per request, while API responses retain their explicit cache periods.

If data still fails, inspect Vercel function logs for `[Jolt API]`:
- Missing `API_KEY`: check the variable's deployment environment and redeploy.
- HTTP 401/403 or `authentication`: check that the direct API-Sports key is valid.
- `quota` or `plan`: check the provider allowance and season access.

Diagnostics never print the credential or raw provider error messages.

References: [Vercel environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables),
[Next.js server environment variables](https://nextjs.org/docs/14/app/building-your-application/configuring/environment-variables).
