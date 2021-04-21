import {Document} from 'mongoose';

export interface IToken extends Document {
    _id: string,
    accessToken: string,
    refreshToken: string,
    userId?: string,
    adminId?: string,
    createdAt: string
}
