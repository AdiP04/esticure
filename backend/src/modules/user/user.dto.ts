// DTOs for User module endpoints

export class VerifyOtpDto {
  mobile: string;
  otp: string;
}

export class InsuranceDto {
  hasInsurance: boolean;
  company?: string;
  limit?: number;
}

export class MedicalDto {
  problem: string;
  department: string;
  subsection: string;
  service: string;
  serviceId?: string;
}

export class ContextDto {
  lastDoctor?: string;
  consultedBefore: boolean;
}

export class CreateUserDto {
  name: string;
  mobile: string;
  email: string;
  city: string;
  insurance: InsuranceDto;
  medical: MedicalDto;
  context: ContextDto;
}

export class DoctorVisitDto {
  doctorName: string;
  visitDate: string;
  visitTime?: string;
  notes?: string;
}

export class UpdateUserDto {
  status?: 'new' | 'contacted' | 'converted' | 'rejected';
  remark?: string;
  doctorVisit?: DoctorVisitDto;
}
