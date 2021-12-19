import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateApplicantDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  photo: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
