import { Donation } from "../entities/Donation";
import { Mycontext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { auth } from "../auth";

@InputType()
class DonationInput {
  @Field()
  tip: number;
  @Field()
  donation: number;
}

@Resolver()
export class DonationResolver {
  @Query(() => [Donation])
  async donations(): Promise<Donation[]> {
    return Donation.find();
  }

  @Query(() => Donation, { nullable: true })
  donationById(@Arg("id") id: number): Promise<Donation | undefined> {
    return Donation.findOne(id);
  }

  @Mutation(() => Donation)
  async updateDonation(
    @Arg("id") id: number,
    @Arg("donation", { nullable: true }) donation: number,
  ): Promise<Donation | null> {
    // TODO: This needs to be updated with single SQL query
    // finding a donation and updating it is nto efficient.
    const donationByUser = await Donation.findOne(id);
    if(!donationByUser) return null;
    if(donation){
      await Donation.update({id}, {donation});
    }
    return donationByUser;
  }

  @Mutation(() => Donation)
  @UseMiddleware(auth)
  async createDonation(
    @Arg("options", () => DonationInput) options: DonationInput,
    @Ctx() { req }: Mycontext
  ): Promise<Donation> {
    return Donation.create({
      ...options,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(()=>Boolean)
  async deleteDonation(
    @Arg("id") id: number): Promise<boolean> {
    await Donation.delete(id);
    return true;
  }
}
