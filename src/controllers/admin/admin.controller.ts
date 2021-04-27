import {NextFunction, Request, Response} from 'express';

import {IAdmin, IRequest} from '../../interfaces';
import {adminService} from '../../services/admin';
import {AdminsActionEnum, CodesEnum, HistoryEnum, RequestHeadersEnum, StatusEnum} from '../../constants';
import {hashPassword, tokenizer} from '../../helpers';
import {historyService} from '../../services/history';
import {emailService} from '../../services';

class AdminController {
  async createAdmin(req: Request, res: Response, next: NextFunction){
    try {
      const admin = req.body as IAdmin;

      admin.password = await hashPassword(admin.password);

      const {_id} = await adminService.createAdmin(admin);

      const {access_token} = tokenizer(AdminsActionEnum.ADMIN_REGISTER);

      await adminService.addActionToken(_id, {action: AdminsActionEnum.ADMIN_REGISTER, token: access_token});

      await emailService.sendMail(admin.email, AdminsActionEnum.ADMIN_REGISTER, {token: access_token});

      await historyService.createHistory({event: HistoryEnum.REGISTERED, adminId: _id});

      res.sendStatus(CodesEnum.CREATED);

    } catch (e) {
      next(e);
    }

  }

  async confirmAdmin(req: IRequest, res: Response, next: NextFunction){
    try {
      const {_id, tokens = []} = req.admin as IAdmin;

      const tokenToDelete = await req.get(RequestHeadersEnum.AUTHORIZATION);

      const newToken = tokens.filter((item)=> item.token !== tokenToDelete);

      await adminService.updateByParams(_id, {status: StatusEnum.ADMIN_CONFIRMED, tokens: newToken}as Partial<IAdmin>);

      await historyService.createHistory({event: HistoryEnum.CONFIRMED, adminId: _id});

      res.end();
    } catch (e) {
      next(e);
    }

  }

  async forgotPassword(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {_id, email} = req.admin as IAdmin;

      const {access_token} = tokenizer(AdminsActionEnum.FORGOT_PASSWORD);

      await adminService.addActionToken(_id, {action: AdminsActionEnum.FORGOT_PASSWORD, token: access_token});

      await emailService.sendMail(email, AdminsActionEnum.FORGOT_PASSWORD, {token: access_token});

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async setNewPassword(req: IRequest, res: Response, next: NextFunction){
    try {
      const {_id, tokens = []} = req.admin as IAdmin;
      const {password} = req.body;

      const tokenToDelete = await req.get(RequestHeadersEnum.AUTHORIZATION);

      const newPassword = await hashPassword(password);

      const newToken = tokens.filter((item)=> item.token !== tokenToDelete);

      await adminService.updateByParams(_id, {password: newPassword, tokens: newToken} as Partial<IAdmin>);

      res.end();
    } catch (e) {
      next(e);
    }
  }
}

export const adminController = new AdminController();
