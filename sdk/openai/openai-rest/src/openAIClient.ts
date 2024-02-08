// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import { OpenAIClient } from "./clientDefinitions.js";
import { nonAzurePolicy } from "./nonAzure.js";

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}

function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

/**
 * Initialize a new instance of `OpenAIClient`
 * @param openAiApiKey - The API key to use when connecting to the non-Azure OpenAI endpoint.
 * @param options - the parameter for all optional parameters
 * @remarks
*   OpenAIClient objects initialized with this constructor can only be used with the non-Azure OpenAI inference endpoint.
*   To use OpenAIClient with an Azure OpenAI resource, use a constructor that accepts a resource URI and Azure authentication credential instead.
 */
export default function createClient(
  openAiApiKey: KeyCredential,
  options?: ClientOptions,
): OpenAIClient;
/**
 * Initialize a new instance of `OpenAIClient`
 * @param endpoint - Supported Cognitive Services endpoints (protocol and hostname, for example:
 * https://westus.api.cognitive.microsoft.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options?: ClientOptions,
): OpenAIClient;
export default function createClient(
  endpointOrOpenAiKey: string | KeyCredential,
  credOrOptions: TokenCredential | KeyCredential | ClientOptions = {},
  opts: ClientOptions = {},
): OpenAIClient {
  let options: ClientOptions;
  let endpoint: string;
  let cred: KeyCredential | TokenCredential;
  let isAzure: boolean;
  if (isCred(credOrOptions)) {
    endpoint = endpointOrOpenAiKey as string;
    cred = credOrOptions;
    options = opts;
    isAzure = true;
  } else {
    endpoint = createOpenAIEndpoint(1);
    cred = endpointOrOpenAiKey as KeyCredential;
    const { credentials, ...restOpts } = credOrOptions;
    options = {
      credentials: {
        apiKeyHeaderName: credentials?.apiKeyHeaderName ?? "Authorization",
        scopes: credentials?.scopes,
      },
      ...restOpts,
    };
    isAzure = false;
  }

  const baseUrl = options.baseUrl ?? `${endpoint}/openai`;
  options.apiVersion = options.apiVersion ?? "2024-02-15-preview";
  const userAgentInfo = `azsdk-js-openai-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "api-key",
    },
  };

  const client = getClient(baseUrl, cred, {
    ...options,
    ...(isAzure
      ? {}
      : {
          additionalPolicies: [
            ...(options.additionalPolicies ?? []),
            {
              position: "perCall",
              policy: nonAzurePolicy(),
            },
          ],
        }),
  }) as OpenAIClient;

  return client;
}
