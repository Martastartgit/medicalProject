import {Document} from 'mongoose';

export interface IHistory extends Document{
    event: any,
    userId: string,
    data: any,
    createdAt: string
}
