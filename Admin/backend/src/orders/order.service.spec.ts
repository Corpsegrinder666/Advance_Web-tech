import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

describe('OrderService', () => {
  let service: OrderService;
  let repository: Repository<Order>;

  const mockOrderRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create and save a new order', async () => {
      const createOrderDto = { customerName: 'John Doe', customerAddress: '123 Main Street' };
      const savedOrder = { id: 1, ...createOrderDto, status: 'Pending' };

      mockOrderRepository.create.mockReturnValue(savedOrder);
      mockOrderRepository.save.mockResolvedValue(savedOrder);

      const result = await service.createOrder(createOrderDto);

      expect(mockOrderRepository.create).toHaveBeenCalledWith({ ...createOrderDto, status: 'Pending' });
      expect(mockOrderRepository.save).toHaveBeenCalledWith(savedOrder);
      expect(result).toEqual(savedOrder);
    });
  });

  describe('getOrders', () => {
    it('should return all orders', async () => {
      const orders = [
        { id: 1, customerName: 'John Doe', customerAddress: '123 Main Street', status: 'Pending' },
      ];

      mockOrderRepository.find.mockResolvedValue(orders);

      const result = await service.getOrders();

      expect(mockOrderRepository.find).toHaveBeenCalled();
      expect(result).toEqual(orders);
    });
  });

  describe('updateOrderStatus', () => {
    it('should update the status of an order', async () => {
      const order = { id: 1, customerName: 'John Doe', customerAddress: '123 Main Street', status: 'Pending' };

      mockOrderRepository.findOne.mockResolvedValue(order);
      mockOrderRepository.save.mockResolvedValue({ ...order, status: 'Accepted' });

      const result = await service.updateOrderStatus(1, 'Accepted');

      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockOrderRepository.save).toHaveBeenCalledWith({ ...order, status: 'Accepted' });
      expect(result).toEqual({ ...order, status: 'Accepted' });
    });

    it('should throw an error if the order is not found', async () => {
      mockOrderRepository.findOne.mockResolvedValue(null);

      await expect(service.updateOrderStatus(1, 'Accepted')).rejects.toThrowError('Order with ID 1 not found');
    });
  });

  describe('assignOrder', () => {
    it('should assign the order if staff and inventory are available', async () => {
      const order = { id: 1, customerName: 'John Doe', customerAddress: '123 Main Street', status: 'Pending' };

      mockOrderRepository.findOne.mockResolvedValue(order);
      mockOrderRepository.save.mockResolvedValue({
        ...order,
        status: 'Assigned',
        assignedTo: 'Available Staff',
      });

      const result = await service.assignOrder(1);

      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockOrderRepository.save).toHaveBeenCalledWith({
        ...order,
        status: 'Assigned',
        assignedTo: 'Available Staff',
      });
      expect(result).toEqual({
        ...order,
        status: 'Assigned',
        assignedTo: 'Available Staff',
      });
    });

    it('should reject the order if no staff are available', async () => {
      const order = { id: 1, customerName: 'John Doe', customerAddress: '123 Main Street', status: 'Pending' };

      service['staffAvailable'] = false;
      mockOrderRepository.findOne.mockResolvedValue(order);
      mockOrderRepository.save.mockResolvedValue({
        ...order,
        status: 'Rejected',
        rejectionReason: 'No staff available',
      });

      const result = await service.assignOrder(1);

      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockOrderRepository.save).toHaveBeenCalledWith({
        ...order,
        status: 'Rejected',
        rejectionReason: 'No staff available',
      });
      expect(result).toEqual({
        ...order,
        status: 'Rejected',
        rejectionReason: 'No staff available',
      });
    });

    it('should reject the order if inventory is insufficient', async () => {
      const order = { id: 1, customerName: 'John Doe', customerAddress: '123 Main Street', status: 'Pending' };

      service['inventoryAvailable'] = false;
      mockOrderRepository.findOne.mockResolvedValue(order);
      mockOrderRepository.save.mockResolvedValue({
        ...order,
        status: 'Rejected',
        rejectionReason: 'Insufficient inventory',
      });

      const result = await service.assignOrder(1);

      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockOrderRepository.save).toHaveBeenCalledWith({
        ...order,
        status: 'Rejected',
        rejectionReason: 'Insufficient inventory',
      });
      expect(result).toEqual({
        ...order,
        status: 'Rejected',
        rejectionReason: 'Insufficient inventory',
      });
    });
  });
});
