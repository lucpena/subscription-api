import { Router } from "express";

const useRouter = Router();

// GET /users -> Get all users
// GET /users/:id -> Get user by id
// POST /users -> Create new user
// PUT /users/:id -> Update user by id
// DELETE /users/:id -> Delete user by id

useRouter.get('/', (req, res) => res.send({title: 'GET all users'}));
useRouter.get('/:id', (req, res) => res.send({title: 'GET user by id'}));
useRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));
useRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user by id'}));
useRouter.delete('/:id', (req, res) => res.send({title: 'DELETE user by id'}));

export default useRouter;