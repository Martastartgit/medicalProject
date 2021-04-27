import {IAdmin, IToken, IUser} from '../../interfaces';
import {TokenModel} from '../../database';

class AuthService {
  createToken(tokenObject: Partial<IToken>): Promise<IToken> {
    return TokenModel.create(tokenObject);
  }

  createNewTokens(id: string, tokens: Partial<IToken>): Promise<IToken> {
    return TokenModel.findByIdAndUpdate(id, tokens) as any;
  }

  findTokenByParams(findObject: { accessToken?: string, refreshToken?: string }): Promise<IToken | null> {
    return TokenModel.findOne(findObject).exec();
  }

  findAdminByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<IAdmin | null> {
    return TokenModel.findOne(findObject).populate('adminId') as any;
  }

  findUserByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<IUser | null> {
    return TokenModel.findOne(findObject).populate('userId') as any;
  }

  removeToken(removeObject: { accessToken?: string, refreshToken?: string }): Promise<IToken | null> {
    return TokenModel.findOneAndDelete(removeObject).exec();
  }

}
export const authService = new AuthService();
