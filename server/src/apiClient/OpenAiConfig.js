import { Configuration } from "openai";

class OpenAiConfig {
  static get configuration() {
    return new Configuration({
      organization: "org-nEkG1sgONAKXdbmd0TzONMrM",
      apiKey: process.env.BT_OPENAI_API_KEY
    });
  }
}

export default OpenAiConfig