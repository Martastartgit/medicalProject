import {Document} from 'mongoose';

export interface IComment extends Document {
    _id: string,
    userId: string,
    text: string,
    createdAt: string

}
