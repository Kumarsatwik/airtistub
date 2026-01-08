import { OpenRouter } from "@openrouter/sdk";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const openRouterApiKey = process.env.OPENROUTER_API_KEY?.trim();
if (!openRouterApiKey) {
  throw new Error("Missing OPENROUTER_API_KEY.");
}

export const openrouter = new OpenRouter({
  apiKey: openRouterApiKey,
});

export const cerebrasApiKey = process.env.CEREBRAS_API_KEY?.trim();
if (!cerebrasApiKey) {
  throw new Error("Missing CEREBRAS_API_KEY.");
}

export const cerebras = new Cerebras({
  apiKey: cerebrasApiKey,
});

export async function API_CALL(
  systemPrompt: string,
  userPrompt: string,
  modelName?: string,
  provider = "openrouter"
) {
  try {
    let completion;
    if (provider === "openrouter") {
      completion = await openrouter.chat.send({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: modelName || "llama-3.3-70b",
      });
    } else if (provider === "cerebras") {
      completion = await cerebras.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: modelName || "llama-3.3-70b",
      });
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    // Validate response shape and extract content based on provider
    let content: string;
    if (provider === "openrouter") {
      const response = completion as unknown as { content: string; role: string };
      if (!response || !response.content) {
        throw new Error("Invalid response structure from OpenRouter");
      }
      content = response.content;
    } else if (provider === "cerebras") {
      const response = completion as { choices: { message: { content: string } }[] };
      if (!response || !response.choices || !response.choices[0] || !response.choices[0].message) {
        throw new Error("Invalid response structure from Cerebras");
      }
      content = response.choices[0].message.content;
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    return content;
  } catch (error) {
    console.error(`API_CALL error for provider ${provider}:`, error);
    throw error; // Re-throw to let caller handle
  }
}
