import {NextFunction, Response} from 'express';

import {IRequest} from '../../interfaces';
import {departmentService} from '../../services';

class DepartmentController {
  async createNewDepartment(req: IRequest, res: Response, next: NextFunction) {
    try {
      const department = await departmentService.createDepartment(req.body);

      res.json(department);
    } catch (e) {
      next(e);
    }
  }

  async getOneById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {departmentId} = req.params;

      const department = await departmentService.findDepartmentById(departmentId);

      res.json(department);
    } catch (e) {
      next(e);
    }
  }

  async updateDepartment(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {departmentId} = req.params;

      await departmentService.updateOne(departmentId, req.body);

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteDepartment(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {departmentId} = req.params;

      await departmentService.deleteDepartment(departmentId);

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async getDepartments(req: IRequest, res: Response, next: NextFunction) {
    try {

      const departments = await departmentService.finf();

      res.json(departments);
    } catch (e) {
      next(e);
    }
  }
}

export const departmentController = new DepartmentController();
