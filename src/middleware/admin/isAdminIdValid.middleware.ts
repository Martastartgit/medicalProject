import {NextFunction, Response} from 'express';
import mongoose from 'mongoose';

import {IAdmin,IRequest} from '../../interfaces';
import {customErrors, ErrorHandler} from '../../errors';
import {CodesEnum} from '../../constants';
import {adminService} from '../../services';

export const isAdminIdValidMiddleware =
    async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
      try {
        const { adminId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(adminId)) {
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NOT_VALID_ID.message);
        }

        const adminById = await adminService.findAdminById(adminId) as IAdmin;

        if (!adminById) {
          throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
        }

        req.admin = adminById;

        next();
      } catch (e) {
        next(e);
      }

    };
