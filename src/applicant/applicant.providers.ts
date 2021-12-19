import { APPLICANTS_REPOSITORY } from '../common/constants';
import { Applicant } from './entities/applicant.entity';

export const applicantProviders = [
  {
    provide: APPLICANTS_REPOSITORY,
    useValue: Applicant,
  },
];
