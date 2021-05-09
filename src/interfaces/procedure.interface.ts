import {Document} from 'mongoose';

export interface IProcedure extends Document{
    _id: string,
    name?: string,
    description?: string,
    symptoms?: string,
    causes?: string,
    diagnosis?: string,
    treatment?: string,
    createdAt: string,
    updatedAt: string
}

export interface IProcedureFilterQuery {
    limit?: number,
    page?: number,
    sortBy?: string,
    orderBy?: string,
    name?: string
}

