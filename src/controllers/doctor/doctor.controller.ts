import {adminHistoryEnum} from '../../constants';
import {IAdmin, IDoctor, IRequest} from '../../interfaces';
import {NextFunction, Response} from 'express';
import {doctorService, historyService} from '../../services';

class DoctorController {
  async createDoctor(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {_id} = req.admin as IAdmin;

      const doctor = await doctorService.createDoctor(req.body);

      await historyService.createHistory({
        event: adminHistoryEnum.ADMIN_CREATE_DOCTOR,
        adminId: _id,
        data: {
          doctorId: doctor._id,
          name: doctor.fullName
        }});

      res.json(doctor);
    } catch (e) {
      next(e);
    }
  }

  async findById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {doctorId} = req.params;

      const doctor = await doctorService.findDoctorById(doctorId);

      res.json(doctor);
    } catch (e) {
      next(e);
    }
  }

  async updateDoctor(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {doctorId} = req.params;
      const {_id} = req.admin as IAdmin;
      const doctor = req.doctor as IDoctor;

      await doctorService.updateDoctor(doctorId, req.body);

      await historyService.createHistory({
        event: adminHistoryEnum.ADMIN_UPDATE_DOCTOR,
        adminId: _id,
        data: {
          procedureId: doctorId,
          name: doctor.fullName
        }});

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteDoctorById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {doctorId} = req.params;
      const {_id} = req.admin as IAdmin;
      const doctor = req.doctor as IDoctor;

      await doctorService.deleteDoctor(doctorId);

      await historyService.createHistory({
        event: adminHistoryEnum.ADMIN_DELETE_DOCTOR,
        adminId: _id,
        data: {
          procedureId: doctorId,
          name: doctor.fullName
        }});

      res.end();
    } catch (e) {
      next(e);
    }
  }
}

export const doctorController = new DoctorController();
