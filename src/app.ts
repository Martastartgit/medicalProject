import {NextFunction, Request, Response} from 'express';

// import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as expressFileUpload from 'express-fileupload';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';

import {config} from './config';
import {CodesEnum} from './constants';
import {limitReached} from './helper';

dotenv.config();

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests,
  handler: limitReached
});

class App {
    public readonly app: express.Application = express();

    constructor() {
      this.app.use(helmet());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(expressFileUpload());
      this.app.use(morgan('dev'));
      this.app.use(serverRequestLimit);

      this.connectMongoDB();

      this.app.use(this.customErrorHandler);

    }
    private connectMongoDB(): void {
      mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
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

}
export const app = new App().app;

