/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the currently advertised ARP table associated with the express route cross connection in a resource group.
 *
 * @summary Gets the currently advertised ARP table associated with the express route cross connection in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2023-06-01/examples/ExpressRouteCrossConnectionsArpTable.json
 */
async function getExpressRouteCrossConnectionsArpTable() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "CrossConnection-SiliconValley";
  const crossConnectionName = "<circuitServiceKey>";
  const peeringName = "AzurePrivatePeering";
  const devicePath = "primary";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.beginListArpTableAndWait(
    resourceGroupName,
    crossConnectionName,
    peeringName,
    devicePath
  );
  console.log(result);
}

async function main() {
  getExpressRouteCrossConnectionsArpTable();
}

main().catch(console.error);
