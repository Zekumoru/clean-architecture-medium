import { Request, Response } from 'express';
import { UserController } from './UserController';
import { CreateUserInteractor } from '../interactors/CreateUserInteractor';
import { FindUserByIdInteractor } from '../interactors/FindUserByIdInteractor';
import { UpdateUserInteractor } from '../interactors/UpdateUserInteractor';
import { DeleteUserByIdInteractor } from '../interactors/DeleteUserByIdInteractor';
import { GetAllUsersInteractor } from '../interactors/GetAllUsersInteractor';

export class ExpressUserController implements UserController {
  constructor(
    private dependencies: {
      getAllInteractor: GetAllUsersInteractor;
      createInteractor: CreateUserInteractor;
      findByIdInteractor: FindUserByIdInteractor;
      updateInteractor: UpdateUserInteractor;
      deleteByIdInteractor: DeleteUserByIdInteractor;
    }
  ) {}

  handleGetAll = async (req: Request, res: Response) => {
    try {
      const users = await this.dependencies.getAllInteractor.execute();

      res.json({
        status: 200,
        message: 'All users queried successfully!',
        users,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Internal error occurred.',
        error,
      });
    }
  };

  handleCreate = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const newUser = await this.dependencies.createInteractor.execute(
        username,
        password
      );

      res.status(201).json({
        status: 201,
        message: `User ${username} created successfully!`,
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Internal error occurred.',
        error,
      });
    }
  };

  handleFindById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const user = await this.dependencies.findByIdInteractor.execute(id);

      res.json({
        status: 200,
        message: `User with id ${id} found!`,
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Internal error occurred.',
        error,
      });
    }
  };

  handleUpdate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
      const user = await this.dependencies.updateInteractor.execute(
        id,
        username,
        password
      );

      res.json({
        status: 200,
        message: `User ${username} updated successfully!`,
        user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Internal error occurred.',
        error,
      });
    }
  };

  deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.dependencies.deleteByIdInteractor.execute(id);

      res.json({
        status: 200,
        message: `User with ${id} removed!`,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Internal error occurred.',
        error,
      });
    }
  };
}
