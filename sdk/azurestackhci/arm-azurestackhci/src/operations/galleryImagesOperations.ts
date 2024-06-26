/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { GalleryImagesOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AzureStackHCIClient } from "../azureStackHCIClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  GalleryImages,
  GalleryImagesListNextOptionalParams,
  GalleryImagesListOptionalParams,
  GalleryImagesListResponse,
  GalleryImagesListAllNextOptionalParams,
  GalleryImagesListAllOptionalParams,
  GalleryImagesListAllResponse,
  GalleryImagesGetOptionalParams,
  GalleryImagesGetResponse,
  GalleryImagesCreateOrUpdateOptionalParams,
  GalleryImagesCreateOrUpdateResponse,
  GalleryImagesDeleteOptionalParams,
  GalleryImagesDeleteResponse,
  GalleryImagesUpdateRequest,
  GalleryImagesUpdateOptionalParams,
  GalleryImagesUpdateResponse,
  GalleryImagesListNextResponse,
  GalleryImagesListAllNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing GalleryImagesOperations operations. */
export class GalleryImagesOperationsImpl implements GalleryImagesOperations {
  private readonly client: AzureStackHCIClient;

  /**
   * Initialize a new instance of the class GalleryImagesOperations class.
   * @param client Reference to the service client
   */
  constructor(client: AzureStackHCIClient) {
    this.client = client;
  }

  /**
   * Lists all of the gallery images in the specified resource group. Use the nextLink property in the
   * response to get the next page of gallery images.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    options?: GalleryImagesListOptionalParams
  ): PagedAsyncIterableIterator<GalleryImages> {
    const iter = this.listPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(resourceGroupName, options, settings);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    options?: GalleryImagesListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<GalleryImages[]> {
    let result: GalleryImagesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    options?: GalleryImagesListOptionalParams
  ): AsyncIterableIterator<GalleryImages> {
    for await (const page of this.listPagingPage(resourceGroupName, options)) {
      yield* page;
    }
  }

  /**
   * Lists all of the gallery images in the specified subscription. Use the nextLink property in the
   * response to get the next page of gallery images.
   * @param options The options parameters.
   */
  public listAll(
    options?: GalleryImagesListAllOptionalParams
  ): PagedAsyncIterableIterator<GalleryImages> {
    const iter = this.listAllPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listAllPagingPage(options, settings);
      }
    };
  }

  private async *listAllPagingPage(
    options?: GalleryImagesListAllOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<GalleryImages[]> {
    let result: GalleryImagesListAllResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listAll(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listAllNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listAllPagingAll(
    options?: GalleryImagesListAllOptionalParams
  ): AsyncIterableIterator<GalleryImages> {
    for await (const page of this.listAllPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a gallery image
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param galleryImageName Name of the gallery image
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    galleryImageName: string,
    options?: GalleryImagesGetOptionalParams
  ): Promise<GalleryImagesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, galleryImageName, options },
      getOperationSpec
    );
  }

  /**
   * The operation to create or update a gallery image. Please note some properties can be set only
   * during gallery image creation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param galleryImageName Name of the gallery image
   * @param galleryImages The gallery images resource definition.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    galleryImageName: string,
    galleryImages: GalleryImages,
    options?: GalleryImagesCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<GalleryImagesCreateOrUpdateResponse>,
      GalleryImagesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<GalleryImagesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, galleryImageName, galleryImages, options },
      spec: createOrUpdateOperationSpec
    });
    const poller = await createHttpPoller<
      GalleryImagesCreateOrUpdateResponse,
      OperationState<GalleryImagesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to create or update a gallery image. Please note some properties can be set only
   * during gallery image creation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param galleryImageName Name of the gallery image
   * @param galleryImages The gallery images resource definition.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    galleryImageName: string,
    galleryImages: GalleryImages,
    options?: GalleryImagesCreateOrUpdateOptionalParams
  ): Promise<GalleryImagesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      galleryImageName,
      galleryImages,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to delete a gallery image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param galleryImageName Name of the gallery image
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<GalleryImagesDeleteResponse>,
      GalleryImagesDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<GalleryImagesDeleteResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, galleryImageName, options },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<
      GalleryImagesDeleteResponse,
      OperationState<GalleryImagesDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to delete a gallery image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param galleryImageName Name of the gallery image
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams
  ): Promise<GalleryImagesDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      galleryImageName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to update a gallery image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param galleryImageName Name of the gallery image
   * @param galleryImages The gallery images resource patch definition.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    galleryImageName: string,
    galleryImages: GalleryImagesUpdateRequest,
    options?: GalleryImagesUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<GalleryImagesUpdateResponse>,
      GalleryImagesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<GalleryImagesUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, galleryImageName, galleryImages, options },
      spec: updateOperationSpec
    });
    const poller = await createHttpPoller<
      GalleryImagesUpdateResponse,
      OperationState<GalleryImagesUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to update a gallery image.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param galleryImageName Name of the gallery image
   * @param galleryImages The gallery images resource patch definition.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    galleryImageName: string,
    galleryImages: GalleryImagesUpdateRequest,
    options?: GalleryImagesUpdateOptionalParams
  ): Promise<GalleryImagesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      galleryImageName,
      galleryImages,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Lists all of the gallery images in the specified resource group. Use the nextLink property in the
   * response to get the next page of gallery images.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    options?: GalleryImagesListOptionalParams
  ): Promise<GalleryImagesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listOperationSpec
    );
  }

  /**
   * Lists all of the gallery images in the specified subscription. Use the nextLink property in the
   * response to get the next page of gallery images.
   * @param options The options parameters.
   */
  private _listAll(
    options?: GalleryImagesListAllOptionalParams
  ): Promise<GalleryImagesListAllResponse> {
    return this.client.sendOperationRequest({ options }, listAllOperationSpec);
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: GalleryImagesListNextOptionalParams
  ): Promise<GalleryImagesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listNextOperationSpec
    );
  }

  /**
   * ListAllNext
   * @param nextLink The nextLink from the previous successful call to the ListAll method.
   * @param options The options parameters.
   */
  private _listAllNext(
    nextLink: string,
    options?: GalleryImagesListAllNextOptionalParams
  ): Promise<GalleryImagesListAllNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listAllNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImages
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImages
    },
    201: {
      bodyMapper: Mappers.GalleryImages
    },
    202: {
      bodyMapper: Mappers.GalleryImages
    },
    204: {
      bodyMapper: Mappers.GalleryImages
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.galleryImages,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.GalleryImagesDeleteHeaders
    },
    201: {
      headersMapper: Mappers.GalleryImagesDeleteHeaders
    },
    202: {
      headersMapper: Mappers.GalleryImagesDeleteHeaders
    },
    204: {
      headersMapper: Mappers.GalleryImagesDeleteHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImages
    },
    201: {
      bodyMapper: Mappers.GalleryImages
    },
    202: {
      bodyMapper: Mappers.GalleryImages
    },
    204: {
      bodyMapper: Mappers.GalleryImages
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.galleryImages1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImagesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAllOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/galleryImages",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImagesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImagesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAllNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImagesListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
