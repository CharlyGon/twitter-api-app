import { TWITTER_TWEET_URL } from '../constants/endpoints';

/**
 * Service to create a tweet on Twitter.
 * @param {string} accessToken - The access token to authenticate the user.
 * @param {string} mensaje - The text of the tweet.
 * @returns {Promise<any>} - Returns the response from the Twitter API.
 * @throws {Error} - Throws an error if the tweet cannot be created.
 */
export const postTweet = async (accessToken: string, mensaje: string): Promise<any> => {
    try {
        const requestBody = JSON.stringify({ text: mensaje });

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        const response = await fetch(TWITTER_TWEET_URL, {
            method: 'POST',
            headers,
            body: requestBody,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error creando el tweet:', data);
            throw new Error(data.errors?.[0]?.message || 'Error creando el tweet.');
        }

        console.log('Tweet creado con éxito:', data);
        return data;
    } catch (error) {
        console.error('Error creando el tweet:', error);
        throw new Error('Error al intentar crear un tweet.');
    }
};
