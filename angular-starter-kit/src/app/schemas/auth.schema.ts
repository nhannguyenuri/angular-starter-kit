export type SignInPayload= {
  username: string;
  password: string;
};

export type SignInResponse = {
  success: boolean;
  data: {
    accessToken: string;
    user: any;
  };
};

export type MeResponse = {
  success: boolean;
  data: any;
};
