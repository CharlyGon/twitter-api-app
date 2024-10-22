import { Request, Response } from "express";
import { getMockPosts, getRealPosts, postTweet } from "../services/twitterSercive";
import { getStoredAccessToken, setCodeVerifier } from "../globals";
import { authenticate } from "../services/auth/authService";
import { Tweet } from "../interfaces/tweet";

/**
 * Controller to authenticate the user.
 * This controller generates the URL to authenticate with Twitter and sends that URL to the user.
 *
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 * @returns {Promise<void>} - Returns a promise that is resolved when the HTTP response is sent, or rejected if an error occurs.
 */
export const authenticateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { codeVerifier, url } = await authenticate();
        setCodeVerifier(codeVerifier);

        res.status(200).send(`Visita esta URL para autenticarte: ${url}`);
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).send('Error en la autenticación.');
    }
};

/**
 * Controller to create a tweet.
 * This controller uses the stored access token to make a post on Twitter.
 *
 * @param {Request} req - HTTP request object containing the tweet text.
 * @param {Response} res - HTTP response object.
 * @returns {Promise<void>} - Returns a promise that is resolved when the HTTP response is sent, or rejected if an error occurs.
 */
export const createTweet = async (req: Request, res: Response): Promise<void> => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            res.status(400).json({ error: 'El texto del tweet es requerido y debe ser una cadena de texto.' });
            return
        }

        const storedAccessToken = getStoredAccessToken();
        if (!storedAccessToken) {
            console.error('Token de acceso no disponible.', storedAccessToken);
            res.status(401).json({ error: 'Token de acceso no disponible. Por favor, autentícate primero.' });
            return;
        }

        await postTweet(storedAccessToken, text);

        res.status(200).json({ message: 'Tweet creado con éxito.' });
    } catch (error) {
        console.error('Error creando el tweet:', error);
        res.status(500).send('Error creando el tweet. Por favor, intenta nuevamente más tarde.');
    }
};

/**
 * Controller to get the actual posts from Twitter based on the parameters provided.
 * @param  {Request} req -   Object containing the parameters needed for post search.
 * @param  {Response} res -   Object that is used to return the search results.
 * @returns {Promise<void>} - Promise that is resolved when the response has been sent.
 */
export const getTweetsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const maxCount = parseInt(req.query.maxCount as string);
        const maxMinutes = parseInt(req.query.maxMinutes as string);

        if (isNaN(maxCount) || isNaN(maxMinutes)) {
            res.status(400).send('maxCount y maxMinutes deben ser números válidos.');
            return;
        }

        const hashtags = (req.query.hashtags as string)
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        if (hashtags.length === 0) {
            res.status(400).send('Debes proporcionar al menos un hashtag válido.');
            return;
        }

        const useMock = req.query.useMock === 'true';

        let posts: Tweet[];

        if (useMock) {
            posts = getMockPosts(maxCount, maxMinutes, hashtags);
        } else {
            posts = await getRealPosts(maxCount, maxMinutes, hashtags);
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error obteniendo los tweets:', error);
        res.status(500).send('Error obteniendo los tweets.');
    }
};
