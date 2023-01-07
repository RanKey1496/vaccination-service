import { inject, injectable } from 'inversify';
import { BadRequest, NotFound } from '../../util/exceptions';
import Types from '../../config/types';
import { Drug } from '../../entity/drug';
import { Vaccination } from '../../entity/vaccination';
import { VaccinationRepository } from '../../repository/vaccinationRepository';
import moment from 'moment';

export interface VaccinationService {
    createInstance(name: string, drug: Drug, dose: number, date: Date): Vaccination;
    saveNewVaccination(vaccination: Vaccination): Promise<Vaccination>;
    findById(id: string | number): Promise<Vaccination>;
    updateVaccination(vaccination: Vaccination, name: string, drug: Drug, dose: number,
        date: Date): Promise<boolean>;
    findAll(page: number, limit: number): Promise<Vaccination[]>;
    removeVaccination(vaccination: Vaccination): Promise<boolean>;
    validateCanVaccinateWithThisDrug(drug: Drug, dose: number, date: Date): Promise<void>;
}

@injectable()
export class VaccinationServiceImpl implements VaccinationService {

    constructor(@inject(Types.VaccinationRepository) private vaccinationRepository: VaccinationRepository) {}

    public createInstance(name: string, drug: Drug, dose: number, date: Date): Vaccination {
        const vaccination = new Vaccination();
        vaccination.name = name;
        vaccination.drug = drug;
        vaccination.dose = dose;
        vaccination.date = date;
        return vaccination;
    }

    public async saveNewVaccination(vaccination: Vaccination): Promise<Vaccination> {
        const result = await this.vaccinationRepository.save(vaccination);
        if (!result) throw new BadRequest('No se pudo crear la vacunacion');
        return result;
    }

    public async findById(id: string | number): Promise<Vaccination> {
        const result = await this.vaccinationRepository.findById(id);
        if (!result) {
            throw new NotFound('No se ha encontrado la vacunacion');
        }
        return result;
    }

    public async updateVaccination(vaccination: Vaccination, name: string, drug: Drug, dose: number,
        date: Date): Promise<boolean> {
            vaccination.name = name;
            vaccination.drug = drug;
            vaccination.dose = dose;
            vaccination.date = date;
            const result = await this.vaccinationRepository.update(vaccination.id, vaccination);
            if (!result) throw new BadRequest('No se pudo actualizar la vacunacion');
            return result;
    }

    public async findAll(page: number, limit: number): Promise<Vaccination[]> {
        page = page > 0 ? page : 1;
        const offset = limit * (page - 1);
        return this.vaccinationRepository.findAllPaginate(offset, limit);
    }

    public async removeVaccination(vaccination: Vaccination): Promise<boolean> {
        const result = await this.vaccinationRepository.delete(vaccination.id);
        if (!result) throw new BadRequest('No se pudo eliminar la vacunacion');
        return result;
    }

    public async validateCanVaccinateWithThisDrug(drug: Drug, dose: number, date: Date): Promise<void> {
        if (!drug.approved) {
            throw new BadRequest('Droga no aprobada');
        }
        if (dose > drug.maxDose || dose < drug.minDose) {
            throw new BadRequest('La dosis no está en el rango permitido');
        }
        if (moment(date).isBefore(moment(drug.availableAt))) {
            throw new BadRequest('La fecha de la vacuna es antes de la fecha permitida de la droga');
        }
    }

}