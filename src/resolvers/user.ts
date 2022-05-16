import { User } from "../entities/User";
import { Mycontext } from "src/types";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
@InputType()
class UserNamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options", () => UserNamePasswordInput) options: UserNamePasswordInput,
    @Ctx() { em }: Mycontext
  ) {
    // validate username
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "very short user name",
          },
        ],
      };
    }

    // validate password
    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "login",
            message: "invalid login",
          },
        ],
      };
    }
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
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserNamePasswordInput,
    @Ctx() { em }: Mycontext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username.toLowerCase(),
    });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "User Name not found",
          },
        ],
      };
    }

    try {
      const valid = await argon2.verify(user.password, options.password);
      if (!valid)
        return {
          errors: [
            {
              field: "username",
              message: "login not valid",
            },
          ],
        };
    } catch (error) {
      return {
        errors: [
          {
            field: "username",
            message: "login not valid",
          },
        ],
      };
    }

    return {
      user,
    };
  }
}
