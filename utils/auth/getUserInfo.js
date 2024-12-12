const jwt = require('jsonwebtoken');

const getUserIdFromToken = (token) => {
    try {
        // Decode the token without verifying the signature
        const decoded = jwt.decode(token);
        // Check if user_id exists
        return decoded && decoded.user_id ? decoded.user_id : null;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
}

export default getUserIdFromToken;