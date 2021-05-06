import {NextFunction, Response} from 'express';

import {IRequest} from '../../interfaces';
import {customErrors, ErrorHandler} from '../../errors';
import {CodesEnum} from '../../constants';

export const checkDoctorsPhoto = (req: IRequest, res: Response, next: NextFunction): void | NextFunction => {
  const photos = req.photos;

  if (!photos) {
    return next();
  }

  if (photos.length > 1) {
    return next(new ErrorHandler(
      CodesEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_REQUIRED_ONE_PHOTO.message,
      customErrors.BAD_REQUEST_REQUIRED_ONE_PHOTO.code));

  }

  next();

};
