import { generateCodeVerifier, generateCodeChallenge, generateState, generateBase64Credentials } from './utils';
import { setCodeVerifier } from '../../globals';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, TWITTER_AUTH_URL, TWITTER_TOKEN_URL } from '../../constants/endpoints';

/**
 * Service to authenticate the user on Twitter.
 * Generate a URL to obtain an OAuth 2.0 authorization code.
 *
 * @returns {Promise<{ url: string; state: string }>} - The authentication URL and the generated state.
 */
export const authenticate = async (): Promise<{ codeVerifier: string; url: string; state: string }> => {
    try {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = generateCodeChallenge(codeVerifier);
        const state = generateState();

        setCodeVerifier(codeVerifier);

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            scope: 'tweet.read tweet.write users.read offline.access',
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            state: state,
        });

        const url = `${TWITTER_AUTH_URL}?${params.toString()}`;

        console.log("Visita esta URL para autenticarte:", url);
        console.log("Code Verifier:", codeVerifier);
        console.log("Code Challenge:", codeChallenge);
        console.log("State:", state);

        return { codeVerifier, url, state };
    } catch (error) {
        console.error('Error generando la URL de autenticación:', error);
        throw new Error('Error generando la URL de autenticación.');
    }
};

/**
 * Service to obtain the access token using the authorization code.
 * @param {string} code - The authorization code provided by Twitter.
 * @param {string} codeVerifier - The verification code for authentication (PKCE).
 * @returns {Promise<{ accessToken: string; refreshToken: string }>} - Returns the access token and refresh token.
 * @throws {Error} - Throws an error if the access token cannot be obtained.
 */
export const exchangeAuthorizationCodeForAccessToken = async (
    code: string,
    codeVerifier: string
): Promise<{ accessToken: string; refreshToken: string }> => {
    const base64Credentials = generateBase64Credentials(CLIENT_ID, CLIENT_SECRET);

    try {
        const bodyParams = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: codeVerifier,
        });

        const headers = {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await fetch(TWITTER_TOKEN_URL, {
            method: 'POST',
            headers: headers,
            body: bodyParams,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error obteniendo el token de acceso:', data);
            throw new Error(data.error_description || 'Error intercambiando el código por el token de acceso.');
        }

        return { accessToken: data.access_token, refreshToken: data.refresh_token };
    } catch (error) {
        console.error('Error obteniendo el token de acceso:', error);
        throw error;
    }
};
