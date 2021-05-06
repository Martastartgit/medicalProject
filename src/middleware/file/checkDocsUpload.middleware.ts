import {NextFunction, Response} from 'express';
import {UploadedFile} from 'express-fileupload';

import {IRequest} from '../../interfaces';
import {CodesEnum, FilesTypeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

export const checkDocsUpload = (req: IRequest, res: Response, next: NextFunction): void | NextFunction => {
  try {
    const files = req.files?.docs as UploadedFile[];

    if (!files) {
      return next();
    }

    const docs = [];

    const file = Object.values(files);

    for (let i = 0; i < file.length; i++) {
      const {size, mimetype} = file[i];

      if (FilesTypeEnum.DOCS_MIMETYPES.includes(mimetype)) {
        if (FilesTypeEnum.FILE_MAX_SIZE < size) {
          throw new ErrorHandler(
            CodesEnum.BAD_REQUEST,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.message,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.code);
        }

        docs.push(file[i]);
      }
      req.docs = docs;
    }

    next();

  } catch (e) {
    next(e);
  }

};
