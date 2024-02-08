// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt using OpenAI hosted service.
 *
 * @summary get completions using the OpenAI API.
 * @azsdk-weight 30
 */

import createClient, { OpenAIKeyCredential, isUnexpected } from "@azure-rest/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const openApiKey = process.env["OPENAI_API_KEY"] || "<api key>";

const prompt = ["What is Azure OpenAI?"];

export async function main() {
  console.log("== Get completions using OpenAI Sample ==");

  const client = createClient(new OpenAIKeyCredential(openApiKey));
  const model = "text-davinci-003";
  const response = await client.path("/deployments/{deploymentId}/completions", "").post({
    body: {
      prompt,
      model,
      max_tokens: 150,
    },
  });

  if (isUnexpected(response)) {
    throw new Error(`Failed to get completions: ${JSON.stringify(response.body)}`);
  }

  for (const choice of response.body.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
