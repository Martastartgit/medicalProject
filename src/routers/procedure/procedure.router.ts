import {Router} from 'express';

import {checkAccessTokenMiddleware, isIdValidMiddleware, newProcedureValidationMiddleware} from '../../middleware';
import {RolesEnum} from '../../constants';
import {procedureController} from '../../controllers';

const router = Router();

router.route('/')
  .post(
    checkAccessTokenMiddleware(RolesEnum.ADMIN),
    newProcedureValidationMiddleware,
    procedureController.createNewProcedure)
  .get(procedureController.findProcedures);

router.route('/:procedureId')
  .all(isIdValidMiddleware)
  .get(procedureController.getOneById)
  .post(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    newProcedureValidationMiddleware,
    procedureController.updateProcedure)
  .delete(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    procedureController.deleteProcedure);

export const procedureRouter = router;
