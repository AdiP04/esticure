import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { FileService } from '../../utils/file.service';
import { PricingService } from '../../utils/pricing.service';
import { MatchingService } from '../../utils/matching.service';

@Module({
  controllers: [HospitalController],
  providers: [HospitalService, FileService, PricingService, MatchingService],
})
export class HospitalModule {}
