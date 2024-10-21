import dotenv from 'dotenv';
dotenv.config();

export const TWITTER_TOKEN_URL = 'https://api.x.com/2/oauth2/token';
export const TWITTER_TWEET_URL = 'https://api.twitter.com/2/tweets';
export const REDIRECT_URI = 'http://localhost:3000/api/v1/twitter/callback'
export const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
export const CLIENT_SECRET = process.env.CLIENT_SECRET! ?? 'eC8mgKAWbclMLqOcUanZodH6Oo1H0nw-vBC3Gos4TBpkL7047J';
export const CLIENT_ID = process.env.CLIENT_ID! ?? 'MW1nSkM1UmQ1eWNnS19naHptcmQ6MTpjaQ';
