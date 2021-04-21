import {Document} from 'mongoose';

export interface IRecord extends Document{
    _id: string,
    userId: string,
    doctorId?: string,
    procedureId?: string,
    createdAt: string

}

