import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { 
    cancelSubscription, 
    createSubscription, 
    deleteSubscription, 
    getAllSubscriptions, 
    getSubscriptionDetails, 
    getUserSubscriptions, 
    updateSubscription 
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscriptions);
subscriptionRouter.get('/:id', getSubscriptionDetails);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', authorize, deleteSubscription);
subscriptionRouter.delete('/', authorize, deleteSubscription);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.get('/:id/cancel', authorize, cancelSubscription);

export default subscriptionRouter;