import {Document, model, Model, Schema} from 'mongoose';

import {IClinic} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type ClinicType = IClinic & Document

const AddressSubModel = {
  city: String,
  street: String,
  number: String
};

const WorkDaySubModel = {
  day: String,
  hour:String
};
export const ClinicSchema = new Schema<IClinic>({
  phone : {
    type: String,
    required: true
  },
  email:[{
    type: String,
    required: true,
    unique: true
  }],
  photo:[{
    type: String
  }],
  address: {AddressSubModel},
  workDay: [WorkDaySubModel],
  Doctors: [{
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.DOCTOR,
    required: true
  }],
  Departments : [{
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.DEPARTMENT,
    required: true
  }]

},
{timestamps:true}
);

export const ClinicModel: Model<ClinicType> = model<ClinicType>(TablesNameEnum.CLINIC, ClinicSchema);
