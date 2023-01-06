import { injectable } from 'inversify';
import { GenericRepositoryImp } from './repository';
import { dataSource } from '../config/db';
import { Drug } from '../entity/drug';

@injectable()
export class DrugRepository extends GenericRepositoryImp<Drug> {

    constructor() {
        super(dataSource.getRepository(Drug));
    }

}