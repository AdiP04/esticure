import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FileService } from '../../utils/file.service';
import { PricingService } from '../../utils/pricing.service';
import { MatchingService } from '../../utils/matching.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FileService, PricingService, MatchingService],
})
export class UserModule {}
