import {Router} from 'express';

import {AdminsActionEnum, RolesEnum, StatusEnum} from '../../constants';
import {adminController, historyController} from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkAdminAccessTokenMiddleware,
  checkIsEmailInDBMiddleware,
  checkIsEmailValidMiddleware,
  checkIsPasswordValidMiddleware,
  checkStatusMiddleware, isAdminIdValidMiddleware,
  isBodyValidMiddleware,
  isEmailExistMiddleware
} from '../../middleware';

const router = Router();

router.post('/',
  isEmailExistMiddleware(RolesEnum.ADMIN),
  isBodyValidMiddleware(RolesEnum.ADMIN),
  adminController.createAdmin);

router.post('/confirm',
  checkAdminAccessTokenMiddleware(AdminsActionEnum.ADMIN_REGISTER),
  checkStatusMiddleware(StatusEnum.ADMIN_PENDING),
  adminController.confirmAdmin);

router.post('/password/forgot',
  checkIsEmailValidMiddleware,
  checkIsEmailInDBMiddleware(RolesEnum.ADMIN),
  adminController.forgotPassword);

router.post('/password/reset',
  checkAdminAccessTokenMiddleware(AdminsActionEnum.FORGOT_PASSWORD),
  checkIsPasswordValidMiddleware,
  adminController.setNewPassword);

router.route('/:adminId')
  .all(isAdminIdValidMiddleware,
    checkAccessTokenMiddleware(RolesEnum.ADMIN))
  .get(adminController.findById)
  .post( checkIsEmailValidMiddleware,
    adminController.updateAdmin)
  .delete(checkAccessTokenMiddleware(RolesEnum.ADMIN), adminController.deleteAdmin);

router.get('/history/:adminId',
  checkAccessTokenMiddleware(RolesEnum.ADMIN),
  isAdminIdValidMiddleware,
  historyController.findAdminHistory
);

export const adminRouter = router;
