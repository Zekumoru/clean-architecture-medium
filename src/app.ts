import express from 'express';
import createUsersRouter from './routes/createUsersRouter';
import { ExpressUserController } from './controllers/ExpressUserController';
import { CreateUserInteractor } from './interactors/CreateUserInteractor';
import { InMemoryUserRepository } from './repositories/InMemoryUserRepository';
import { NanoIdGenRepository } from './repositories/NanoIdGenRepository';
import { FindUserByIdInteractor } from './interactors/FindUserByIdInteractor';
import { UpdateUserInteractor } from './interactors/UpdateUserInteractor';
import { DeleteUserByIdInteractor } from './interactors/DeleteUserByIdInteractor';
import { GetAllUsersInteractor } from './interactors/GetAllUsersInteractor';

const app = express();

app.use(express.json());

// setup dependencies
const idGenRepository = new NanoIdGenRepository();
const userRepository = new InMemoryUserRepository();

// setup interactors
const getAllInteractor = new GetAllUsersInteractor(userRepository);
const createInteractor = new CreateUserInteractor(
  userRepository,
  idGenRepository
);
const findByIdInteractor = new FindUserByIdInteractor(userRepository);
const updateInteractor = new UpdateUserInteractor(userRepository);
const deleteByIdInteractor = new DeleteUserByIdInteractor(userRepository);

// setup controller
const expressUserController = new ExpressUserController({
  getAllInteractor,
  createInteractor,
  findByIdInteractor,
  updateInteractor,
  deleteByIdInteractor,
});

// setup routes
const usersRouter = createUsersRouter(expressUserController);

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Server is running!',
  });
});

app.listen(3333, () => {
  console.log('Server is running at http://localhost:3333/');
});
