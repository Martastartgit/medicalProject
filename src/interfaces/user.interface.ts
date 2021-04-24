import {Document} from 'mongoose';
import {UsersActionEnum} from '../constants';

export interface IUserToken {
    action?: UsersActionEnum,
    token?: string
}

export interface IUser extends Document {
    _id: string,
    name: string,
    surname: string,
    gender?: string,
    email: string,
    password: string,
    phone: number,
    city: string,
    role: string,
    status: string,
    tokens?: [IUserToken],
    createdAt: string
}
