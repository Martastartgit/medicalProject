import {NextFunction, Request, Response} from 'express';

import {IAdmin, IRequest} from '../../interfaces';
import {adminService} from '../../services/admin';
import {AdminsActionEnum, CodesEnum, HistoryEnum, StatusEnum} from '../../constants';
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
      const {_id} = req.admin as IAdmin;

      await adminService.updateByParams(_id, {status: StatusEnum.ADMIN_CONFIRMED});

      await historyService.createHistory({event: HistoryEnum.CONFIRMED, adminId: _id});

      res.end();
    } catch (e) {
      next(e);
    }

  }
}

export const adminController = new AdminController();
