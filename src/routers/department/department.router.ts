import {Router} from 'express';

import {departmentController} from '../../controllers';
import {RolesEnum} from '../../constants';
import {checkAccessTokenMiddleware,
  departmentValidationMiddleware,
  isDepartmentIdValidMiddleware} from '../../middleware';

const router = Router();

router.route('/')
  .post(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    departmentValidationMiddleware,
    departmentController.createNewDepartment)
  .get(departmentController.getDepartments);

router.route('/:departmentId')
  .all(isDepartmentIdValidMiddleware)
  .get(departmentController.getOneById)
  .post(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    departmentValidationMiddleware,
    departmentController.updateDepartment)
  .delete(checkAccessTokenMiddleware(RolesEnum.ADMIN),
    departmentController.deleteDepartment);

export const departmentRouter = router;
