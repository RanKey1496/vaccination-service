import { injectable } from 'inversify';
import { GenericRepositoryImp } from './repository';
import { dataSource } from '../config/db';
import { Vaccination } from '../entity/vaccination';

@injectable()
export class VaccinationRepository extends GenericRepositoryImp<Vaccination> {

    constructor() {
        super(dataSource.getRepository(Vaccination));
    }

}