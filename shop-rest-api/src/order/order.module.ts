import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entity/order-details.entity';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetails])],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService]
  })
export class OrderModule {}
