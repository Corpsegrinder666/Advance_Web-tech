import { Controller, Get, Param, Body, Put } from '@nestjs/common';
import { ProfileService } from './profile.service'; // Importing only the service here

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':userId')
  getProfileByUserId(@Param('userId') userId: number) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Put(':userId')
  updateProfile(
    @Param('userId') userId: number,
    @Body() updateProfileDto: any,
  ) {
    return this.profileService.updateProfile(userId, updateProfileDto);
  }
}
