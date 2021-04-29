import {Document, model, Model, Schema} from 'mongoose';

import {IProcedure} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type ProcedureType = IProcedure & Document;

export const ProcedureSchema = new Schema<IProcedure>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hasDiscount: {
    type: Boolean,
    required: false,
    default: false
  },
  oldPrice: {
    type: Number,
    required: false
  }

}, {
  timestamps: true
});

export const ProcedureModel: Model<ProcedureType> = model<ProcedureType>(TablesNameEnum.PROCEDURE, ProcedureSchema);
