import { User } from '../../src/entity/user';

export default class UserTestBuilder {

    private user: User;

    public static newUser() {
        return new UserTestBuilder;
    }

    public withId(id: number): UserTestBuilder {
        this.user.id = id;
        return this;
    }

    public withName(name: string): UserTestBuilder {
        this.user.name = name;
        return this;
    }

    public withEmail(email: string): UserTestBuilder {
        this.user.email = email;
        return this;
    }

    public withPassword(password: string): UserTestBuilder {
        this.user.password = password;
        return this;
    }

    public withEmptyData(): UserTestBuilder {
        return this;
    }

    public withValidValues(): UserTestBuilder {
        return this.withId(1).withName('Jhon Gil').withEmail('jhongil96@gmail.com').withPassword('123');
    }

    public withInvalidValues(): UserTestBuilder {
        return this.withId(0).withName('J').withEmail('jhom').withPassword('321');
    }

    public build(): User {
        return this.user;
    }

}