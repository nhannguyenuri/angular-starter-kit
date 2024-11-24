import { LOG_LEVEL } from '../app/utils/log/log.service';

export const environment = {
  production: false,
  logLevel: LOG_LEVEL.debug,
  version: '0.0.0',
  startupUrl: 'home',
  language: 'en',
} as const;
