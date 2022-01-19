import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';
import { Shipment } from './shipment.model';
import { ShipmentService } from './shipment.service';

@Resolver(() => Shipment)
export class ShipmentResolver {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Query(() => Shipment)
  async shipment(@Args('id') id: string) {
    return this.shipmentService.findById(id);
  }

  @Query(() => [Shipment])
  async shipments() {
    return this.shipmentService.findAll();
  }

  @Mutation(() => Shipment)
  async createShipment(@Args('data') data: CreateShipmentInput) {
    return this.shipmentService.createShipment(data);
  }

  @Mutation(() => Shipment)
  async updateShipment(
    @Args('id') id: string,
    @Args('data') data: UpdateShipmentInput
  ) {
    return this.shipmentService.updateShipment(id, data);
  }

  @Mutation(() => Shipment)
  async deleteShipment(@Args('id') id: string) {
    return this.shipmentService.deleteShipment(id);
  }

  @Mutation(() => Shipment)
  async addItemToShipment(
    @Args('itemId') itemId: string,
    @Args('shipmentId') shipmentId: string
  ) {
    return this.shipmentService.addItem(itemId, shipmentId);
  }

  @Mutation(() => Shipment)
  async removeItemFromShipment(
    @Args('itemId') itemId: string,
    @Args('shipmentId') shipmentId: string
  ) {
    return this.shipmentService.removeItem(itemId, shipmentId);
  }
}
