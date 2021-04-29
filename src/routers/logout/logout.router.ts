import {Router} from 'express';

import {checkAccessTokenMiddleware} from '../../middleware';
import {RolesEnum} from '../../constants';
import {authController} from '../../controllers';

const router = Router();

router.post('/admin',
  checkAccessTokenMiddleware(RolesEnum.ADMIN),
  authController.logout
);

export const logoutRouter = router;
