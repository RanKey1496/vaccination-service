import { UserRepository } from '../../src/repository/userRepository';
import { UserService, UserServiceImpl } from '../../src/service/user/userService';
import { instance, mock, when, anything } from 'ts-mockito';
import UserTestBuilder from '../util/userTestBuilder';
import { BadRequest, Conflict, NotFound } from '../../src/util/exceptions';

describe('UserService', () => {
    let userRepository: UserRepository;
    let userService: UserService;

    beforeAll((done) => {
        userRepository = mock(UserRepository);
        userService = new UserServiceImpl(instance(userRepository));
        done();
    });

    describe('createInstance', () => {
        it('should return a valid instance', async () => {
            const user = UserTestBuilder.newUser().withValidValues().build();
            const actual = userService.createInstance(user.name, user.email, user.password);
            expect(user.name).toEqual(actual.name);
            expect(user.email).toEqual(actual.email);
            expect(user.password).toEqual(actual.password);
        });
    });

    describe('findByEmail', () => {
        it('should return a user', async () => {
            const email = 'jhongil96@gmail.com';
            const user = UserTestBuilder.newUser().withValidValues().build();
            when(userRepository.findOneByQuery(anything())).thenResolve(user);
            const result = await userService.findByEmail(email);
            expect(result).toEqual(user);
        });

        it('should throw not found', async () => {
            const email = 'jhongil96@gmail.com';
            when(userRepository.findOneByQuery(anything())).thenResolve();
            expect(async () => await userService.findByEmail(email)).rejects.toThrow(NotFound);
            expect(async () => await userService.findByEmail(email)).rejects.toThrow('Usuario no encontrado');
        });
    })

    describe('saveNewUser', () => {
        it('should save a new user', async () => {
            const user = UserTestBuilder.newUser().withValidValues().build();
            when(userRepository.save(anything())).thenResolve(user);
            const result = await userService.saveNewUser(user);
            expect(result).toEqual(user);
        });

        it('should throw when cant save new user', async () => {
            const user = UserTestBuilder.newUser().withValidValues().build();
            when(userRepository.save(anything())).thenResolve();
            expect(async () => await userService.saveNewUser(user)).rejects.toThrow(BadRequest);
            expect(async () => await userService.saveNewUser(user)).rejects.toThrow('No se pudo crear el usuario');
        });
    });

    describe('validateUserDoesntExist', () => {
        it('should throw if user exists', async () => {
            const email = 'jhongil96@gmail.com';
            const user = UserTestBuilder.newUser().withValidValues().build();
            when(userRepository.findOneByQuery(anything())).thenResolve(user);
            expect(async () => await userService.validateUserDoesntExists(email)).rejects.toThrow(Conflict);
            expect(async () => await userService.validateUserDoesntExists(email)).rejects.toThrow('Usuario ya existe');
        });
    });

    describe('validateUserPassword', () => {
        it('should throw if user doesnt exists', async () => {
            const email = 'jhongil96@gmail.com';
            const user = UserTestBuilder.newUser().withValidValues().build();
            when(userRepository.findOneByQuery(anything())).thenResolve();
            expect(async () => await userService.validateUserPassword(user, '123')).rejects.toThrow(BadRequest);
            expect(async () => await userService.validateUserPassword(user, '123')).rejects.toThrow('Correo y/o contraseña incorrecta');
        });
    });

});