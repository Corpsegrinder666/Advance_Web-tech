import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from './entities/billing.entity';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) {}

  async createBilling(createBillingDto: CreateBillingDto): Promise<Billing> {
    const billing = this.billingRepository.create(createBillingDto);
    return await this.billingRepository.save(billing);
  }

  async getBilling(): Promise<Billing[]> {
    return await this.billingRepository.find();
  }

  async updateBilling(id: number, updateBillingDto: UpdateBillingDto): Promise<Billing> {
    const billing = await this.billingRepository.findOne({ where: { id } });
    if (!billing) {
      throw new NotFoundException(`Billing record with ID ${id} not found`);
    }

    Object.assign(billing, updateBillingDto);
    return await this.billingRepository.save(billing);
  }
}
