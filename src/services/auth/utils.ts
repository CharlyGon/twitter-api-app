import crypto from 'crypto';

/**
 * Generates a code verifier for PKCE.
 * @returns {string} - A random string used for PKCE verification.
 */
export const generateCodeVerifier = (): string => {
    return crypto.randomBytes(32). toString('base64url');
}

/**
 * Generate a code challenge using the given code verifier.
 * @param {string} codeVerifier - The generated code verifier for PKCE.
 * @returns {string} - The resulting code challenge.
 */
export const generateCodeChallenge = (codeVerifier: string): string => {
    return crypto.createHash('sha256'). update(codeVerifier). digest('base64url');
}

/**
 * Generates a random state parameter to prevent CSRF attacks.
 * @returns {string} - random string to be used as a state.
 */
export const generateState = (): string => {
    return crypto.randomBytes(16). toString('hex');
}

/**
 * Generates a base64-encoded string with the provided client ID and client secret.
 * @param {string} clientId - The client ID.
 * @param {string} clientSecret - The client secret.
 * @returns {string} - The base64-encoded string.
 */
export const generateBase64Credentials = (clientId: string, clientSecret: string): string => {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  };
