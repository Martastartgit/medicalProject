import {Router} from 'express';
import {adminRouter} from './admin';

const router = Router();

router.use('/admin', adminRouter);
router.use('/auth')

export const apiRouter = router;
