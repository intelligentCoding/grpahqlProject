import { __prod__ } from "./constants";
import { Donation } from "./entities/Donation";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { User } from "./entities/User";
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Donation, User],
  dbName: "graphQL",
  user: "postgres",
  password: "kasjee",
  type: "postgresql",
  debug: !__prod__,
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
