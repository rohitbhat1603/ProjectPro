import HttpError from '../models/http-error.js';

import jwt from 'jsonwebtoken';
import 'dotenv/config';

const checkAuth = (req, res, next) => {
    if(req.method === 'OPTIONS') return next();
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) throw new Error('Authentication failed!')
        
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return next(new HttpError(err, 403));
    }
}

export default checkAuth;