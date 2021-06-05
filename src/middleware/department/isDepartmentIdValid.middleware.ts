import * as mongoose from 'mongoose';
import {NextFunction, Response} from 'express';

import {CodesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {IDepartment, IRequest} from '../../interfaces';
import {departmentService} from '../../services';

export const isDepartmentIdValidMiddleware =
    async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
      try {
        const { departmentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NOT_VALID_ID.message);
        }

        const departmentById = await departmentService.findDepartmentById(departmentId) as IDepartment;

        if (!departmentById) {
          throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
        }

        next();
      } catch (e) {
        next(e);
      }

    };
