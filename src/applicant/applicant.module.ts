import { Module, RequestMethod } from '@nestjs/common';
import { ApplicantsService } from './applicant.service';
import { ApplicantsController } from './applicant.controller';
import { DatabaseModule } from '../database.module';
import { applicantProviders } from './applicant.providers';
// import { EmailService } from '../email/email.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicantsController],
  // providers: [ApplicantsService, EmailService, ...applicantProviders],
  providers: [ApplicantsService, ...applicantProviders],
})
export class ApplicantModule {}
