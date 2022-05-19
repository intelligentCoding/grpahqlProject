import { Donation } from "../entities/Donation";
import { Mycontext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
@Resolver()
export class PostResolver {
  @Query(() => [Donation])
  donations(@Ctx() { em }: Mycontext): Promise<Donation[]> {
    return em.find(Donation, {});
  }

  @Query(() => Donation, { nullable: true })
  donationById(
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
  async createDonation(
    @Arg("donation") donation: number,
    @Arg("tip") tip: number,
    @Ctx() { em, req }: Mycontext
  ): Promise<Donation | null> {
    const userId = req.session.userId ? req.session.userId: null;
    const post = em.create(Donation, {
      creatorId: userId,
      tip,
      donation,
      donator: userId,
      createdAt: new Date(),
    });
    await em.persistAndFlush(post);
    return post;
  }
}
