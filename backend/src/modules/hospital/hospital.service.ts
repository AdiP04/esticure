import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FileService } from '../../utils/file.service';
import { MatchingService } from '../../utils/matching.service';
import { HospitalLoginDto, MatchHospitalsDto } from './hospital.dto';

@Injectable()
export class HospitalService {
  constructor(
    private readonly fileService: FileService,
    private readonly matchingService: MatchingService,
  ) {}

  /** Authenticate hospital admin via email + password */
  async login(dto: HospitalLoginDto): Promise<any> {
    const authRecords = await this.fileService.readJsonFile<any[]>('hospitalAuth.json');
    const record = authRecords.find(
      (r) =>
        r.email.toLowerCase() === dto.email.toLowerCase() &&
        r.password === dto.password,
    );

    if (!record) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Load hospital details for the name
    const hospitals = await this.fileService.readJsonFile<any[]>('hospitals.json');
    const hospital = hospitals.find((h) => h.id === record.hospitalId);

    return {
      success: true,
      hospitalId: record.hospitalId,
      name: hospital?.name || record.name || 'Hospital',
      city: hospital?.city || record.city || '',
    };
  }

  /** Match + price hospitals for a given city/insurance/service */
  async matchHospitals(dto: MatchHospitalsDto): Promise<any> {
    const matched = await this.matchingService.matchHospitals(
      dto.city,
      dto.insuranceCompany || null,
      dto.serviceId,
    );
    const overall = this.matchingService.computeOverallRange(matched);

    return {
      hospitals: matched,
      estimatedCostMin: overall.min,
      estimatedCostMax: overall.max,
    };
  }

  /** Return all services for search */
  async getServices(): Promise<any[]> {
    return this.fileService.readJsonFile<any[]>('app_services.json');
  }
}
