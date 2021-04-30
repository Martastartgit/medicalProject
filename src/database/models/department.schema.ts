import {Document, model, Model, Schema} from 'mongoose';

import {IDepartment} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type DepartmentType = IDepartment & Document

export const DepartmentSchema = new Schema<IDepartment>({
  name: {
    type: String,
    required: true
  },
  Doctors: [{
    type: Schema.Types.ObjectId, ref: TablesNameEnum.DOCTOR
  }],
  Procedures : [{
    type: Schema.Types.ObjectId, ref: TablesNameEnum.PROCEDURE
  }],
  Services: [{
    title: String,
    price: Number
  }]

},{
  timestamps: true
});

export const DepartmentModel: Model<DepartmentType> = model<DepartmentType>(TablesNameEnum.DEPARTMENT, DepartmentSchema);
