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
  timestamps: true,
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
});

DepartmentSchema.virtual('departmentDoctors', {
  ref: 'doctor',
  localField: 'Doctors',
  foreignField: '_id'
});

DepartmentSchema
  .pre('find', function() {
    this.populate('departmentDoctors');
  })
  .pre('findOne', function() {
    this.populate('departmentDoctors');
  });

export const DepartmentModel: Model<DepartmentType> = model<DepartmentType>(TablesNameEnum.DEPARTMENT, DepartmentSchema);
