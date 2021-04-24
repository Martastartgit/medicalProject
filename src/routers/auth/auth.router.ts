import {Router} from 'express';

import {checkIsEmailInDBMiddleware,
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
  authController.authorization
);

export const authRouter = router;
