import {Document, model, Model, Schema} from 'mongoose';

import {IProcedure} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type ProcedureType = IProcedure & Document;

export const ProcedureSchema = new Schema<IProcedure>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String
  },
  symptoms: {
    type: String,
    minlength: 2,
    maxlength: 9999,
    required: false
  },
  causes: {
    type: String,
    minlength: 2,
    maxlength: 9999,
    required: false
  },
  diagnosis: {
    type: String,
    minlength: 2,
    maxlength: 9999,
    required: false
  },
  treatment: {
    type: String,
    minlength: 2,
    maxlength: 9999,
    required: false
  }

}, {
  timestamps: true
});

export const ProcedureModel: Model<ProcedureType> = model<ProcedureType>(TablesNameEnum.PROCEDURE, ProcedureSchema);
