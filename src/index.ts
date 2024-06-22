import OpenAI from "openai";
import {LabelTool} from "./tools/label.tool";
require('dotenv').config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
    const inputTexts = [ // the OpenAI model will label thies with ['positive', 'negative', 'neutral']
        "I love this product!",
        "This is the worst thing I have ever bought.",
        "It's okay, not great but not bad either.",
        "Not worth the money.",
        "Best purchase ever!",
    ];

    for (const inputText of inputTexts) {
        console.debug(`Prompt: Label this text: ${inputText}`);

        const tool = new LabelTool(['positive', 'negative', 'neutral']);
        const context = { inputText: inputText };
        const prompt = `Label this text: ${inputText}`;
        const system = 'You are a helpful assistant generating training data';

        const runner = client.beta.chat.completions.runTools({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: system,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            tools: [await tool.getSchema(context)],
            tool_choice: 'auto', // If you pass tool_choice: {function: {name: …}} instead of auto, it returns immediately after calling that function
        });

        const finalContent = await runner.finalContent();
        console.log(`AI response: ${finalContent}
        `);
    }
})();