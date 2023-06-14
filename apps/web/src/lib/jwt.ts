import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOptions {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: '24h',
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log('🚀 ~ file: jwt.ts:26 ~ verifyJwt ~ error:', error);
    return null;
  }
}
