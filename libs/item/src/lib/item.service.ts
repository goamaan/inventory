import { PrismaService } from '@inventory/shared';
import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      include: { shipment: true },
    });
  }

  async findAll() {
    return this.prisma.item.findMany({
      include: { shipment: true },
    });
  }

  async createItem(item: CreateItemInput) {
    return this.prisma.item.create({
      data: { ...item },
    });
  }

  async updateItem(id: string, item: UpdateItemInput) {
    return this.prisma.item.update({
      where: { id },
      data: { ...item },
    });
  }

  async deleteItem(id: string) {
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
