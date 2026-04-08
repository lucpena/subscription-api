import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const useRouter = Router();

// GET /users -> Get all users
// GET /users/:id -> Get user by id
// POST /users -> Create new user
// PUT /users/:id -> Update user by id
// DELETE /users/:id -> Delete user by id

useRouter.get('/', getUsers);
useRouter.get('/:id', authorize, getUser);
useRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));
useRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user by id'}));
useRouter.delete('/:id', (req, res) => res.send({title: 'DELETE user by id'}));

export default useRouter;