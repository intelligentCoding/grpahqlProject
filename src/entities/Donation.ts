import { Entity, Property, PrimaryKey, ManyToOne } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Donation {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field()
  creatorId: number;

  @Field(() => User)
  @ManyToOne()
  donator: User;
  
  @Field()
  @Property({type: "int", default: 0 })
  donation!: number;

  @Field()
  @Property({type: "int", default: 0 })
  tip!: number;
}
