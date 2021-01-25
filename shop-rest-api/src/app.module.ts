import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Review } from './review/review.entity';
import { ReviewModule } from './review/review.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "shopapi",
      "synchronize": true,
      "entities": [Review, Product, User]
  }),
  ConfigModule.forRoot(),
  ReviewModule,
  ProductModule,
  UsersModule,
  AuthModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
