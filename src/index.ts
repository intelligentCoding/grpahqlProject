import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/User";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { Mycontext } from "./types";
import Redis from "ioredis";
// import cors from "cors";


// import { createClient } from "redis";

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  //automatically run migrations before anything else
  await orm.getMigrator().up();
  const app = express();
  //run session middleware before apollo
  const RedisStore = connectRedis(session);
  // const redisClient = redis.createClient();
  const redis = new Redis("127.0.0.1:6379");
  app.set("trust proxy", 1);
  app.use(
    session({
      name: "tid",
      store: new RedisStore({ 
        client: redis, 
        disableTouch: true 
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
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): Mycontext => ({ em: orm.em, req, res }),
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
