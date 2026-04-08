import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        // Request denied
        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({
                    success: false,
                    message: '⚠️ Too many requests. Please try again later.'
                });
            }

            if(decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: '⚠️ Bot traffic is not allowed.'
                });
            }

            return res.status(403).json({
                success: false,
                message: '⚠️ Access denied'
            });
        }

        // Request allowed
        next();
        
    } catch (error) {
        console.log('❌ Arcjet error:', error);
        next(error);
    }
}

export default arcjetMiddleware;