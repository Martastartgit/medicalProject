import {HistoryModel} from '../../database/models';
import {IHistory} from '../../interfaces';

class HistoryService {
  createHistory(historyObject: Partial<IHistory>): Promise<IHistory>{
    return HistoryModel.create(historyObject);
  }
}

export const historyService = new HistoryService();
