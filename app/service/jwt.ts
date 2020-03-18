import { Service } from 'egg';

interface TokenPayload {
  uId: string;
  role: string;
}

interface TokenOptions {
  payload: TokenPayload;
  expiresIn: string;
}

export default class JwtService extends Service {
  public getTokenInfo() {
    const payload: unknown = this.app.jwt.verify(this.getToken(), this.app.config.jwt.secret);
    return payload as TokenPayload;
  }

  private getToken() {
    const str = this.ctx.header.authorization;
    const arr = str.split(' ');
    return arr[1];
  }

  public generateToken(options: TokenOptions) {
    const token = this.app.jwt.sign(options.payload, this.app.config.jwt.secret, {
      expiresIn: options.expiresIn
    });
    return token;
  }
}
