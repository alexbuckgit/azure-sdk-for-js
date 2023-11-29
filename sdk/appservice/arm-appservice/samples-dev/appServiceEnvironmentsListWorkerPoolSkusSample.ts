/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Description for Get available SKUs for scaling a worker pool.
 *
 * @summary Description for Get available SKUs for scaling a worker pool.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2023-01-01/examples/AppServiceEnvironments_ListWorkerPoolSkus.json
 */
async function getAvailableSkUsForScalingAWorkerPool() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "test-rg";
  const name = "test-ase";
  const workerPoolName = "workerPool1";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.appServiceEnvironments.listWorkerPoolSkus(
    resourceGroupName,
    name,
    workerPoolName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  getAvailableSkUsForScalingAWorkerPool();
}

main().catch(console.error);
