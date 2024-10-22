import { BEARER_TOKEN, TWITTER_API_BASE_URL, TWITTER_TWEET_URL } from '../constants/endpoints';
import { Tweet } from '../interfaces/tweet';
import { tweetsMock } from '../mock/tweetsMock';

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

/**
 *  Service to get the actual posts from Twitter.
 * @param {number} maxCount  Maximum number of posts to return.
 * @param {number} maxMinutes Maximum number of minutes from which to search for posts.
 * @param {string} hashtags Array of hashtags to filter posts.
 * @returns  {Promise<Tweet[]>} - List of tweets from Twitter.
 */
export const getRealPosts = async (
    maxCount: number,
    maxMinutes: number,
    hashtags: string[],
): Promise<Tweet[]> => {
    try {
        if (!BEARER_TOKEN) {
            throw new Error('Bearer token no definido. Verifica el archivo .env');
        }

        const query = hashtags.map(tag => encodeURIComponent(tag)).join(' OR ');

        const url = `${TWITTER_API_BASE_URL}/tweets/search/recent?query=${query}&max_results=${Math.min(
            maxCount,
            100
        )}`;

        const headers = {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
        }

        // Hacer la solicitud GET a la API de Twitter
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error de respuesta de la API de Twitter:', errorData);
            throw new Error(`Twitter API Error: ${errorData.error || 'Error desconocido'}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error: any) {
        console.error('Error obteniendo los posts reales de Twitter:', error.message);
        throw error;
    }
};

/**
 * Service to get the posts from the mock.
 * @param  {number} maxCount - Maximum number of posts to return.
 * @param  {number} maxMinutes - Maximum number of minutes from which to search for posts.
 * @param  {string[]} hashtags - Array of hashtags to filter posts.
 * @returns {Promise<Tweet[]>} - Mock tweets list.
 */
export const getMockPosts = (
    maxCount: number,
    maxMinutes: number,
    hashtags: string[]
): Tweet[] => {
    const currentTime = Date.now();

    const isRecent = (timestamp: number): boolean => {
        return (currentTime - timestamp) <= maxMinutes * 60000;
    };

    const containsHashtag = (content: string): boolean => {
        return hashtags.some(tag => content.includes(tag));
    };

    const filteredPosts = tweetsMock.filter(({ timestamp, text }) => {
        return isRecent(timestamp) && containsHashtag(text);
    });

    return filteredPosts.slice(0, maxCount);
};
