import { User } from "../entities/User";
import { Mycontext } from "src/types";
import bcrypt from 'bcrypt';

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
import { getConnection } from "typeorm";

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

@InputType()
class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
class RegisterInput extends LoginInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
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

  //Find user
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: Mycontext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  //Register
  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => RegisterInput) options: RegisterInput,
    @Ctx() { req }: Mycontext
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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(options.password, salt);
    let user;
    try {
      const results = await getConnection().createQueryBuilder().insert().into(User).values({
        firstName: options.firstName,
        lastName: options.lastName,
        username: options.username,
        password: hashedPassword,
      }
      ).returning('*').execute();
      user = results.raw[0];
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

  //Login
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: Mycontext
  ): Promise<UserResponse> {
    const user = await User.findOne({where: {username: options.username}})
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
      console.log(options.password)
      const valid = bcrypt.compareSync(options.password,user.password);
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

  //logout
  @Mutation(() => Boolean)
  logout(
    @Ctx() { req, res }: Mycontext
  ){
    return new Promise((resolve) => req.session.destroy(err => {
      res.clearCookie('tid');
      if(err) {
        console.log(err);
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }
}
