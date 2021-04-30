import * as mongoose from 'mongoose';
import {NextFunction, Response} from 'express';

import {IProcedure, IRequest} from '../../interfaces';
import {customErrors, ErrorHandler} from '../../errors';
import {CodesEnum} from '../../constants';
import {procedureService} from '../../services/procedure';

export const isIdValidMiddleware =
    async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
      try {
        const { procedureId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(procedureId)) {
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NOT_VALID_ID.message);
        }

        const procedureById = await procedureService.findProcedureById(procedureId) as IProcedure;

        if (!procedureById) {
          throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
        }

        req.procedure = procedureById;

        next();
      } catch (e) {
        next(e);
      }

    };
