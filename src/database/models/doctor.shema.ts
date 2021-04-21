import {Document, model, Model, Schema} from 'mongoose';

import {IDoctor} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type DoctorTYpe = IDoctor & Document

const DayOffSubModel = {
  day: String,
  date: String
};

const WorkDaySubModel = {
  day: String,
  hour: String
};

export const DoctorSchema = new Schema<IDoctor>({
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  photo:[{
    type: String
  }],
  experience: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  workDay: [WorkDaySubModel],
  dayOff: [DayOffSubModel]

},{
  timestamps: true
});

export const DoctorModel: Model<DoctorTYpe> = model<DoctorTYpe>(TablesNameEnum.DOCTOR, DoctorSchema);
