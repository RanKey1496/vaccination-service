import { Application, NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { UserService } from '../service/user/userService';
import Types from '../config/types';
import { dataResponse } from '../util/response';
import { RegistrableController } from './RegistrableController';
import { JWTService } from '../service/jwt/jwtService';
import { validateEntity } from '../util/main';

@injectable()
export class AuthController implements RegistrableController {

    @inject(Types.UserService)
    private userService: UserService;

    @inject(Types.JWTService)
    private jwtService: JWTService;

    public register(app: Application): void {

        app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { name, email, password } = req.body;

                await this.userService.validateUserDoesntExists(email);
                const user = this.userService.createInstance(name, email, password);
                await validateEntity(user);
                await this.userService.saveNewUser(user);

                return dataResponse(res, 'Usuario creado satisfactoriamente');
            } catch (error) {
                return next(error);
            }
        });

        app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email, password } = req.body;

                const user = await this.userService.findByEmail(email);
                await this.userService.validateUserPassword(user, password);
                const token = await this.jwtService.generateToken(user.email);

                return dataResponse(res, token);
            } catch (error) {
                return next(error);
            }
        });

    }

}