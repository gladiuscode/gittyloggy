#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.configDotenv();

import buildChangelogs from "./src/buildChangelogs";

buildChangelogs().then(console.log)

