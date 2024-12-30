import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async createInventory(dto: CreateInventoryDto): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(dto);
    return this.inventoryRepository.save(inventory);
  }

  async getAllInventory(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }

  async getInventoryById(id: number): Promise<Inventory> {
    return this.inventoryRepository.findOne({ where: { id } });
  }

  async updateInventory(id: number, dto: UpdateInventoryDto): Promise<Inventory> {
    await this.inventoryRepository.update(id, dto);
    return this.inventoryRepository.findOne({ where: { id } });
  }

  async deleteInventory(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
}
