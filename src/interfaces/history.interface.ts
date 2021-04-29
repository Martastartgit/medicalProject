import {Document} from 'mongoose';
import {adminHistoryEnum, UserHistoryEnum} from '../constants';

export interface IHistory extends Document{
    event: UserHistoryEnum | adminHistoryEnum,
    userId?: string,
    adminId?: string,
    data: any,
    createdAt: string
}
