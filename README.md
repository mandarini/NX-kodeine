
# mikro-orm error

## checkout branch

```
git checkout migrate-16-3
```

## Install deps

```
npm i --force
```

## Nx report

```

 >  NX   Report complete - copy this into the issue template

   Node   : 18.17.0
   OS     : darwin arm64
   npm    : 9.6.7
   Hasher : Native

   nx                 : 16.3.0
   @nx/js             : 16.3.0
   @nx/jest           : 16.3.0
   @nx/linter         : 16.3.0
   @nx/workspace      : 16.3.0
   @nx/devkit         : 16.3.0
   @nx/eslint-plugin  : 16.3.0
   @nx/nest           : 16.3.0
   @nx/node           : 16.3.0
   @nrwl/tao          : 16.3.0
   @nx/webpack        : 16.3.0
   typescript         : 5.0.4
   ---------------------------------------
   Community plugins:
   @jscutlery/semver         : 2.30.1
   @nx-tools/nx-container    : 4.0.3
   @nx/rspack                : 16.2.0
   @webundsoehne/nx-builders : 6.1.12

```

## Error repro

Running this command

```
nx serve rspack-test --verbose
```

produces this error:

```

> nx run rspack-test:serve:development

Debugger listening on ws://localhost:9229/87571ee9-61ec-4af1-a1a0-dcf64e98cb01
Debugger listening on ws://localhost:9229/87571ee9-61ec-4af1-a1a0-dcf64e98cb01
For help, see: https://nodejs.org/en/docs/inspector

[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [NestFactory] Starting Nest application...
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] CoreModule dependencies initialized +42ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] MikroOrmModule dependencies initialized +0ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] TerminusModule dependencies initialized +0ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +1ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [InstanceLoader] AppHealthCheckModule dependencies initialized +0ms
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [MikroORM] [discovery] ORM entity discovery started, using ReflectMetadataProvider
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [MikroORM] [discovery] - processing 0 files
[Nest] 33932  - 10/05/2023, 4:01:03 PM     LOG [MikroORM] [discovery] - processing entity Account
[Nest] 33932  - 10/05/2023, 4:01:03 PM   ERROR [ExceptionHandler] Account entity is missing @PrimaryKey()

MetadataError: Account entity is missing @PrimaryKey()
    at Function.fromMissingPrimaryKey (/Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@mikro-orm/core/errors.js:105:16)
    at MetadataValidator.validateEntityDefinition (/Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@mikro-orm/core/metadata/MetadataValidator.js:23:42)
    at MetadataDiscovery.processEntity (/Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:299:24)
    at /Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:52:63
    at Array.forEach (<anonymous>)
    at MetadataDiscovery.discover (/Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:52:18)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at Function.init (/Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@mikro-orm/core/MikroORM.js:42:24)
    at Injector.instantiateClass (/Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@nestjs/core/injector/injector.js:355:37)
    at callback (/Users/fileas/Projects/nrwl/test-nx-workspaces/NX/node_modules/@nestjs/core/injector/injector.js:56:34)


>  NX  Process exited with code 1, waiting for changes to restart...
                                                                        
```
