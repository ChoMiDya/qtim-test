import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS_METADATA_KEY = 'allow-anonymous-lab';

export const AllowAnonymous = () =>
  SetMetadata(ALLOW_ANONYMOUS_METADATA_KEY, true);
