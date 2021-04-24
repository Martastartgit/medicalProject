import {Router} from 'express';

import {adminRouter} from './admin';
import {authRouter} from './auth';
import {refreshRouter} from './refresh';

const router = Router();

router.use('/admin', adminRouter);
router.use('/auth', authRouter );
router.use('/refresh', refreshRouter);

export const apiRouter = router;
