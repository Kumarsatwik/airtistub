import { OpenRouter } from "@openrouter/sdk";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const openRouterApiKey = process.env.OPENROUTER_API_KEY?.trim();
if (!openRouterApiKey) throw new Error("Missing OPENROUTER_API_KEY.");

export const openrouter = new OpenRouter({ apiKey: openRouterApiKey });

const cerebrasApiKey = process.env.CEREBRAS_API_KEY?.trim();
if (!cerebrasApiKey) throw new Error("Missing CEREBRAS_API_KEY.");

export const cerebras = new Cerebras({ apiKey: cerebrasApiKey });

type Provider = "openrouter" | "cerebras";

export async function API_CALL(
  systemPrompt: string,
  userPrompt: string,
  model: string = "llama-3.3-70b",
  provider: Provider = "openrouter"
): Promise<string> {
  try {
    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt },
    ];

    let response: any;

    if (provider === "openrouter") {
      response = await openrouter.chat.send({
        model,
        messages,
      });
    } else {
      response = await cerebras.chat.completions.create({
        model,
        messages,
      });
    }

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error(`Empty response from ${provider}`);
    }

    return content;
  } catch (error) {
    console.error(`API_CALL failed [${provider}]:`, error);
    throw error;
  }
}
