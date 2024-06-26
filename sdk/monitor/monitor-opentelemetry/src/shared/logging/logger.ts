// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogLevel, AzureLogger, createClientLogger, setLogLevel } from "@azure/logger";
import { diag, DiagLogger, DiagLogLevel } from "@opentelemetry/api";
import { DiagFileConsoleLogger } from "./diagFileConsoleLogger";

export class Logger {
  private static instance: Logger;
  private diagLevel: DiagLogLevel;
  private azureLogger: AzureLogger;
  private openTelemetryLogger: DiagLogger;
  private logToAzureLogger: boolean;
  private logToOpenTelemetry: boolean;

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  constructor() {
    this.azureLogger = createClientLogger("@azure/monitor-opentelemetry");
    this.openTelemetryLogger = diag.createComponentLogger({
      namespace: "@azure/monitor-opentelemetry",
    });
    this.logToOpenTelemetry = true;
    this.logToAzureLogger = false;
    const otelLogLevelEnv =
      process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL || process.env.OTEL_LOG_LEVEL;
    this.diagLevel = DiagLogLevel.WARN; // Default
    switch (otelLogLevelEnv) {
      case "ALL":
        this.diagLevel = DiagLogLevel.ALL;
        break;
      case "DEBUG":
        this.diagLevel = DiagLogLevel.DEBUG;
        break;
      case "ERROR":
        this.diagLevel = DiagLogLevel.ERROR;
        break;
      case "INFO":
        this.diagLevel = DiagLogLevel.INFO;
        break;
      case "NONE":
        this.diagLevel = DiagLogLevel.NONE;
        break;
      case "VERBOSE":
        this.diagLevel = DiagLogLevel.VERBOSE;
        break;
      case "WARN":
        this.diagLevel = DiagLogLevel.WARN;
        break;
    }
    // Set OpenTelemetry Logger
    const fileConsoleLogger = new DiagFileConsoleLogger();
    diag.setLogger(fileConsoleLogger, {
      logLevel: this.diagLevel,
      suppressOverrideMessage: true,
    });

    let azureLogLevelEnv =
      process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL || process.env.AZURE_LOG_LEVEL;
    let azureLogLevel: AzureLogLevel = "warning"; // default
    switch (azureLogLevelEnv) {
      // Application Insights levels
      case "VERBOSE":
        azureLogLevel = "verbose";
        break;
      case "INFO":
        azureLogLevel = "info";
        break;
      case "WARN":
        azureLogLevel = "warning";
        break;
      case "ERROR":
        azureLogLevel = "error";
        break;
    }
    if (azureLogLevel) {
      setLogLevel(azureLogLevel);
    }
    // Override Azure logger
    AzureLogger.log = (...args) => {
      fileConsoleLogger.logMessage(...args);
    };
  }

  public error(message?: any, ...args: any[]) {
    if (this.logToAzureLogger) {
      this.azureLogger.error(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.error(message, args);
    }
  }

  public warn(message?: any, ...args: any[]) {
    if (this.logToAzureLogger) {
      this.azureLogger.warning(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.warn(message, args);
    }
  }

  public info(message?: any, ...args: any[]) {
    if (this.logToAzureLogger) {
      this.azureLogger.info(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.info(message, args);
    }
  }

  public debug(message?: any, ...args: any[]) {
    if (this.logToAzureLogger) {
      this.azureLogger.verbose(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.debug(message, args);
    }
  }

  public verbose(message?: any, ...args: any[]) {
    if (this.logToAzureLogger) {
      this.azureLogger.verbose(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.verbose(message, args);
    }
  }

  public setLogToAzureLogger(value: boolean) {
    this.logToAzureLogger = value;
  }

  public setLogToOpenTelemetry(value: boolean) {
    this.logToOpenTelemetry = value;
  }
}
