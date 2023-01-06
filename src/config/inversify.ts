import { Container } from 'inversify';
import Types from './types';
import { RegistrableController } from '../controller/RegistrableController';
import { AuthController } from '../controller/authController';
import { UserService, UserServiceImpl } from '../service/user/userService';
import { JWTService, JWTServiceImpl } from '../service/jwt/jwtService';
import { UserRepository } from '../repository/userRepository';
import { DrugController } from '../controller/drugController';
import { DrugService, DrugServiceImpl } from '../service/drug/drugService';
import { DrugRepository } from '../repository/drugRepository';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(AuthController);
container.bind<RegistrableController>(Types.Controller).to(DrugController);

// Services
container.bind<UserService>(Types.UserService).to(UserServiceImpl);
container.bind<JWTService>(Types.JWTService).to(JWTServiceImpl)
container.bind<DrugService>(Types.DrugService).to(DrugServiceImpl);

// Repository
container.bind<UserRepository>(Types.UserRepository).to(UserRepository);
container.bind<DrugRepository>(Types.DrugRepository).to(DrugRepository);

export { container };