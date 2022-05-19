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
  Query,
  Resolver,
} from "type-graphql";

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: Mycontext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UserNamePasswordInput) options: UserNamePasswordInput,
    @Ctx() { req, em }: Mycontext
  ): Promise<UserResponse> {
    // validate username
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "very short user name.",
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
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already exist",
            },
          ],
        };
      }
    }
    req.session.userId = user.id;

    return { user };
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserNamePasswordInput,
    @Ctx() { em, req }: Mycontext
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
    req.session!.userId = user.id;
    return {
      user,
    };
  }
}
