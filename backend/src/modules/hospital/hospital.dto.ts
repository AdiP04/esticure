// DTOs for Hospital module endpoints

export class HospitalLoginDto {
  email: string;
  password: string;
}

export class MatchHospitalsDto {
  city: string;
  insuranceCompany?: string;
  serviceId: string;
}
