import createDatabaseConnection from "./db/connect";
import createServer from "./server/createServer";
import loadEnv from "./utils/loadEnv";

if (process.env.ENVIRONMENT !== "PRODUCTION") loadEnv();

(async () => {
  await createDatabaseConnection();
  await createServer().listen(process.env.PORT);
  console.log(`Server started! App is listenig in port ${process.env.PORT}.`);
})();
