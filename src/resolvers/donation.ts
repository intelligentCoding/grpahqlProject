import { Donation } from "../entities/Donation";
import { Mycontext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { auth } from "../auth";
import { getConnection } from "typeorm";


@Resolver()
export class DonationResolver {
  @Query(() => [Donation])
  async donations(
    // TODO: pagination
    // @Arg('limit', () => Int) limit: number,
    // @Arg('cursor', () => String, { nullable: true}) cursor: string | null,
  ): Promise<Donation[]> {
    // const customLimit = Math.min(25, limit);
    const qb =  getConnection()
    .getRepository(Donation)
    .createQueryBuilder("d")
    .orderBy('d."createdAt"', "DESC")
    // .take(customLimit)
    // if(cursor){
    //   qb.where('"createdAt" < :cursor', {
    //     cursor: new Date(parseInt(cursor))
    //   })
    // }
    return qb.getMany();
  }

  @Query(() => Donation, { nullable: true })
  donationById(@Arg("id", () => Int) id: number): Promise<Donation | undefined> {
    return Donation.findOne(id, {relations: ["donator"]});
  }

  @Mutation(() => Donation)
  @UseMiddleware(auth)
  async updateDonation(
    @Arg("id", ()=> Int) id: number,
    @Arg("donation", ()=> Int, { nullable: true }) donation: number,
    @Ctx() { req }: Mycontext
  ): Promise<Donation | null> {
    // TODO: This needs to be updated with single SQL query
    // finding a donation and updating it is nto efficient.
    const donationByUser = await Donation.findOne(id);
    if(!donationByUser) return null;
    if(donation){
      await Donation.update({id, donatorId: req.session.userId}, {donation});
    }
    return donationByUser;
  }

  @Mutation(() => Donation)
  @UseMiddleware(auth)
  async createDonation(
    @Arg("tip", () => Int) tip: number,
    @Arg("donation", () => Int) donation: number,
    @Ctx() { req }: Mycontext
  ): Promise<Donation> {
    return Donation.create({
      tip,
      donation,
      donatorId: req.session.userId,
    }).save();
  }

  @Mutation(()=>Boolean)
  async deleteDonation(
    @Arg("id") id: number): Promise<boolean> {
    await Donation.delete(id);
    return true;
  }
}
