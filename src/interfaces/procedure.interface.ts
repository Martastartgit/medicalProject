import {Document} from 'mongoose';

export interface IProcedure extends Document{
    _id: string,
    name: string,
    description: string,
    price: number,
    hasDiscount?: boolean,
    oldPrice?: number,
    createdAt: string,
    updatedAt: string
}
