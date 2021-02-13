import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JsonBodyMiddleware } from './middleware/body-json.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Review } from './review/review.entity';
import { ReviewModule } from './review/review.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/entity/product.entity';
import { User } from './users/entity/users.entity';
import { Device } from './users/entity/user-device.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "shopapi",
      "synchronize": true,
      "entities": [Review, Product, User, Device]
  }),
  ConfigModule.forRoot({
    isGlobal: true
  }),
  ReviewModule,
  ProductModule,
  UsersModule,
  AuthModule,

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
