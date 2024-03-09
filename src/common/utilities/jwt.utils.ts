import { JwtService } from '@nestjs/jwt';
// import { TJwtRequest } from '@psu/entities';

const jwt = new JwtService();

export const generateAccessToken = async (payload: any): Promise<string> => {
  const accessToken = await jwt.signAsync(payload, {
    secret: process.env['ACCESS_SECRET'],
    expiresIn: '15m',
  });

  return accessToken;
};

export const generateRefreshToken = async (payload: any): Promise<string> => {
  const refreshToken = await jwt.signAsync(payload, {
    secret: process.env['REFRESH_SECRET'],
    expiresIn: '7d',
  });

  return refreshToken;
};
