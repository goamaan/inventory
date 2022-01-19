import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => Item)
  async item(@Args('id') id: string) {
    return this.itemService.findById(id);
  }

  @Query(() => [Item])
  async items() {
    return this.itemService.findAll();
  }

  @Mutation(() => Item)
  async createItem(@Args('data') data: CreateItemInput) {
    return this.itemService.createItem(data);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('id') id: string,
    @Args('data') data: UpdateItemInput
  ) {
    return this.itemService.updateItem(id, data);
  }
}
