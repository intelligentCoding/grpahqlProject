import { Post } from "../entities/Post";
import { Mycontext } from "src/types";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() {em}: Mycontext
    ): Promise<Post[]> {
        return em.find(Post, {})
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: Mycontext
    ): Promise<Post | null> {
        return em.findOne(Post, { id})
    }
}