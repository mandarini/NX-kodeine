import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';

export type EntityRelation = {
  accountId: string;
  profileId: number;
  _profileId: string;
};

export interface IAbstractEntity {
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
export class AbstractEntity implements IAbstractEntity {
  // @PrimaryKey()
  // @Transform((value) => value.value.toString(), { toPlainOnly: true })
  // _id: ObjectId;

  @PrimaryKey()
  _id: string = randomUUID();

  @SerializedPrimaryKey()
  @Field(() => ID)
  id!: string;

  @Property()
  @Field()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Field()
  updatedAt: Date = new Date();

  static createId() {
    return randomUUID();
  }
}
