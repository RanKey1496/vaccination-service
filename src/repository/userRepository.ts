import { injectable } from 'inversify';
import { GenericRepositoryImp } from './repository';
import { User } from '../entity/user';
import { dataSource } from '../config/db';

@injectable()
export class UserRepository extends GenericRepositoryImp<User> {

    constructor() {
        super(dataSource.getRepository(User));
    }

}