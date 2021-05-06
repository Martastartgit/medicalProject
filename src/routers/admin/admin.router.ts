import {Router} from 'express';

import {adminController} from '../../controllers';
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
import {AdminsActionEnum, RolesEnum, StatusEnum} from '../../constants';

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
  .all(isAdminIdValidMiddleware)
  .get(adminController.findById)
  .post(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    checkIsEmailValidMiddleware,
    adminController.updateAdmin)
  .delete(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    adminController.deleteAdmin);

export const adminRouter = router;
