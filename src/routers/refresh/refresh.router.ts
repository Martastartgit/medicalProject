import {Router} from 'express';
import {checkRefreshTokenMiddleware} from '../../middleware';
import {RolesEnum} from '../../constants';
import {authController} from '../../controllers';

const router = Router();

router.post('/admin', checkRefreshTokenMiddleware(RolesEnum.ADMIN), authController.createNewPair);

export const refreshRouter = router;
