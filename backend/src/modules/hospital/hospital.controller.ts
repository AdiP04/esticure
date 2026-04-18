import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalLoginDto, MatchHospitalsDto } from './hospital.dto';

@Controller()
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  /** POST /hospital/login */
  @Post('hospital/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: HospitalLoginDto) {
    return this.hospitalService.login(dto);
  }

  /** POST /hospitals/match */
  @Post('hospitals/match')
  @HttpCode(HttpStatus.OK)
  matchHospitals(@Body() dto: MatchHospitalsDto) {
    return this.hospitalService.matchHospitals(dto);
  }

  /** GET /services – return all services for Fuse.js search */
  @Get('services')
  getServices() {
    return this.hospitalService.getServices();
  }
}
