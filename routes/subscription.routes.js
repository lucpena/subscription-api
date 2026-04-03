import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: 'GET all subscriptions'}));
subscriptionRouter.get('/:id', (req, res) => res.send({title: 'GET subscription details'}));
subscriptionRouter.put('/:id', (req, res) => res.send({title: 'UPDATE subscription'}));
subscriptionRouter.post('/', (req, res) => res.send({title: 'CREATE new subscription'}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'CANCEL subscription'}));

export default subscriptionRouter;