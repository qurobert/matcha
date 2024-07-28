import jwt from "jsonwebtoken";

export class JWT {
  static sign(payload: string, secret: string, expiresIn: string) {
    return jwt.sign(payload, secret, {expiresIn});
  }
  static verify(token: string, secret: string, cb: any) {
    return jwt.verify(token, secret, cb);
  }
}

export class JWTAccessToken {
  static sign(payload: string) {
    return JWT.sign(payload, process.env.JWT_ACCESS_TOKEN ?? "", process.env.JWT_ACCESS_TOKEN_EXPIRES ?? "");
  }

  static verify(token: string, cb: (err: any, user: any) => any) {
    return JWT.verify(token, process.env.JWT_ACCESS_TOKEN ?? "", cb);
  }
}

export class JWTRefreshToken {
  static sign(payload: string) {
    return JWT.sign(payload, process.env.JWT_REFRESH_TOKEN ?? "", process.env.JWT_REFRESH_TOKEN_EXPIRES ?? "");
  }

  static verify(token: string, cb: (err: any, refreshTokenInfo: any) => Promise<any>) {
    return JWT.verify(token, process.env.JWT_REFRESH_TOKEN ?? "", cb);
  }
}