import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { Applicant } from './entities/applicant.entity';
import { APPLICANTS_REPOSITORY } from '../common/constants';
import { CreateAssetsLiabilitiesDto } from './dto/create-assets-liabilities.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { FinancialPosition } from '../common/types';

@Injectable()
export class ApplicantsService {
  constructor(
    @Inject(APPLICANTS_REPOSITORY)
    private applicantRepository: typeof Applicant,
    private configService: ConfigService,
  ) {}

  async create(createApplicantDto: CreateApplicantDto) {
    const applicant = await this.applicantRepository.create<Applicant>(
      createApplicantDto as Applicant,
    );
    return applicant;
  }

  async findOne(id: number) {
    const applicant = await this.applicantRepository.findByPk(id);
    return applicant;
  }

  async addAssetsLiabilities(
    id: number,
    createAssetsLiabilitiesDto: CreateAssetsLiabilitiesDto,
  ) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { id },
        attributes: ['id'],
      });

      if (!applicant) throw new NotFoundException('Applicant not found');

      const upApplicant = await this.applicantRepository.findOne({
        where: { id },
      });

      const {
        salaryPerQuater,
        creditCardDebtAmount,
        homeLoaDebtAmount,
        carLoaDebtAmount,
        totalBankSavingsAmount,
        nameOfStock,
        valueOfStock,
      } = createAssetsLiabilitiesDto;
      const change = await this.checkStockValue(nameOfStock);

      const { totalAssets, totalLiabilities } = this.getAssetsLiabilities(
        salaryPerQuater,
        creditCardDebtAmount,
        homeLoaDebtAmount,
        carLoaDebtAmount,
        totalBankSavingsAmount,
        valueOfStock,
      );

      const status = this.getStatus(totalAssets, totalLiabilities, change);

      const data = { ...createAssetsLiabilitiesDto, status };
      applicant.set(data as unknown as Applicant);
      await applicant.save();
      return upApplicant;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  /**
   * Get status based on different conditions
   * @param totalAssets
   * @param totalLiabilities
   * @param change
   * @returns string
   */
  getStatus(
    totalAssets: number,
    totalLiabilities: number,
    change: number,
  ): string {
    return change < 0
      ? 'warning'
      : totalAssets > totalLiabilities
      ? 'approved'
      : 'rejected';
  }

  /**
   * Calculates the total assets and total Liabilities
   * @param salaryPerQuater
   * @param creditCardDebtAmount
   * @param homeLoaDebtAmount
   * @param carLoaDebtAmount
   * @param totalBankSavingsAmount
   * @param valueOfStock
   * @returns FinancialPosition
   */
  getAssetsLiabilities(
    salaryPerQuater: number,
    creditCardDebtAmount: number,
    homeLoaDebtAmount: number,
    carLoaDebtAmount: number,
    totalBankSavingsAmount: number,
    valueOfStock: number,
  ): FinancialPosition {
    const totalAssets =
      Number(salaryPerQuater) +
      Number(totalBankSavingsAmount) +
      Number(valueOfStock);

    const totalLiabilities =
      Number(creditCardDebtAmount) +
      Number(homeLoaDebtAmount) +
      Number(carLoaDebtAmount);

    return { totalAssets, totalLiabilities };
  }

  /**
   * Function to check the stock value by making http call to third paty
   * @param code
   * @returns number
   */
  async checkStockValue(code: string): Promise<number> {
    const apiKey = this.configService.get('alphaVantage.key');
    const changeKeyStr = this.configService.get('alphaVantage.changeKeyStr');
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${code}&apikey=${apiKey}`;

    try {
      const { data } = await axios.get(url);
      console.log(data);
      const change = data['Global Quote'][changeKeyStr];
      return +change;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
