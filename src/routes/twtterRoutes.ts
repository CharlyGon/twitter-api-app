import { Router } from 'express';
import { authenticateUser,  createTweet, getTweetsController,  } from '../controllers/twitterControllers';
import { handleTwitterCallback } from '../middleware/middleware';

const twitterRoutes = Router();

twitterRoutes.get('/authenticate', authenticateUser);
twitterRoutes.get('/callback', handleTwitterCallback);
twitterRoutes.post('/tweet', createTweet);
twitterRoutes.get('/posts', getTweetsController);

export default twitterRoutes;