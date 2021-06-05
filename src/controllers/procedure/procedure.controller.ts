import {NextFunction, Response} from 'express';

import {adminHistoryEnum} from '../../constants';
import {IAdmin, IProcedure, IRequest} from '../../interfaces';
import {historyService, procedureService} from '../../services';

class ProcedureController {
  async createNewProcedure(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {_id} = req.admin as IAdmin;

      const procedure = await procedureService.createProcedure(req.body);

      await historyService.createHistory({
        event: adminHistoryEnum.ADMIN_CREATE_PROCEDURE,
        adminId: _id,
        data: {
          procedureId: procedure._id,
          name: procedure.name
        }});

      res.json(procedure);
    } catch (e) {
      next(e);
    }
  }

  async findProcedures(req: IRequest, res: Response, next: NextFunction) {
    try {
      const procedures = await procedureService.getProcedures(req.query );

      res.json(procedures);
    } catch (e) {
      next(e);
    }
  }

  async getOneById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {procedureId} = req.params;

      const procedure = await procedureService.findProcedureById(procedureId);

      res.json(procedure);
    } catch (e) {
      next(e);
    }
  }

  async updateProcedure(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {procedureId} = req.params;
      const {_id} = req.admin as IAdmin;
      const procedure = req.procedure as IProcedure;

      await procedureService.updateProcedure(procedureId, req.body);

      await historyService.createHistory({
        event: adminHistoryEnum.ADMIN_UPDATE_PROCEDURE,
        adminId: _id,
        data: {
          procedureId: procedure._id,
          name: procedure.name
        }});

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteProcedure(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {procedureId} = req.params;
      const {_id} = req.admin as IAdmin;
      const procedure = req.procedure as IProcedure;

      await procedureService.deleteProcedure(procedureId);

      await historyService.createHistory({
        event: adminHistoryEnum.ADMIN_DELETE_PROCEDURE,
        adminId: _id,
        data: {
          procedureId: procedure._id,
          name: procedure.name
        }});

      res.end();
    } catch (e) {
      next(e);
    }
  }

}

export const procedureController = new ProcedureController();
