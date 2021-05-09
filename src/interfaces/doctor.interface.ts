import {Document} from 'mongoose';

export interface IDoctorWorkDay {
    day: string,
    hour: string
}
export interface IDoctorDayOff {
    day: string,
    date?: string
}
export interface IDoctor extends Document {
    _id: string,
    fullName: string,
    age?: number,
    photo?: string[],
    experience: string,
    profession: string,
    workDay: [IDoctorWorkDay],
    dayOff?: [IDoctorDayOff],
    createdAt: string,
    updatedAt: string
}

export interface IDoctorFilterQuery {
    limit?: number,
    page?: number,
    sortBy?: string,
    orderBy?: string,
    fullName?: string,
    profession?: string
}

