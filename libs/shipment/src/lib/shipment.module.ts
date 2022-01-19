import { PrismaService } from '@inventory/shared';
import { Module } from '@nestjs/common';
import { ShipmentResolver } from './shipment.resolver';
import { ShipmentService } from './shipment.service';

@Module({
  controllers: [],
  providers: [ShipmentResolver, ShipmentService, PrismaService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
