import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

// Default Express middleware to parse JSON
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies
app.use(cookieParser());

// Arcjet middleware to protect against bots and abuse
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Error handling middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!'); 
});

app.listen(PORT, async () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;