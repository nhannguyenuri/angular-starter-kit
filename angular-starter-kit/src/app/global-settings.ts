import { environment } from '../environments/environment';

export const GlobalSettings = {
  production: environment.production,
  logLevel: environment.logLevel,
  version: environment.version,
  startupUrl: environment.startupUrl,
  language: environment.language,
} as const;
