import { OpenRouter } from "@openrouter/sdk";

const openRouterApiKey = process.env.OPENROUTER_API_KEY?.trim();
if (!openRouterApiKey) {
  throw new Error(
    'Missing OPENROUTER_API_KEY.'
  );
}

export const openrouter = new OpenRouter({
  apiKey: openRouterApiKey,
});
