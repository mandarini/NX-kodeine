// import { configureEnv } from '@beyondclicksai/core';
// import { Logger } from '@nestjs/common';
// import {
//   EventBusConfigType,
//   EventStoreConnectionConfig,
//   IEventStoreSubsystems,
// } from 'nestjs-geteventstore';

// configureEnv(`./.env.${process.env.NODE_ENV || 'local'}`);

// export const eventStoreConnectionConfig: EventStoreConnectionConfig = {
//   connectionSettings: {
//     connectionString: process.env.EVENTSTORE_DSN,
//   },
//   defaultUserCredentials: {
//     username: process.env.EVENTSTORE_CREDENTIALS_USERNAME,
//     password: process.env.EVENTSTORE_CREDENTIALS_PASSWORD,
//   },
// };

// export const eventStoreSubsystems: IEventStoreSubsystems = {
//   // subscriptions: {
//   //   persistent: [
//   //     {
//   //       // Event stream category (before the -)
//   //       stream: '$ce-account',
//   //       group: process.env.APP_NAME,
//   //       settingsForCreation: {
//   //         subscriptionSettings: {
//   //           resolveLinkTos: true,
//   //           minCheckpointCount: 1,
//   //         },
//   //       },
//   //       onError: (err: Error) =>
//   //         Logger.error(`An error occurred : ${err.message}`),
//   //     },
//   //     {
//   //       // Event stream category (before the -)
//   //       stream: '$ce-auth',
//   //       group: process.env.APP_NAME,
//   //       settingsForCreation: {
//   //         subscriptionSettings: {
//   //           resolveLinkTos: true,
//   //           minCheckpointCount: 1,
//   //         },
//   //       },
//   //       onError: (err: Error) =>
//   //         Logger.error(`An error occurred : ${err.message}`),
//   //     },

//   //     {
//   //       // Event stream category (before the -)
//   //       stream: '$ce-amazon_profiles',
//   //       group: process.env.APP_NAME,
//   //       settingsForCreation: {
//   //         subscriptionSettings: {
//   //           resolveLinkTos: true,
//   //           minCheckpointCount: 1,
//   //         },
//   //       },
//   //       onError: (err: Error) =>
//   //         Logger.error(`An error occurred : ${err.message}`),
//   //     },
//   //   ],
//   // },
//   onConnectionFail: (err: Error) =>
//     Logger.error(`Connection to Event store hooked : ${err}`),
// };

// export const eventBusConfig = (allowedEvents): EventBusConfigType =>
//   ({
//     read: {
//       allowedEvents,
//     },
//     write: {
//       serviceName: process.env.APP_NAME,
//     },
//     validate: false,
//   } as any);
