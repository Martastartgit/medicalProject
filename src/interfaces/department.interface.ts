import {Document} from 'mongoose';

export interface IServices {
    title: string,
    price: number
}

export interface IDepartment extends Document{
    _id: string,
    name: string,
    Doctors: string[],
    Procedures: string[],
    Services: [IServices]

}
