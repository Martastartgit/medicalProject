import * as mongoose from 'mongoose';
import {NextFunction, Response} from 'express';

import {CodesEnum} from '../../constants';
import {IDoctor, IRequest} from '../../interfaces';
import {customErrors, ErrorHandler} from '../../errors';
import {doctorService} from '../../services';

export const isDoctorIdValidMiddleware =
    async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
      try {
        const { doctorId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NOT_VALID_ID.message);
        }

        const doctorById = await doctorService.findDoctorById(doctorId) as IDoctor;

        if (!doctorById) {
          throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
        }

        req.doctor = doctorById;

        next();
      } catch (e) {
        next(e);
      }

    };
