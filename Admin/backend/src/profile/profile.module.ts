import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';  // Ensure no circular import here
import { Profile } from './entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User]), JwtModule],  // Import the necessary modules
  providers: [ProfileService],  // Only the service is provided
  controllers: [ProfileController],  // The controller is added here
})
export class ProfileModule {}
