import { Toolhouse } from "@toolhouseai/sdk";

export const searchTheWeb = async () => {
  const toolhouse = new Toolhouse({
    apiKey: import.meta.env.VITE_TOOL_HOUSE_KEY,
  });

  const tools = await toolhouse.tools();
  console.log(tools);
};
