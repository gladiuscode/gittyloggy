import dotenv from 'dotenv';
dotenv.configDotenv();

import generageChangelogs from "./src/generageChangelogs";

generageChangelogs().then(console.log)
