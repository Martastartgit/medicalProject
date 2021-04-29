import {Router} from 'express';

import {checkAccessTokenMiddleware, newProcedureValidationMiddleware} from '../../middleware';
import {RolesEnum} from '../../constants';
import {procedureController} from '../../controllers';

const router = Router();

router.post('/',
  checkAccessTokenMiddleware(RolesEnum.ADMIN),
  newProcedureValidationMiddleware,
  procedureController.createNewProcedure);

export const procedureRouter = router;
