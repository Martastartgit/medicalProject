import {NextFunction, Request, Response} from 'express';
import {procedureService} from '../../services';

class ProcedureController {
  async createNewProcedure(req: Request, res: Response, next: NextFunction) {
    try {
      const procedure = await procedureService.createProcedure(req.body);

      res.json(procedure);
    } catch (e) {
      next(e);
    }
  }
}

export const procedureController = new ProcedureController();
