import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JsonBodyMiddleware } from './middleware/body-json.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Review } from './review/entity/review.entity';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/entity/product.entity';
import { User } from './users/entity/users.entity';
import { Device } from './users/entity/user-device.entity';
import { Order } from './order/entity/order.entity';
import { OrderDetails } from './order/entity/order-details.entity';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "shopapi",
      "synchronize": true,
      "entities": [Review, Product, User, Device, Order, OrderDetails]
  }),
  ConfigModule.forRoot({
    isGlobal: true
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client/dist/assets'),
  }),
  ReviewModule,
  ProductModule,
  UsersModule,
  AuthModule,
  OrderModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
        .apply(JsonBodyMiddleware)
        .forRoutes('*');
  }
}
