import {Document, model, Model, Schema} from 'mongoose';

import {IAdmin} from '../../interfaces';
import {RolesEnum, StatusEnum, TablesNameEnum} from '../../constants';

export type AdminType = IAdmin & Document;

const tokenSubModel = {
  action: String,
  token: String
};

export const AdminSchema = new Schema<IAdmin>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 25,
    required: true
  },
  surname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    default: RolesEnum.ADMIN
  },
  status: {
    type: String,
    required: true,
    default: StatusEnum.ADMIN_PENDING
  },
  tokens: [tokenSubModel]

},
{
  timestamps: true
}
);

export const AdminModel: Model<AdminType> = model<AdminType>(TablesNameEnum.ADMIN, AdminSchema);

