#!/usr/bin/env node

import buildChangelogs from "./src/buildChangelogs";

buildChangelogs().then(console.log).catch(error => console.log('[GittyLoggy] failed with the following error: ', error));

