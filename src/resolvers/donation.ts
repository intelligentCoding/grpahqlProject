import { Donation } from "../entities/Donation";
import { Mycontext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
@Resolver()
export class PostResolver {
  @Query(() => [Donation])
  posts(@Ctx() { em }: Mycontext): Promise<Donation[]> {
    return em.find(Donation, {});
  }

  @Query(() => Donation, { nullable: true })
  donations(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: Mycontext
  ): Promise<Donation | null> {
    return em.findOne(Donation, { id });
  }

  @Mutation(() => Donation)
  async updateDonation(
    @Arg("id") id: number,
    @Arg("donation", { nullable: true }) donation: number,
    @Ctx() { em }: Mycontext
  ): Promise<Donation | null> {
    const userDonation = await em.findOne(Donation, { id });
    if (!userDonation) {
      return null;
    }
    if (typeof donation !== "undefined") {
      userDonation.donation = donation;
      await em.persistAndFlush(userDonation);
    }
    return userDonation;
  }

  @Mutation(() => Donation)
  async makeDonation(
    @Arg("donation") donation: number,
    @Arg("tip") tip: number,
    @Ctx() { em }: Mycontext
  ): Promise<Donation | null> {
    const post = em.create(Donation, {
      tip,
      donation,
      createdAt: new Date(),
    });
    await em.persistAndFlush(post);
    return post;
  }
}
