/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  IntegrationRuntimeResource,
  DataFactoryManagementClient
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Creates or updates an integration runtime.
 *
 * @summary Creates or updates an integration runtime.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/IntegrationRuntimes_Create.json
 */
async function integrationRuntimesCreate() {
  const subscriptionId = "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName = "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const integrationRuntime: IntegrationRuntimeResource = {
    properties: {
      type: "SelfHosted",
      description: "A selfhosted integration runtime"
    }
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.createOrUpdate(
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    integrationRuntime
  );
  console.log(result);
}

integrationRuntimesCreate().catch(console.error);
