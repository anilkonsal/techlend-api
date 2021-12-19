import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { ApplicantsService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { CreateAssetsLiabilitiesDto } from './dto/create-assets-liabilities.dto';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  async create(@Body() createApplicantDto: CreateApplicantDto) {
    return await this.applicantsService.create(createApplicantDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createAssetsLiabilitiesDto: CreateAssetsLiabilitiesDto,
  ) {
    return await this.applicantsService.addAssetsLiabilities(
      +id,
      createAssetsLiabilitiesDto,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.applicantsService.findOne(+id);
  }
}
