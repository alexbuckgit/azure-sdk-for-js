/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { MicrosoftVoiceServices } = require("@azure/arm-voiceservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create a CommunicationsGateway
 *
 * @summary Create a CommunicationsGateway
 * x-ms-original-file: specification/voiceservices/resource-manager/Microsoft.VoiceServices/stable/2023-01-31/examples/CommunicationsGateways_CreateOrUpdate.json
 */
async function createCommunicationsGatewayResource() {
  const subscriptionId =
    process.env["VOICESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["VOICESERVICES_RESOURCE_GROUP"] || "testrg";
  const communicationsGatewayName = "myname";
  const resource = {
    autoGeneratedDomainNameLabelScope: "NoReuse",
    codecs: ["PCMA"],
    connectivity: "PublicAddress",
    e911Type: "Standard",
    location: "useast",
    platforms: ["OperatorConnect"],
    serviceLocations: [
      {
        name: "useast",
        primaryRegionProperties: {
          allowedMediaSourceAddressPrefixes: ["10.1.2.0/24"],
          allowedSignalingSourceAddressPrefixes: ["10.1.1.0/24"],
          operatorAddresses: ["198.51.100.1"],
        },
      },
      {
        name: "useast2",
        primaryRegionProperties: {
          allowedMediaSourceAddressPrefixes: ["10.2.2.0/24"],
          allowedSignalingSourceAddressPrefixes: ["10.2.1.0/24"],
          operatorAddresses: ["198.51.100.2"],
        },
      },
    ],
    teamsVoicemailPilotNumber: "1234567890",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftVoiceServices(credential, subscriptionId);
  const result = await client.communicationsGateways.beginCreateOrUpdateAndWait(
    resourceGroupName,
    communicationsGatewayName,
    resource
  );
  console.log(result);
}

async function main() {
  createCommunicationsGatewayResource();
}

main().catch(console.error);