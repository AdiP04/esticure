import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { HospitalModule } from './modules/hospital/hospital.module';

@Module({
  imports: [UserModule, HospitalModule],
})
export class AppModule {}
