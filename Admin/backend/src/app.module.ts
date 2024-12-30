import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BillingModule} from './bills/billing.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './orders/order.module';
import { ProfileModule } from './profile/profile.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Boixosnois69',
      username: 'postgres',
      entities: [__dirname + '/../**/*.entity.js'], // Include all entities
      database: 'postgres',
      synchronize: true
    }),
    AuthModule,
    BillingModule,
    InventoryModule,
    OrderModule,
    ProfileModule,
    RecipeModule,
    UserModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}