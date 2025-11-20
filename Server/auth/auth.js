import jwt from 'jsonwebtoken';

/**
 * Handles authenication and authorization for the server.
 * Provides methods for token generation, validation, expiration checking, 
 * and redirecting unathorized ussers to the login page.
 */

/** Secret key used to sign JWT tokens */ 
const secretKey = process.env.SECRET_KEY;

/**
 * Generates a JWT token for a given user ID
 * 
 * @param userId the ID of the user
 * @returns a signed JWT token string
*/
export function generateToken(userId) {
    return jwt.sign(
        { userId },
        secretKey,
        { expiresIn: '1h' }, // Token expiration time (1 hour)
    );
}

/**
 * Validates a JWT token and extracts the user ID.
 * 
 * @param token the JWT token
 * @returns the user ID if valid, or null if invalid
 */
export function validateToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

/** 
 * Extracts the JWT token from the Authorization header or cookie.
 * 
 * @param request the request object 
 * @returns the token string, or null if not found
*/
export function extractToken(request) {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    
    if (request.cookies && request.cookies.token) {
        return request.cookies.token;
    }
    
    return null;
}

/** Redirects the user to the login page and skips remaining handlers.
 * Also removes the token cookie.
 * 
 * @param response the response object
 */
export function redirectToLogin(response) {
    response.clearCookie('token');
    response.redirect('/login');
}

/** 
 * Gets the Expiration 
 * 
 * @param token the JWT token
 * @returns the expiration timestamp
 */
export function getExpiration(token) {
    try {
        const decoded = jwt.decode(token);
        return decoded.exp;
    } catch (err) {
        return null;
    }
}

/**
 * Ensures an API route request has a valid token.
 * 
 * @param request the request object
 * @param response the response object
 * @param next
 * @throws Status 401 Unauthorized if token is missing or invalid
*/
export function requireRouteAuth(request, response, next) {
    const token = extractToken(request);
    if (!token) {
        return response.status(401).json({ error: 'Unauthorized - Missing token' });
    }

    const userId = validateToken(token);
    if (!userId) {
        return response.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    request.user = userId;
    next();
}

/**
 * Ensures a static page request has a valid token.
 * Redirects to login page if token is missing or invalid.
 * 
 * @param request the request object
 * @param next
*/
export function requirePageAuth(request, next) {
    const token = extractToken(request);
    if (!token) {
        redirectToLogin();
    }

    const userId = validateToken(token);
    if (!userId) {
        redirectToLogin();
    }

    request.user = userId;
    next();
}
