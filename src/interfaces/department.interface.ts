import {Document} from 'mongoose';

export interface IDepartment extends Document{
    _id: string,
    name: string,
    Doctors: string[],
    Procedures: string[]

}
