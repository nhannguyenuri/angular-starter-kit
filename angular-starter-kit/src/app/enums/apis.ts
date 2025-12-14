const AUTH_SERVICE_URL = '';

export const APIS = {
  auth: {
    signIn: AUTH_SERVICE_URL + '/auth/sign-in',
    me: AUTH_SERVICE_URL + '/auth/me',
  },
} as const;
