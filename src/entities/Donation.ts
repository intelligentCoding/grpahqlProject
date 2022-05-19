import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

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
  @Property()
  donation!: number;

  @Field()
  @Property()
  tip!: number;
}
