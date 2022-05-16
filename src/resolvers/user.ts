import { User } from "../entities/User";
import { Mycontext } from "src/types";
import argon2 from "argon2";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
@InputType()
class UserNamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}
@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options", () => UserNamePasswordInput) options: UserNamePasswordInput,
    @Ctx() { em }: Mycontext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await em.persistAndFlush(user);
    return user;
  }
}
