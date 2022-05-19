import { Entity, Property, PrimaryKey, ManyToOne, OneToMany } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Donation } from "./Donation";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;
  
  @Field()
  @Property({ type: "text"})
  firstName!: string;

  @Field()
  @Property({ type: "text"})
  lastName!: string;

  @Field(() => [Donation], { nullable: true })
  @OneToMany(() => Donation, donation => donation.donator)
  donations: Donation[];

  @Property({type: "text"})
  password!: string;
}
