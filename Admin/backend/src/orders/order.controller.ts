import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Patch(':id/accept')
  acceptOrder(@Param('id') id: number) {
    return this.orderService.updateOrderStatus(id, 'Accepted');
  }

  @Patch(':id/reject')
  rejectOrder(@Param('id') id: number, @Body('reason') reason: string) {
    return this.orderService.updateOrderStatus(id, 'Rejected', reason);
  }

  @Patch(':id/assign')
  assignOrder(@Param('id') id: number) {
    return this.orderService.assignOrder(id);
  }
}
