/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { PlaywrightTestingClient } = require("@azure/arm-playwrighttesting");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List Account resources by subscription ID
 *
 * @summary List Account resources by subscription ID
 * x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_ListBySubscription.json
 */
async function accountsListBySubscription() {
  const subscriptionId =
    process.env["PLAYWRIGHTTESTING_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new PlaywrightTestingClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.accounts.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  accountsListBySubscription();
}

main().catch(console.error);
