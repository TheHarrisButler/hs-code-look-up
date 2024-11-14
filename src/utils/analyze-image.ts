import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

export const analyzeImage = async (base64String: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `You work at a shipping and logistics company. Customers come to you when they need help 
            understanding what harmonization code(hs code) is required for their shipment. Please identify and categorize 
            the items within the image to the best of your ability. Please respond with the items that you identified
            as well as a search query another employee at the company can use to help them look up the appropriate HS code.
            Its important to remember that HS codes can be quite specific; for example, they may vary for items within the 
            same general category, such as different types of clothing or electronics. Effective categorization involves 
            recognizing nuances in the items features to classify it accurately under the relevant HS code.
            
            Please respond in a JSON format using the following shape: 
            
            {
              identifiedItems: Array<{itemName: string, description: string}>, 
              googleSearchQuery: string
            }

            Please make sure that the the response is only json. 
            `,
          },
          {
            type: "image_url",
            image_url: {
              url: base64String,
            },
          },
        ],
      },
    ],
  });

  return response.choices;
};
