import {Document, model, Model, Schema} from 'mongoose';

import {IToken} from '../../interfaces';
import {TablesNameEnum} from '../../constants';

export type TokenType = IToken & Document

export const TokenSchema = new Schema<IToken>({
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId, ref: TablesNameEnum.USER, required: false
  },
  adminId: {
    type: Schema.Types.ObjectId, ref: TablesNameEnum.ADMIN, required: false
  }
},{
  timestamps: true
}
);

export const TokenModel: Model<TokenType> = model<TokenType>(TablesNameEnum.TOKEN, TokenSchema);
