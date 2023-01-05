import { Container } from 'inversify';
import Types from './types';
import { RegistrableController } from '../controller/RegistrableController';
import { AuthController } from '../controller/authController';
import { UserService, UserServiceImpl } from '../service/user/userService';
import { JWTService, JWTServiceImpl } from '../service/jwt/jwtService';
import { UserRepository } from '../repository/userRepository';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(AuthController);

// Services
container.bind<UserService>(Types.UserService).to(UserServiceImpl);
container.bind<JWTService>(Types.JWTService).to(JWTServiceImpl)

// Repository
container.bind<UserRepository>(Types.UserRepository).to(UserRepository);

export { container };