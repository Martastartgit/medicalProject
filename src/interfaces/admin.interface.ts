import {Document} from 'mongoose';

import {AdminActionEnum} from '../constants';

export interface IAdminToken {
    action?: AdminActionEnum,
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
