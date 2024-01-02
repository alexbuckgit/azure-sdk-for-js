/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { DeviceUpdate } = require("@azure/arm-deviceupdate");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to (INTERNAL - DO NOT USE) Updates a private endpoint inside the private endpoint connection proxy object.
 *
 * @summary (INTERNAL - DO NOT USE) Updates a private endpoint inside the private endpoint connection proxy object.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/PrivateEndpointConnectionProxies/PrivateEndpointConnectionProxy_PrivateEndpointUpdate.json
 */
async function privateEndpointConnectionProxyPrivateEndpointUpdate() {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const privateEndpointConnectionProxyId = "peexample01";
  const privateEndpointUpdate = {
    id: "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/test-rg/providers/Microsoft.Network/privateEndpoints/{peName}",
    immutableResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Network/privateEndpoints/{peName}",
    immutableSubscriptionId: "00000000-0000-0000-0000-000000000000",
    location: "westus2",
    vnetTrafficTag: "12345678",
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.privateEndpointConnectionProxies.updatePrivateEndpointProperties(
    resourceGroupName,
    accountName,
    privateEndpointConnectionProxyId,
    privateEndpointUpdate,
  );
  console.log(result);
}

async function main() {
  privateEndpointConnectionProxyPrivateEndpointUpdate();
}

main().catch(console.error);
