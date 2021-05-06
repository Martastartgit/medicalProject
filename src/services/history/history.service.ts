import {HistoryModel} from '../../database/models';
import {IHistory} from '../../interfaces';

class HistoryService {
  createHistory(historyObject: Partial<IHistory>): Promise<IHistory>{
    return HistoryModel.create(historyObject);
  }

  removeHistory(removeObject: { adminId?: string, userId?: string }): Promise<IHistory | null> {
    return HistoryModel.findOneAndDelete(removeObject).exec();
  }
}

export const historyService = new HistoryService();
