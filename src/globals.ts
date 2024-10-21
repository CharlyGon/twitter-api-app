const globals = {
    globalCodeVerifier: null as string | null,
    storedAccessToken: null as string | null
};
/**
 * Sets the global code verifier for PKCE flow.
 * @param verifier {string} - The generated code verifier to be stored globally.
 */
export const setCodeVerifier = (verifier: string): void => {
    globals.globalCodeVerifier = verifier;
}

/**
 * Retrieves the stored global code verifier for PKCE flow.
 * @returns {string | null} - The stored code verifier, or null if not set.
 */
export const getCodeVerifier = (): string | null => {
    return globals.globalCodeVerifier;
}

/**
 * Stores the access token globally after successful authentication.
 * @param token {string} - The access token to be used for subsequent API requests.
 */
export const setAccessToken = (token: string): void => {
    globals.storedAccessToken = token;
}

/**
 * Retrieves the globally stored access token.
 * @returns {string | null} - The stored access token, or null if it has not been set.
 */
export const getStoredAccessToken = (): string | null => {
    return globals.storedAccessToken;
}