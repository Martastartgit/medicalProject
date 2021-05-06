import {NextFunction, Response} from 'express';
import { UploadedFile } from 'express-fileupload';

import {IRequest} from '../../interfaces';
import {CodesEnum, FilesTypeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

export const checkPhotoUpload = (req: IRequest, res: Response, next: NextFunction): void | NextFunction => {
  try {
    const files = req.files?.photo as UploadedFile;

    if (!files) {
      return next();
    }

    if (Array.isArray(files)) {
      const photos = [];
      const file = Object.values(files);

      for (let i = 0; i < file.length; i++) {
        const {size, mimetype} = file[i];

        if (FilesTypeEnum.PHOTOS_MIMETYPES.includes(mimetype)) {
          if (FilesTypeEnum.PHOTO_MAX_SIZE < size) {
            throw new ErrorHandler(
              CodesEnum.BAD_REQUEST,
              customErrors.BAD_REQUEST_FILE_MAX_SIZE.message,
              customErrors.BAD_REQUEST_FILE_MAX_SIZE.code);
          }

          photos.push(file[i]);
        }
      }
      req.photos = photos;
    } else {

      const {size, mimetype} = files;

      if (FilesTypeEnum.PHOTOS_MIMETYPES.includes(mimetype)) {
        if (FilesTypeEnum.PHOTO_MAX_SIZE < size) {
          throw new ErrorHandler(
            CodesEnum.BAD_REQUEST,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.message,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.code);
        }
        req.photos = files;
      }
    }

    next();

  } catch (e) {
    next(e);
  }

};

