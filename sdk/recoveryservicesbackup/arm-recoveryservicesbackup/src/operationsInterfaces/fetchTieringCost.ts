/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  FetchTieringCostInfoRequestUnion,
  FetchTieringCostPostOptionalParams,
  FetchTieringCostPostResponse
} from "../models";

/** Interface representing a FetchTieringCost. */
export interface FetchTieringCost {
  /**
   * Provides the details of the tiering related sizes and cost.
   * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using
   * GetTieringCostOperationResult API.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param vaultName The name of the recovery services vault.
   * @param parameters Fetch Tiering Cost Request
   * @param options The options parameters.
   */
  beginPost(
    resourceGroupName: string,
    vaultName: string,
    parameters: FetchTieringCostInfoRequestUnion,
    options?: FetchTieringCostPostOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<FetchTieringCostPostResponse>,
      FetchTieringCostPostResponse
    >
  >;
  /**
   * Provides the details of the tiering related sizes and cost.
   * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using
   * GetTieringCostOperationResult API.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param vaultName The name of the recovery services vault.
   * @param parameters Fetch Tiering Cost Request
   * @param options The options parameters.
   */
  beginPostAndWait(
    resourceGroupName: string,
    vaultName: string,
    parameters: FetchTieringCostInfoRequestUnion,
    options?: FetchTieringCostPostOptionalParams
  ): Promise<FetchTieringCostPostResponse>;
}
