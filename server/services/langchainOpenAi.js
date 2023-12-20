require("dotenv").config();
import { OpenAIAssistantRunnable } from "langchain/experimental/openai_assistant";
import { AgentExecutor } from "langchain/agents";
import { StructuredTool } from "langchain/tools";


const assistant = await OpenAIAssistantRunnable.createAssistant({
    clientOptions: { apiKey: process.env.OPENAI_API_KEY },
    model: "gpt-4-1106-preview",
  });