import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import * as dotenv from 'dotenv';

dotenv.config();

export class EnvironmentConfig {
  @IsNumber()
  @IsOptional()
  APP_PORT: number = 3000;

  @IsString()
  @IsOptional()
  APP_HOST: string = '0.0.0.0';

  @IsInt()
  AUTHENTICATION_TOKEN_EXPIRES_IN!: number;

  @IsInt()
  REFRESH_TOKEN_EXPIRES_IN!: number;

  @IsString()
  AUTHENTICATION_TOKEN_SECRET!: string;
}

function loadConfig(): () => EnvironmentConfig {
  const validatedConfig = plainToClass(EnvironmentConfig, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return () => validatedConfig;
}

const getConfig = loadConfig();

export const config = getConfig();

export default registerAs('env', getConfig);
