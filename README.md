
# mikro-orm error - does not exist for `@nx/js@16.2.1`

## checkout branch

```
git checkout keep-16-2-js
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
   @nx/js             : 16.2.1
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
   @nx-tools/nx-container    : 4.0.4
   @nx/rspack                : 16.2.0
   @webundsoehne/nx-builders : 6.2.0
   ---------------------------------------
   The following packages should match the installed version of nx
     - @nx/js@16.2.1
     - @nrwl/js@16.2.1

   To fix this, run `nx migrate nx@16.3.0`

```

## Error does not happen

Running this command

```
nx serve rspack-test --verbose
```

Serve succeeds. Or at least no `PrimaryKey` missing error.
