import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config';
const main = async () => {
  const orm = await MikroORM.init(microConfig);
  //automatically run migrations before anything else
  await orm.getMigrator().up();
  const post = orm.em.create(Post, {
    title: "My Title"
  });
  orm.em.persistAndFlush(post);
};

main().catch((err) => {
  console.log(err);
});
