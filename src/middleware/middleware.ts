import { Request, Response, NextFunction } from 'express';
import { getCodeVerifier, setAccessToken } from '../globals';
import { exchangeAuthorizationCodeForAccessToken } from '../services/auth/authService';

/**
 * Middleware that handles the Twitter authentication callback.
 * This middleware is responsible for receiving the authorization code and using it to obtain an access token.
 *
 * @param  {Request} req - HTTP request containing the authorization code in the query.
 * @param  {Response} res - HTTP response to be sent to the client.
 * @param  {NextFunction} next - Call the next middleware function, if any error occurs.
 */
export const handleTwitterCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const code = req.query.code as string
        const codeVerifier = getCodeVerifier();

        if (!code || !codeVerifier) {
            res.status(400).send('Faltan parámetros necesarios para continuar con la autenticación.');
            return
        }

        const { accessToken } = await exchangeAuthorizationCodeForAccessToken(code, codeVerifier);

        setAccessToken(accessToken);
        console.log('Access token obtenido:', accessToken);

        res.status(200).send('Autenticación exitosa.');
    } catch (error) {
        console.error('Error en el middleware handleTwitterCallback:', error);
        next(error);
    }
};
