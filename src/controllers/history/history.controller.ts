import {NextFunction, Response} from 'express';

import {IRequest} from '../../interfaces';
import {historyService} from '../../services';

class HistoryController {
  async findAdminHistory(req: IRequest, res: Response, next: NextFunction){
    try {
      const { adminId } = req.params;

      const allHistories = await historyService.findHistories({ adminId });

      res.json(allHistories);
    } catch (e) {
      next(e);
    }
  }
}

export const historyController = new HistoryController();
