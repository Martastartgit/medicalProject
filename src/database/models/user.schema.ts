import {Document, model, Model, Schema} from 'mongoose';
import {IUser} from '../../interfaces';
import {GenderEnum, RolesEnum, StatusEnum, TablesNameEnum} from '../../constants';

export type UserType = IUser & Document;

const tokenSubModel = {
  action: String,
  token: String
};

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 4,
    maxlength: 25,
    required: true
  },
  surname: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true
  },
  gender: {
    type: String,
    enum :[GenderEnum.FEMALE, GenderEnum.MALE],
    required: false
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  phone : {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: RolesEnum.USER
  },
  status: {
    type: String,
    required: true,
    default: StatusEnum.PENDING
  },
  tokens: [tokenSubModel]

},
{timestamps:true}
);
export const UserModel: Model<UserType> = model<UserType>(TablesNameEnum.USER, UserSchema);
