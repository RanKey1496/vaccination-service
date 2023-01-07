import { inject, injectable } from 'inversify';
import { DrugRepository } from '../../repository/drugRepository';
import Types from '../../config/types';
import { Drug } from '../../entity/drug';
import { BadRequest, NotFound } from '../../util/exceptions';

export interface DrugService {
    createInstance(name: string, approved: boolean, minDose: number, maxDose: number,
        availableAt: Date): Drug;
    saveNewDrug(drug: Drug): Promise<Drug>;
    findById(id: string | number): Promise<Drug>;
    updateDrug(drug: Drug, name: string, approved: boolean, minDose: number, maxDose: number,
        availableAt: Date): Promise<boolean>;
    findAll(page: number, limit: number): Promise<Drug[]>;
    removeDrug(drug: Drug): Promise<boolean>;
}

@injectable()
export class DrugServiceImpl implements DrugService {

    constructor(@inject(Types.DrugRepository) private drugRepository: DrugRepository) {}

    public createInstance(name: string, approved: boolean, minDose: number,
        maxDose: number, availableAt: Date): Drug {
            const drug = new Drug();
            drug.name = name;
            drug.approved = approved;
            drug.minDose = minDose;
            drug.maxDose = maxDose;
            drug.availableAt = availableAt;
            return drug;
    }

    public async saveNewDrug(drug: Drug): Promise<Drug> {
        const result = await this.drugRepository.save(drug);
        if (!result) throw new BadRequest('No se pudo crear la droga');
        return result;
    }

    public async findById(id: string | number): Promise<Drug> {
        const result = await this.drugRepository.findById(id);
        if (!result) {
            throw new NotFound('No se ha encontrado la droga');
        }
        return result;
    }

    public async updateDrug(drug: Drug, name: string, approved: boolean, minDose: number,
        maxDose: number, availableAt: Date): Promise<boolean> {
            drug.name = name;
            drug.approved = approved;
            drug.minDose = minDose;
            drug.maxDose = maxDose;
            drug.availableAt = availableAt;
            const result = await this.drugRepository.update(drug.id, drug);
            if (!result) throw new BadRequest('No se pudo actualizar la droga');
            return result;
    }

    public async findAll(page: number, limit: number): Promise<Drug[]> {
        page = page > 0 ? page : 1;
        const offset = limit * (page - 1);
        return this.drugRepository.findAllPaginate(offset, limit);
    }

    public async removeDrug(drug: Drug): Promise<boolean> {
        const result = await this.drugRepository.delete(drug.id);
        if (!result) throw new BadRequest('No se pudo eliminar la droga');
        return result;
    }

}