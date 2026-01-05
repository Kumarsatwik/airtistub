import { OpenRouter } from "@openrouter/sdk";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const openRouterApiKey = process.env.OPENROUTER_API_KEY?.trim();
if (!openRouterApiKey) {
  throw new Error("Missing OPENROUTER_API_KEY.");
}

export const openrouter = new OpenRouter({
  apiKey: openRouterApiKey,
});

export const cerebrasApiKey = process.env.CEREBRUS_API_KEY?.trim();
if (!cerebrasApiKey) {
  throw new Error("Missing CEREBRUS_API_KEY.");
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
  let completion;
  if (provider === "openrouter") {
    completion = await openrouter.chat.send({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: modelName || "llama-3.3-70b",
    });

    return completion.choices[0].message.content;
  } else if (provider === "cerebras") {
    completion = await cerebras.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: modelName || "llama-3.3-70b",
    });
  }

  return (completion as any).choices[0].message.content;
}
