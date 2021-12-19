import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantModule } from './applicant/applicant.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.staging'],
      load: [configuration],
      isGlobal: true,
    }),
    ApplicantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
