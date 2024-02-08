import jwt from 'jsonwebtoken'

export const SECRET_KEY = 'assignment-1-COMP3133'

export function getTokenPayload(token) {
    return jwt.verify(token, SECRET_KEY);
}

export function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');

            if (!token) {
                throw new Error('No token found')
            }

            const {userId} = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const {userId} = getTokenPayload(authToken);
        return userId;
    }
}

export function checkUserId(context) {
    if (context.userId === null) {
        throw new Error('No authorization token');
    }
}