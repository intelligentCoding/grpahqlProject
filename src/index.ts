import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "graphQL",
    user: "postgres",
    password: "kasjee",
    type: "postgresql",
    debug: !__prod__,
    allowGlobalContext: true,
  });

  const post = orm.em.create(Post, {
    title: "My Title",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  orm.em.persistAndFlush(post);
};

main().catch((err) => {
  console.log(err);
});
