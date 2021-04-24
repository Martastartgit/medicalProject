import {Router} from 'express';
import {adminController} from '../../controllers/admin';
import {
  checkAdminAccessTokenMiddleware,
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

export const adminRouter = router;
