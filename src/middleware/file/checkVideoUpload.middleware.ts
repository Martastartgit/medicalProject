import {NextFunction, Response} from 'express';
import {UploadedFile} from 'express-fileupload';

import {IRequest} from '../../interfaces';
import {CodesEnum, FilesTypeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

export const checkVideoUpload = (req: IRequest, res: Response, next: NextFunction): void | NextFunction => {
  try {
    const video = req.files?.videos as UploadedFile[];

    if (!video) {
      return next();
    }

    const videos = [];

    const videoValue = Object.values(video);

    for (let i = 0; i < videoValue.length; i++) {
      const {size, mimetype} = videoValue[i];

      if (FilesTypeEnum.VIDEOS_MIMETYPES.includes(mimetype)) {
        if (FilesTypeEnum.VIDEO_MAX_SIZE < size) {
          throw new ErrorHandler(
            CodesEnum.BAD_REQUEST,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.message,
            customErrors.BAD_REQUEST_FILE_MAX_SIZE.code);
        }

        videos.push(videoValue[i]);
      }

    }

    req.videos = videos;

    next();

  } catch (e) {
    next(e);
  }

};
