import {Document, model, Model, Schema} from 'mongoose';

import {IComment} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type CommentType =IComment & Document

export const CommentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: TablesNameEnum.USER,
    required: true
  },
  text: {
    type: String
  }
},{
  timestamps: true
});

export const CommentModel: Model<CommentType> = model<CommentType>(TablesNameEnum.COMMENT, CommentSchema);
