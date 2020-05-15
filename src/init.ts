import createDatabaseConnection from "./db/connect";
import createServer from "./server/createServer";
import loadEnv from "./utils/loadEnv";

if (process.env.ENVIRONMENT !== "PRODUCTION") loadEnv();

(async () => {
  console.log(process.env);
  await createDatabaseConnection();

  await createServer().listen(process.env.PORT);
  console.log(`Server started! App is listenig in port ${process.env.PORT}.`);
})();
