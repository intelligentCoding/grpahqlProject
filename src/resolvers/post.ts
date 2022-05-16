import { Post } from "../entities/Post";
import { Mycontext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";
@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() {em}: Mycontext
    ): Promise<Post[]> {
        return em.find(Post, {})
    }
}