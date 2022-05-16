import { Post } from "../entities/Post";
import { Mycontext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: Mycontext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: Mycontext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: Mycontext
  ): Promise<Post | null> {
    const post = em.create(Post, {
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await em.persistAndFlush(post);
    return post;
  }
}
