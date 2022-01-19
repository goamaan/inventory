import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
    @Field(() => ID)
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
