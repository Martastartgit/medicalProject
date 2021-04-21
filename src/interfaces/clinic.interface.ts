import {Document} from 'mongoose';

export interface IClinicAddress {
    city: string,
    street: string,
    number: string
}

export interface IClinicWorks {
    day: string,
    hour: string
}

export interface IClinic extends Document {
    _id: string,
    phone: number[],
    email: string[],
    photo?: string[],
    address: IClinicAddress,
    workDay: [IClinicWorks],
    Doctors: string[],
    Departments: string[],
    createdAt: string,
    updatedAt: string
}
