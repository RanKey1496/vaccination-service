import { instance, mock, when, anything } from 'ts-mockito';
import { VaccinationRepository } from '../../src/repository/vaccinationRepository';
import { VaccinationService, VaccinationServiceImpl } from '../../src/service/vaccination/vaccinationService';
import { BadRequest, Conflict, NotFound } from '../../src/util/exceptions';
import VaccinationTestBuilder from '../util/vaccinationTestBuilder';
import DrugTestBuilder from '../util/drugTestBuilder';

describe('VaccinationService', () => {
    let vaccinationRepository: VaccinationRepository;
    let vaccinationService: VaccinationService;;

    beforeAll((done) => {
        vaccinationRepository = mock(VaccinationRepository);
        vaccinationService = new VaccinationServiceImpl(instance(vaccinationRepository));
        done();
    });

    describe('createInstance', () => {
        it('should return a valid instance', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            const actual = vaccinationService.createInstance(vaccination.name, drug, vaccination.dose,
                vaccination.date);
            expect(vaccination.name).toEqual(actual.name);
            expect(vaccination.dose).toEqual(actual.dose);
        });
    });

    describe('saveNewVaccination', () => {
        it('should save a new vaccination', async () => {
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            when(vaccinationRepository.save(anything())).thenResolve(vaccination);
            const result = await vaccinationService.saveNewVaccination(vaccination);
            expect(result).toEqual(vaccination);
        });

        it('should throw when cant save new vaccination', async () => {
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            when(vaccinationRepository.save(anything())).thenResolve();
            expect(async () => await vaccinationService.saveNewVaccination(vaccination)).rejects.toThrow(BadRequest);
            expect(async () => await vaccinationService.saveNewVaccination(vaccination)).rejects.toThrow('No se pudo crear la vacunacion');
        });
    });

    describe('findById', () => {
        it('should return a vaccination', async () => {
            const vaccinationId = 1;
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            when(vaccinationRepository.findById(vaccinationId)).thenResolve(vaccination);
            const result = await vaccinationService.findById(1);
            expect(result).toEqual(vaccination);
        });

        it('should throw when not vaccination found', async () => {
            const vaccinationId = 1;
            when(vaccinationRepository.findById(vaccinationId)).thenResolve();
            expect(async () => await vaccinationService.findById(1)).rejects.toThrow(NotFound);
            expect(async () => await vaccinationService.findById(1)).rejects.toThrow('No se ha encontrado la vacunacion');
        });
    });

    describe('updateDrug', () => {
        it('should update a vaccination', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            const vaccinationId = 1;
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();            
            when(vaccinationRepository.update(vaccinationId, vaccination)).thenResolve(true);
            const result = await vaccinationService.updateVaccination(vaccination, vaccination.name, drug, vaccination.dose,
                vaccination.date);
            expect(result).toEqual(true);
        });

        it('should throw when cant update a vaccination', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();            
            when(vaccinationRepository.update(anything(), anything())).thenResolve();
            expect(async () => await vaccinationService.updateVaccination(vaccination, vaccination.name, drug, vaccination.dose,
                vaccination.date)).rejects.toThrow(BadRequest);
            expect(async () => await vaccinationService.updateVaccination(vaccination, vaccination.name, drug, vaccination.dose,
                vaccination.date)).rejects.toThrow('No se pudo actualizar la vacunacion');
        });
    });

    describe('findAll', () => {
        it('should return a list of vaccinations', async () => {
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            const vaccination2 = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            const vaccinations = [vaccination, vaccination2];
            when(vaccinationRepository.findAllPaginate(0, 10)).thenResolve(vaccinations);
            const result = await vaccinationService.findAll(1, 10);
            expect(result).toEqual(vaccinations);
        });
    });

    describe('removeVaccination', () => {
        it('should remove a vaccination', async () => {
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            when(vaccinationRepository.delete(vaccination.id)).thenResolve(true);
            const result = await vaccinationService.removeVaccination(vaccination);
            expect(result).toEqual(true);
        });

        it('should throw if cant remove', async () => {
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();
            when(vaccinationRepository.delete(vaccination.id)).thenResolve(false);            
            expect(async () => await vaccinationService.removeVaccination(vaccination)).rejects.toThrow(BadRequest);
        });
    });

    describe('validateCanVaccinateWithThisDrug', () => {
        it('should throw when drug not apprved', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().withApproved(false).build();
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().build();     
            expect(async () => await vaccinationService.validateCanVaccinateWithThisDrug(drug, vaccination.dose,
                vaccination.date)).rejects.toThrow(BadRequest);
            expect(async () => await vaccinationService.validateCanVaccinateWithThisDrug(drug, vaccination.dose,
                vaccination.date)).rejects.toThrow('Droga no aprobada');
        });

        it('should throw when dose is not permited', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().withDose(1).build();     
            expect(async () => await vaccinationService.validateCanVaccinateWithThisDrug(drug, vaccination.dose,
                vaccination.date)).rejects.toThrow(BadRequest);
            expect(async () => await vaccinationService.validateCanVaccinateWithThisDrug(drug, vaccination.dose,
                vaccination.date)).rejects.toThrow('La dosis no está en el rango permitido');
        });

        it('should throw when date is before', async () => {
            const beforeDateSevenDays = new Date();
            beforeDateSevenDays.setDate(beforeDateSevenDays.getDate() - 7);
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            const vaccination = VaccinationTestBuilder.newVaccionation().withValidValues().withDate(beforeDateSevenDays).build();     
            expect(async () => await vaccinationService.validateCanVaccinateWithThisDrug(drug, vaccination.dose,
                vaccination.date)).rejects.toThrow(BadRequest);
            expect(async () => await vaccinationService.validateCanVaccinateWithThisDrug(drug, vaccination.dose,
                vaccination.date)).rejects.toThrow('La fecha de la vacuna es antes de la fecha permitida de la droga');
        });
    });
});