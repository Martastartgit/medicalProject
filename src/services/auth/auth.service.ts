import {IToken} from '../../interfaces';
import {TokenModel} from '../../database';

class AuthService {
  createToken(tokenObject: Partial<IToken>): Promise<IToken> {
    return TokenModel.create(tokenObject);
  }

  createNewTokens(id: string, tokens: Partial<IToken>): Promise<IToken> {
    return TokenModel.findByIdAndUpdate(id, tokens) as any;
  }

  findTokenByParams(findObject: any): Promise<IToken | null> {
    return TokenModel.findOne(findObject) as any;
  }

}
export const authService = new AuthService();
