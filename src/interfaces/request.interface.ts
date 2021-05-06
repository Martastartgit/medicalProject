import {Request} from 'express';

import {IAdmin} from './admin.interface';
import {IDoctor} from './doctor.interface';
import {IUser} from './user.interface';
import {IProcedure} from './procedure.interface';
import {IToken} from './token.interface';

export interface IRequest extends Request{
    admin?: IAdmin,
    user?: IUser,
    token?: IToken,
    doctor?: IDoctor,
    procedure?: IProcedure,
    photos?: any,
    docs?: any,
    videos?: any
}
