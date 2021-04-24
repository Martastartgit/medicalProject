import {Document, model, Model, Schema} from 'mongoose';

import {IHistory} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type HistoryType = IHistory & Document

export const HistorySchema = new Schema<IHistory>({
  event: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.USER,
    required: false
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.ADMIN,
    required: false
  },
  data: Schema.Types.Mixed
},{
  timestamps: true
});

export const HistoryModel: Model<HistoryType> = model<HistoryType>(TablesNameEnum.HISTORY, HistorySchema);
