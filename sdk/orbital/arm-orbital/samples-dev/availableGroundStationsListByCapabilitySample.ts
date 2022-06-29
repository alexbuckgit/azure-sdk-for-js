/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureOrbital } from "@azure/arm-orbital";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Returns list of available ground stations
 *
 * @summary Returns list of available ground stations
 * x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-03-01/examples/AvailableGroundStationsByCapabilityList.json
 */
async function listOfGroundStationsByCapability() {
  const subscriptionId = "subId";
  const capability = "EarthObservation";
  const credential = new DefaultAzureCredential();
  const client = new AzureOrbital(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.availableGroundStations.listByCapability(
    capability
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOfGroundStationsByCapability().catch(console.error);
