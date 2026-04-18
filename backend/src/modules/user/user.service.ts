import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from '../../utils/file.service';
import { MatchingService } from '../../utils/matching.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

// Hardcoded OTP for demo
const DEMO_OTP = '123123';

@Injectable()
export class UserService {
  constructor(
    private readonly fileService: FileService,
    private readonly matchingService: MatchingService,
  ) {}

  /** Verify OTP – always accepts 123123 */
  verifyOtp(mobile: string, otp: string): { success: boolean; message: string } {
    if (otp === DEMO_OTP) {
      return { success: true, message: 'OTP verified successfully' };
    }
    return { success: false, message: 'Invalid OTP. Please try again.' };
  }

  /** Create a new user, run hospital matching, persist to users.json */
  async createUser(dto: CreateUserDto): Promise<any> {
    const users = await this.fileService.readJsonFile<any[]>('users.json');

    // Run hospital matching
    const serviceId = dto.medical?.serviceId || 's1';
    const insuranceCompany = dto.insurance?.hasInsurance
      ? dto.insurance.company || null
      : null;

    const matched = await this.matchingService.matchHospitals(
      dto.city,
      insuranceCompany,
      serviceId,
    );
    const overall = this.matchingService.computeOverallRange(matched);

    const newUser = {
      id: uuidv4(),
      name: dto.name,
      mobile: dto.mobile,
      email: dto.email,
      city: dto.city,
      insurance: dto.insurance,
      medical: dto.medical,
      context: dto.context,
      status: 'new',
      hospitalMatch: {
        matchedHospitals: matched.map((h) => h.id),
        matchedHospitalDetails: matched,
        estimatedCostMin: overall.min,
        estimatedCostMax: overall.max,
      },
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await this.fileService.writeJsonFile('users.json', users);

    return newUser;
  }

  /** Get all users, optionally filtered by hospitalId */
  async getUsers(hospitalId?: string): Promise<any[]> {
    const users = await this.fileService.readJsonFile<any[]>('users.json');

    if (!hospitalId) return users;

    // Return only users whose matchedHospitals includes this hospitalId
    return users.filter(
      (u) =>
        u.hospitalMatch?.matchedHospitals?.includes(hospitalId),
    );
  }

  /** Get a single user by id */
  async getUserById(id: string): Promise<any> {
    const users = await this.fileService.readJsonFile<any[]>('users.json');
    const user = users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  /** Update user: status, remark, doctor visit */
  async updateUser(id: string, dto: UpdateUserDto): Promise<any> {
    const users = await this.fileService.readJsonFile<any[]>('users.json');
    const idx   = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException(`User ${id} not found`);

    const user: any = { ...users[idx] };

    // ── Status ─────────────────────────────────────────────────
    if (dto.status) {
      const validStatuses = ['new', 'contacted', 'converted', 'rejected'];
      if (!validStatuses.includes(dto.status)) {
        throw new BadRequestException(`Invalid status: ${dto.status}`);
      }
      user.status = dto.status;
    }

    // ── Remark ─────────────────────────────────────────────────
    if (dto.remark && dto.remark.trim()) {
      if (!Array.isArray(user.remarks)) user.remarks = [];
      user.remarks.push({
        text:      dto.remark.trim(),
        createdAt: new Date().toISOString(),
      });
    }

    // ── Doctor Visit ───────────────────────────────────────────
    if (dto.doctorVisit) {
      if (!Array.isArray(user.doctorVisits)) user.doctorVisits = [];
      user.doctorVisits.push({
        ...dto.doctorVisit,
        scheduledAt: new Date().toISOString(),
      });
      // Most recent visit is the canonical one
      user.doctorVisit = user.doctorVisits[user.doctorVisits.length - 1];
    }

    user.updatedAt = new Date().toISOString();
    users[idx]     = user;
    await this.fileService.writeJsonFile('users.json', users);
    return user;
  }
}
