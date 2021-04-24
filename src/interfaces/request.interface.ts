import {Request} from 'express';

import {IAdmin} from './admin.interface';
import {IUser} from './user.interface';

export interface IRequest extends Request{
    admin?: IAdmin,
    user?: IUser
}
