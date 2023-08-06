import {
  Entity,
  Index,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';

@Directive(`@key(fields: "id")`)
@ObjectType()
@Entity({ tableName: 'ACCOUNTS' })
export class Account {
  @PrimaryKey()
  _id: string = randomUUID();

  @SerializedPrimaryKey()
  @Field(() => ID)
  id: string;

  @Property()
  @Field()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Field()
  updatedAt: Date = new Date();

  @Field()
  @Property()
  @Index()
  brandName: string;

  @Field(() => Int, { defaultValue: 5 })
  @Property({ type: 'number' })
  maxUsers = 5;
}
