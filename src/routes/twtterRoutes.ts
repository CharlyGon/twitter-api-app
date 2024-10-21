import { Router } from 'express';
import { authenticateUser,  createTweet, } from '../controllers/twitterControllers';
import { handleTwitterCallback } from '../middleware/middleware';

const twitterRoutes = Router();

twitterRoutes.get('/authenticate', authenticateUser);
twitterRoutes.get('/callback', handleTwitterCallback);
twitterRoutes.post('/tweet', createTweet);

export default twitterRoutes;