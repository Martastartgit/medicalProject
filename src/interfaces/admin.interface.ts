import {Document} from 'mongoose';

import {AdminsActionEnum} from '../constants';

export interface IAdminToken {
    action?: AdminsActionEnum,
    token?: string
}

export interface IAdmin extends Document {
    _id: string,
    name: string,
    surname: string,
    password: string,
    email: string,
    role: string,
    status: string,
    tokens?: [IAdminToken],
    createdAt: string,
    updatedAt: string
}
