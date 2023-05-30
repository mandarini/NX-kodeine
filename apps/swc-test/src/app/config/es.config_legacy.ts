import { configureEnv } from '@beyondclicksai/core';
import { Logger } from '@nestjs/common';
import {
  EventBusConfigType,
  IEventStoreServiceConfig,
} from 'nestjs-geteventstore';
import * as util from 'util';

configureEnv(`./.env.${process.env.NODE_ENV || 'local'}`);

const discoverConn =
  process.env.NODE_ENV === 'local'
    ? {
        tcp: {
          host: process.env.EVENTSTORE_TCP_HOST,
          port: +process.env.EVENTSTORE_TCP_PORT,
        },
      }
    : {
        clusterDns: `discover://${process.env.EVENTSTORE_TCP_HOST}:${process.env.EVENTSTORE_HTTP_PORT}`,
      };

export const eventStoreConnectionConfig = {
  credentials: {
    username: process.env.EVENTSTORE_CREDENTIALS_USERNAME,
    password: process.env.EVENTSTORE_CREDENTIALS_PASSWORD,
  },
  ...discoverConn,
  http: {
    host: process.env.EVENTSTORE_HTTP_HOST,
    port: +process.env.EVENTSTORE_HTTP_PORT,
  },
  tcpConnectionName: process.env.APP_NAME,
  options: {
    log: {
      debug: (str, ...args: unknown[]) => {
        Logger.warn(util.format(str, ...args), 'EventStoreCore');
      },
      info: (str, ...args: unknown[]) => {
        Logger.log(util.format(str, ...args), 'EventStoreCore');
      },
      error: (str, ...args: unknown[]) => {
        Logger.log(util.format(str, ...args), 'EventStoreCore');
      },
    },
    // Buffer events if remote is slow or not available
    maxQueueSize: 100_000,
    maxRetries: 10_000,
    operationTimeout: 5_000,
    operationTimeoutCheckPeriod: 1_000,
    // Fail fast on connect
    clientConnectionTimeout: 2_000,
    failOnNoServerResponse: true,
    // Try to reconnect every 10s for 30mn
    maxReconnections: 200,
    reconnectionDelay: 10_000,
    // Production heartbeat
    heartbeatInterval: 10_000,
    heartbeatTimeout: 3_000,
  },
  onTcpDisconnected: () => {
    Logger.error(`Connection to eventstore lost`, undefined, 'EventStoreCore');
    //process.exit(137);
  },
  onTcpConnected: () => {
    Logger.log(`Connected to eventstore`, undefined, 'EventStoreCore');
  },
};

export const eventStoreSubsystems: IEventStoreServiceConfig = {
  subscriptions: {
    persistent: [
      // {
      //   // Event stream category (before the -)
      //   stream: '$ce-test_event',
      //   group: process.env.APP_NAME,
      //   autoAck: false,
      //   bufferSize: 1,
      //   // Subscription is created with this options
      //   options: {
      //     resolveLinkTos: true,
      //     minCheckPointCount: 1,
      //   },
      // },
    ],
  },
  // onEvent: (sub: any, payload: any) =>
  //   Logger.log(`Hook onEvent : `, sub, payload),
};

export const eventBusConfig = (allowedEvents): EventBusConfigType =>
  ({
    read: {
      allowedEvents,
    },
    write: {
      serviceName: process.env.APP_NAME,
      validate: false,
    },
  } as unknown);
