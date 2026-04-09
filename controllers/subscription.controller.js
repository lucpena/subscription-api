import Subscription from '../models/subscription.model.js';

import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: { 
                subscriptionId: subscription.id
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0
        });

        res.status(201).json({ success: true, data: subscription, workflowRunId });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if( req.user.id !== req.params.id ) {
            const error = new Error('⚠️ Unauthorized access to user subscriptions.');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        // Permitir deleção por ID ou por nome (via query param)
        const { name } = req.params.id ? { name: undefined } : req.body;
        const subscriptionId = req.params.id;

        let subscription;

        // Se houver query param com nome
        if (name) {
            const subscriptions = await Subscription.find({
                name: { $regex: name, $options: 'i' },
                user: req.user._id
            });

            // Verifica se encontrou múltiplas assinaturas
            if (subscriptions.length > 1) {
                const error = new Error(`⚠️ Found ${subscriptions.length} subscriptions matching "${name}". Please be more specific. Matches: ${subscriptions.map(s => s.name).join(', ')}`);
                error.status = 400;
                throw error;
            }

            // Verifica se encontrou nenhuma assinatura
            if (subscriptions.length === 0) {
                const error = new Error('⚠️ Subscription not found.');
                error.status = 404;
                throw error;
            }

            subscription = subscriptions[0];
        }

        // Senão usa o ID da rota
        else if (subscriptionId) {
            subscription = await Subscription.findById(subscriptionId);
            // Verifica se a subscription pertence ao usuário
            if (subscription && subscription.user.toString() !== req.user._id.toString()) {
                const error = new Error('⚠️ Unauthorized access to user subscriptions.');
                error.status = 401;
                throw error;
            }
        } else {
            const error = new Error('⚠️ Subscription name or ID is required.');
            error.status = 400;
            throw error;
        }

        if (!subscription) {
            const error = new Error('⚠️ Subscription not found.');
            error.status = 404;
            throw error;
        }

        await Subscription.findByIdAndDelete(subscription._id);
        res.status(200).json({ success: true, message: 'Subscription deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('⚠️ Subscription not found.');
            error.status = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('⚠️ Unauthorized access to user subscriptions.');
            error.status = 401;
            throw error;
        }

        Object.assign(subscription, req.body);
        await subscription.save();

        res.status(200).json({ success: true, data: subscription });
    }
    catch (error) {
        next(error);
    }
};

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById( req.params.id );

        if( !subscription ) {
            const error = new Error('⚠️ Subscription not found.');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('⚠️ Subscription not found.');
            error.status = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('⚠️ Unauthorized access to user subscriptions.');
            error.status = 401;
            throw error;
        }

        if( subscription.status === 'cancelled' ) {
            const error = new Error('⚠️ Subscription is already cancelled.');
            error.status = 400;
            throw error;
        }

        if( subscription.status === 'expired' ) {
            const error = new Error('⚠️ Subscription is already expired and cannot be cancelled.');
            error.status = 400;
            throw error;
        }

        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({ success: true, data: subscription });

    } catch (error) {
        next(error);
    }
};