/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

/**
 * Represents a SIP configuration.
 * When a call is being routed the routes are applied in the same order as in the routes list.
 * A route is matched by its number pattern.
 * Call is then directed into route's first available trunk, based on the order in the route's trunks list. The configuration can be expanded with additional data.
 */

export interface SipConfiguration {
  /**
   * SIP trunks for routing calls.
   * Map key is trunk's FQDN (1-249 characters).
   */
  trunks?: { [propertyName: string]: SipTrunkExpanded };
  /** Trunk routes for routing calls. */
  routes?: SipTrunkRoute[];
}

/** Represents health state of a SIP trunk for routing calls. */
export interface TrunkExpandedHealth {
  /** The status of the TLS connections between Direct Routing and the SBC. */
  tls: TrunkExpandedHealthTls;
  /** The status of options message sent by SBC. */
  ping: TrunkExpandedHealthPing;
  /** The overall health status of SBC. */
  overall: TrunkExpandedHealthOverall;
}

/** The status of the TLS connections between Direct Routing and the SBC. */
export interface TrunkExpandedHealthTls {
  /** The status of the TLS connections between Direct Routing and the SBC. */
  status: TlsStatus;
}

/** The status of options message sent by SBC. */
export interface TrunkExpandedHealthPing {
  /** The status of options message sent by SBC. */
  status: PingStatus;
}

/** The overall health status of SBC. */
export interface TrunkExpandedHealthOverall {
  /** The overall health status of SBC. */
  status: OverallHealthStatus;
  /** The reason overall status of SBC is inactive. */
  reason?: InactiveStatusReason;
}

/** Represents a SIP trunk for routing calls. See RFC 4904. */
export interface SipTrunk {
  /** Gets or sets SIP signaling port of the trunk. */
  sipSignalingPort: number;
}

/** Represents a trunk route for routing calls. */
export interface SipTrunkRoute {
  /** Gets or sets description of the route. */
  description?: string;
  /** Gets or sets name of the route. */
  name: string;
  /**
   * Gets or sets regex number pattern for routing calls. .NET regex format is supported.
   * The regex should match only digits with an optional '+' prefix without spaces.
   * I.e. "^\+[1-9][0-9]{3,23}$".
   */
  numberPattern: string;
  /** Gets or sets list of SIP trunks for routing calls. Trunks are represented as FQDN. */
  trunks?: string[];
}

/** The Communication Services error. */
export interface CommunicationErrorResponse {
  /** The Communication Services error. */
  error: CommunicationError;
}

/** The Communication Services error. */
export interface CommunicationError {
  error: SipRoutingError;
}

/** The Communication Services error. */
export interface SipRoutingError {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /**
   * The error target.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly target?: string;
  /**
   * Further details about specific errors that led to this error.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly details?: CommunicationError[];
  readonly details?: SipRoutingError[];
  /**
   * The inner error if any.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly innerError?: CommunicationError;
  readonly innerError?: SipRoutingError;
}

/** Represents a SIP configuration patch. */
export interface SipConfigurationPatch {
  /**
   * SIP trunks for routing calls.
   * Map key is trunk's FQDN (1-249 characters).
   */
  trunks?: { [propertyName: string]: TrunkPatch | null };
  /** Trunk routes for routing calls. */
  routes?: SipTrunkRoute[];
}

/** Represents a SIP trunk patch. */
export interface TrunkPatch {
  /** Gets or sets SIP signaling port of the trunk. */
  sipSignalingPort?: number;
}

/**
 * Represents a SIP configuration.
 * When a call is being routed the routes are applied in the same order as in the routes list.
 * A route is matched by its number pattern.
 * Call is then directed into route's first available trunk, based on the order in the route's trunks list.
 */
export interface SipConfiguration {
  /**
   * SIP trunks for routing calls.
   * Map key is trunk's FQDN (1-249 characters).
   */
  trunks?: { [propertyName: string]: SipTrunk };
  /** Trunk routes for routing calls. */
  routes?: SipTrunkRoute[];
}

/** Represents a SIP trunk for routing calls. See RFC 4904. Can be expanded with additional data. */
export type SipTrunkExpanded = SipTrunk & {
  /** Represents health state of a SIP trunk for routing calls. */
  health?: TrunkExpandedHealth;
};
/** Defines values for TlsStatus. */
export type TlsStatus = "unknown" | "ok" | "certExpiring" | "certExpired";
/** Defines values for PingStatus. */
export type PingStatus = "unknown" | "ok" | "expired" | "error";
/** Defines values for OverallHealthStatus. */
export type OverallHealthStatus = "unknown" | "active" | "inactive";
/** Defines values for InactiveStatusReason. */
export type InactiveStatusReason =
  | "noRecentCalls"
  | "noRecentPings"
  | "noRecentCallsAndPings";

/** Optional parameters. */
export interface GetSipConfigurationOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getSipConfiguration operation. */
export type GetSipConfigurationResponse = SipConfigurationExpanded;
/** Optional parameters. */
export interface GetSipConfigurationOptionalParams
  extends coreClient.OperationOptions {}

/** Contains response data for the getSipConfiguration operation. */
export type GetSipConfigurationResponse = SipConfiguration;

/** Optional parameters. */
export interface PatchSipConfigurationOptionalParams
  extends coreClient.OperationOptions {
  /**
   * SIP trunks for routing calls.
   * Map key is trunk's FQDN (1-249 characters).
   */
  trunks?: { [propertyName: string]: TrunkPatch | null };
  /** Trunk routes for routing calls. */
  routes?: SipTrunkRoute[];
}

/** Contains response data for the patchSipConfiguration operation. */
export type PatchSipConfigurationResponse = SipConfiguration;

/** Optional parameters. */
export interface SipRoutingClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
