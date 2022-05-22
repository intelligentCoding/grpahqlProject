import "reflect-metadata";
import { __prod__ } from "./constants";
import { Donation } from "./entities/Donation";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { DonationResolver } from "./resolvers/donation";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import connectRedis from "connect-redis";
import { Mycontext } from "./types";
import Redis from "ioredis";
import cors from "cors";
import { createConnection } from 'typeorm'
import { User } from "./entities/User";
import path from "path";
const main = async () => {
  
  const conn = await createConnection({
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    logging: true,
    synchronize: true,
    entities: [User, Donation],
    migrations: [path.join(__dirname, "./migrations/*")]
  })
  await conn.runMigrations();
  const app = express();
  //run session middleware before apollo
  const RedisStore = connectRedis(session);
  // const redisClient = redis.createClient();
  const redis = new Redis(6379, String(process.env.REDIS_HOST));
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: `http://localhost:3000`,
      credentials: true,
    })
  );

  app.use(
    session({
      name: "tid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true, //can't access through javascript
        sameSite: "none", //should do lax to protect csrf
        secure: true, //only works in https
      },
      secret: "graphQLProject",
      saveUninitialized: false,
      resave: false,

    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, DonationResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): Mycontext => ({ req, res }),
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
