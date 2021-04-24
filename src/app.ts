import {NextFunction, Request, Response} from 'express';

import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as expressFileUpload from 'express-fileupload';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';
import * as rateLimit from 'express-rate-limit';

import {config} from './config';
import {CodesEnum} from './constants';
import {limitReached} from './helpers';
import {apiRouter} from './routers';

dotenv.config();

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests,
  handler: limitReached
});

const configureCors = {
  origin(origin: any, callback: any) {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (whiteList.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'), false);
  }
};

class App {
    public readonly app: express.Application = express();

    constructor() {
      (global as any).appRoot = path.resolve(process.cwd(), '../');

      this.app.use(helmet());
      this.app.use(morgan('dev'));
      this.app.use(cors(configureCors));

      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: true}));

      this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

      this.app.use(expressFileUpload());

      this.app.use('/', apiRouter);

      this.app.use(serverRequestLimit);

      this.connectMongoDB();

      this.app.use(this.customErrorHandler);

    }
    private connectMongoDB(): void {
      mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

      const connection = mongoose.connection;

      connection.on('error', console.log.bind(console, 'error'));

    }

    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
      res
        .status(err.status || CodesEnum.SERVER)
        .json({
          code: err.code,
          message: err.message || 'Unknown Error'
        });

    }

  // private configureCors = (origin: any, callback: any) => {
  //   const whiteList = config.ALLOWED_ORIGIN.split(';');
  //
  //   if (whiteList.indexOf(origin) !== -1 || !origin) {
  //     return callback(null, true);
  //   }
  //
  //   return callback(new Error('Not allowed by CORS'), false);
  //
  // }

}
export const app = new App().app;

