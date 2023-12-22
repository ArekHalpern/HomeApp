require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const { ChatPromptTemplate } = require("langchain/chat_models/openai");

async function testTranslation() {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
  });

  const template = "You are a helpful assistant that translates {input_language} into {output_language}.";
  const humanTemplate = "{text}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", template],
    ["human", humanTemplate],
  ]);

  const formattedChatPrompt = await chatPrompt.formatMessages({
    input_language: "English",
    output_language: "French",
    text: "I love programming.",
  });

  console.log(formattedChatPrompt);
}

testTranslation();
