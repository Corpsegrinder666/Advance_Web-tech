import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  private inventoryAvailable = true; // Simulated inventory status
  private staffAvailable = true; // Simulated staff availability

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      status: 'Pending',
    });
    return await this.orderRepository.save(order);
  }

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async updateOrderStatus(
    id: number,
    status: string,
    rejectionReason?: string,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);

    order.status = status;
    if (rejectionReason) {
      order.rejectionReason = rejectionReason;
    }

    return await this.orderRepository.save(order);
  }

  async assignOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);

    if (!this.staffAvailable) {
      order.status = 'Rejected';
      order.rejectionReason = 'No staff available';
      return await this.orderRepository.save(order);
    }

    if (!this.inventoryAvailable) {
      order.status = 'Rejected';
      order.rejectionReason = 'Insufficient inventory';
      return await this.orderRepository.save(order);
    }

    order.status = 'Assigned';
    order.assignedTo = 'Available Staff';
    return await this.orderRepository.save(order);
  }
}
