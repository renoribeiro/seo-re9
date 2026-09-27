import installerSkill from "../../../../.agents/skills/setup-openseo/SKILL.md?raw";
import updatePrompt from "./agentUpdatePrompt.md?raw";

export const agentUpdatePrompt = updatePrompt.trim();

// The copyable installer and internal skill share one source of truth.
export function getAgentSetupPrompt(origin: string) {
  const instructions = installerSkill
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .trim();
  // The app and the public docs share a hostname, so only the instance
  // endpoints are rewritten; docs links stay absolute.
  return instructions
    .replaceAll("https://seo.agenciare9.com.br/mcp", `${origin}/mcp`)
    .replaceAll("https://seo.agenciare9.com.br/settings", `${origin}/settings`);
}
