import {Router} from 'express';

import {
  checkAccessTokenMiddleware,
  checkIsEmailInDBMiddleware,
  checkPasswordAndEmailMiddleware,
  checkStatusMiddleware
} from '../../middleware';
import {RolesEnum, StatusEnum} from '../../constants';
import {authController} from '../../controllers';

const router = Router();

router.post('/admin',
  checkPasswordAndEmailMiddleware,
  checkIsEmailInDBMiddleware(RolesEnum.ADMIN),
  checkStatusMiddleware(StatusEnum.ADMIN_CONFIRMED),
  authController.adminAuthorization
);

router.post('/admin/logout',
  checkAccessTokenMiddleware(RolesEnum.ADMIN),
  authController.logout
);

export const authRouter = router;
