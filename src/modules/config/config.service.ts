import { ConfigService as NestConfigService } from '@nestjs/config';
import { EnvironmentConfig } from 'src/config/environment.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {
    this.env = this.nestConfigService.get<EnvironmentConfig>('env')!;
  }

  env: EnvironmentConfig;
}
