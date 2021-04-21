import {Document, model, Model, Schema} from 'mongoose';

import {IRecord} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type RecordType = IRecord & Document
export const RecordSchema = new Schema<IRecord>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.USER,
    required: true
  },
  doctorId: [{
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.DOCTOR,
    required: false
  }],
  procedureId : [{
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.PROCEDURE,
    required: false
  }]
}, {
  timestamps: true
});

export const RecordModel: Model<RecordType> = model<RecordType>(TablesNameEnum.RECORD, RecordSchema);
