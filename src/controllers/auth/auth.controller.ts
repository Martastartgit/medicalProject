import {IAdmin, IRequest, IToken} from '../../interfaces';
import {NextFunction, Response} from 'express';
import {comparePassword, tokenizer} from '../../helpers';
import {AdminsActionEnum, CodesEnum, RequestHeadersEnum} from '../../constants';
import {authService, historyService} from '../../services';

class AuthController {
  async adminAuthorization(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {_id, password} = req.admin as IAdmin;

      const adminInfo = req.body;

      await comparePassword(adminInfo.password, password);

      const {access_token, refresh_token} = tokenizer(AdminsActionEnum.ADMIN_LOGIN);

      await authService.createToken({accessToken: access_token, refreshToken: refresh_token, adminId: _id});

      await historyService.createHistory({event: AdminsActionEnum.ADMIN_LOGIN, adminId: _id});

      res.json({access_token, refresh_token});

    } catch (e) {
      next(e);
    }

  }

  async createNewPair(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {_id, adminId} = req.token as IToken;

      const {access_token, refresh_token} = tokenizer(AdminsActionEnum.ADMIN_LOGIN);

      await authService.createNewTokens(_id, {accessToken: access_token, refreshToken: refresh_token, adminId});

      res.json({access_token, refresh_token});

    } catch (e) {
      next(e);
    }
  }

  async logout(req: IRequest, res: Response, next: NextFunction) {
    try {
      const accessToken = await req.get(RequestHeadersEnum.AUTHORIZATION);

      await authService.removeToken({accessToken});

      res.sendStatus(CodesEnum.NO_CONTENT);
    } catch (e) {
      next(e);
    }

  }




}
export const authController = new AuthController();
