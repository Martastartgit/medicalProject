import {Router} from 'express';
import {adminController} from '../../controllers/admin';
import {
  checkAdminAccessTokenMiddleware,
  checkIsEmailInDBMiddleware,
  checkIsEmailValidMiddleware,
  checkIsPasswordValidMiddleware,
  checkStatusMiddleware,
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

export const adminRouter = router;
