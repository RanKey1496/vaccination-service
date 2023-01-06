import { inject, injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import Types from '../../config/types';
import { User } from '../../entity/user';
import { UserRepository } from '../../repository/userRepository';
import { BadRequest, Conflict, NotFound } from '../../util/exceptions';

export interface UserService {
    createInstance(name: string, email: string, password: string): User;
    findByEmail(email: string): Promise<User>;
    saveNewUser(user: User): Promise<User>;
    validateUserDoesntExists(email: string): Promise<void>;
    validateUserPassword(user: User, password: string): Promise<void>;
}

@injectable()
export class UserServiceImpl implements UserService {

    constructor(@inject(Types.UserRepository) private userRepository: UserRepository) {}

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    public createInstance(name: string, email: string, password: string): User {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        return user;
    }

    public async findByEmail(email: string): Promise<User> {
        const result = await this.userRepository.findOneByQuery({ email });
        if (!result) {
            throw new NotFound('Usuario no encontrado');
        }
        return result;
    }

    public async saveNewUser(user: User): Promise<User> {
        user.password = await this.hashPassword(user.password);
        const result = await this.userRepository.save(user);
        if (!result) throw new BadRequest('No se pudo crear el usuario');
        return result;
    }

    public async validateUserDoesntExists(email: string): Promise<void> {
        const result = await this.userRepository.findOneByQuery({ email });
        if (result) {
            throw new Conflict('Usuario ya existe');
        }
    }

    public async validateUserPassword(user: User, password: string): Promise<void> {
        const result = await this.comparePassword(password, user.password);
        if (!result) {
            throw new BadRequest('Correo y/o contraseña incorrecta');
        }
    }
    
}