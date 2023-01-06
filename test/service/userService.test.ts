import { UserRepository } from '../../src/repository/userRepository';
import { UserService, UserServiceImpl } from '../../src/service/user/userService';
import { instance, mock, when, anything } from 'ts-mockito';
import UserTestBuilder from '../util/userTestBuilder';
import { NotFound } from '../../src/util/exceptions';

describe('UserService', () => {
    let userRepository: UserRepository;
    let userService: UserService;

    beforeAll(() => {
        userRepository = mock(UserRepository);
        userService = new UserServiceImpl(instance(userRepository));
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
            console.log(await userService.findByEmail(email));
            expect(async () => await userService.findByEmail(email)).toThrow(NotFound);
            expect(async () => await userService.findByEmail(email)).toThrow('Usuario no encontrado');
        });
    })
});