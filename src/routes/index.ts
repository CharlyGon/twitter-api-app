import { Router } from 'express';
import twitterRoutes from './twtterRoutes';

const router = Router();

router.use('/twitter', twitterRoutes);

export default router;
