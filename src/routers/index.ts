import {Router} from 'express';

import {adminRouter} from './admin';
import {authRouter} from './auth';
import {doctorRouter} from './doctor';
import {logoutRouter} from './logout';
import {refreshRouter} from './refresh';
import {procedureRouter} from './procedure';

const router = Router();

router.use('/admin', adminRouter);
router.use('/auth', authRouter );
router.use('/doctors', doctorRouter);
router.use('/logout', logoutRouter);
router.use('/procedures', procedureRouter);
router.use('/refresh', refreshRouter);

export const apiRouter = router;
