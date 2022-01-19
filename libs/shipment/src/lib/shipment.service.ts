import { PrismaService } from '@inventory/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { UpdateShipmentInput } from './dto/update-shipment.input';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.shipment.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async findAll() {
    return this.prisma.shipment.findMany({
      include: { items: true },
    });
  }

  async createShipment(shipment: CreateShipmentInput) {
    return this.prisma.shipment.create({
      data: { ...shipment },
    });
  }

  async updateShipment(id: string, shipment: UpdateShipmentInput) {
    return this.prisma.shipment.update({
      where: { id },
      data: { ...shipment },
    });
  }

  async deleteShipment(id: string) {
    return this.prisma.shipment.delete({
      where: { id },
    });
  }

  async addItem(itemId: string, shipmentId: string) {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return this.prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        items: { connect: { id: itemId } },
      },
    });
  }

  async removeItem(itemId: string, shipmentId: string) {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return this.prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        items: { disconnect: { id: itemId } },
      },
    });
  }
}
