import {Request} from 'express';

import {IAdmin} from './admin.interface';
import {IUser} from './user.interface';
import {IToken} from './token.interface';

export interface IRequest extends Request{
    admin?: IAdmin,
    user?: IUser,
    token?: IToken
}
