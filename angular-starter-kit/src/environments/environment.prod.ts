import { LOG_LEVEL } from '../app/utils/log/logger';

export const environment = {
  production: true,
  logLevel: LOG_LEVEL.info,
  version: '0.0.0',
  startupUrl: 'home',
  language: 'en',
} as const;
