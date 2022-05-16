"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const main = async () => {
    const orm = await core_1.MikroORM.init({
        entities: [Post_1.Post],
        dbName: "graphQL",
        user: "postgres",
        password: "kasjee",
        type: "postgresql",
        debug: !constants_1.__prod__,
        allowGlobalContext: true,
    });
    const post = orm.em.create(Post_1.Post, {
        title: "My Title",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    orm.em.persistAndFlush(post);
};
main().catch(err => {
    console.log(err);
});
//# sourceMappingURL=index.js.map