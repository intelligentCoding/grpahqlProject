import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@ObjectType()
@Entity()
export class Donation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
  
  @Field()
  @Column({type: "int", default: 0 })
  donation!: number;

  @Field()
  @Column({ type: "int", default: 0 })
  tip!: number;

  @Field()
  @Column()
  donatorId: number;

  @ManyToOne(() => User, user => user.donations)
  donator: User;
}
