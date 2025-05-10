import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req, res, next) => {
    const adminToken = req.cookies.admin_access_token;  // Get token from cookies
    
    if (!adminToken) {
        return next(errorHandler(401, "Unauthorized!"));
    }

    // Verify JWT
    jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET, (err, admin) => {
        if (err) {
            return next(errorHandler(403, "Forbidden"));
        }
        
        // Attach the decoded token to the request object
        req.admin = admin;  // You can access the decoded token info in subsequent routes
        next();  // Proceed to the next middleware or route handler
    });
};

