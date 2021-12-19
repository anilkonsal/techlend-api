import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAssetsLiabilitiesDto {
  @IsNotEmpty()
  salaryPerQuater: number;

  @IsNotEmpty()
  creditCardDebtAmount: number;

  @IsNotEmpty()
  homeLoaDebtAmount: number;

  @IsNotEmpty()
  carLoaDebtAmount: number;

  @IsNotEmpty()
  totalBankSavingsAmount: number;

  @IsNotEmpty()
  nameOfStock: string;

  @IsNotEmpty()
  valueOfStock: number;
}
