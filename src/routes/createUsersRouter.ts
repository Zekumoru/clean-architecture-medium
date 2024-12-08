import express from 'express';
import { ExpressUserController } from '../controllers/ExpressUserController';

const createUsersRouter = (controller: ExpressUserController) => {
  const userRouter = express.Router();

  userRouter.get('/', controller.handleGetAll);
  userRouter.get('/:id', controller.handleFindById);
  userRouter.post('/create', controller.handleCreate);
  userRouter.put('/:id/update', controller.handleUpdate);
  userRouter.delete('/:id/delete', controller.deleteById);

  return userRouter;
};

export default createUsersRouter;
