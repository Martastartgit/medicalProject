import {Router} from 'express';

import {doctorController} from '../../controllers';
import {RolesEnum} from '../../constants';
import {
  checkAccessTokenMiddleware, checkDoctorsPhoto,
  checkPhotoUpload,
  isDoctorIdValidMiddleware,
  newDoctorValidationMiddleware
} from '../../middleware';

const router = Router();

router.route('/')
  .post(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    checkPhotoUpload,
    checkDoctorsPhoto,
    newDoctorValidationMiddleware,
    doctorController.createDoctor);

router.route('/:doctorId')
  .all(isDoctorIdValidMiddleware)
  .get(doctorController.findById)
  .post(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    checkPhotoUpload,
    checkDoctorsPhoto,
    newDoctorValidationMiddleware,
    doctorController.updateDoctor)
  .delete(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    doctorController.deleteDoctorById);

export const doctorRouter = router;

