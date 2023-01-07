import { instance, mock, when, anything } from 'ts-mockito';
import { DrugRepository } from '../../src/repository/drugRepository';
import { DrugService, DrugServiceImpl } from '../../src/service/drug/drugService';
import { BadRequest, Conflict, NotFound } from '../../src/util/exceptions';
import DrugTestBuilder from '../util/drugTestBuilder';

describe('DrugService', () => {
    let drugRepository: DrugRepository;
    let drugService: DrugService;;

    beforeAll((done) => {
        drugRepository = mock(DrugRepository);
        drugService = new DrugServiceImpl(instance(drugRepository));
        done();
    });

    describe('createInstance', () => {
        it('should return a valid instance', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            const actual = drugService.createInstance(drug.name, drug.approved, drug.minDose,
                drug.maxDose, drug.availableAt);
            expect(drug.name).toEqual(actual.name);
            expect(drug.approved).toEqual(actual.approved);
            expect(drug.minDose).toEqual(actual.minDose);
            expect(drug.maxDose).toEqual(actual.maxDose);
            expect(drug.availableAt).toEqual(actual.availableAt);
        });
    });

    describe('saveNewDrug', () => {
        it('should save a new drug', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            when(drugRepository.save(anything())).thenResolve(drug);
            const result = await drugService.saveNewDrug(drug);
            expect(result).toEqual(drug);
        });

        it('should throw when cant save new drug', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            when(drugRepository.save(anything())).thenResolve();
            expect(async () => await drugService.saveNewDrug(drug)).rejects.toThrow(BadRequest);
            expect(async () => await drugService.saveNewDrug(drug)).rejects.toThrow('No se pudo crear la droga');
        });
    });

    describe('findById', () => {
        it('should return a drug', async () => {
            const drugId = 1;
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            when(drugRepository.findById(drugId)).thenResolve(drug);
            const result = await drugService.findById(1);
            expect(result).toEqual(drug);
        });

        it('should throw when not drug found', async () => {
            const drugId = 1;
            when(drugRepository.findById(drugId)).thenResolve();
            expect(async () => await drugService.findById(1)).rejects.toThrow(NotFound);
            expect(async () => await drugService.findById(1)).rejects.toThrow('No se ha encontrado la droga');
        });
    });

    describe('updateDrug', () => {
        it('should update a drug', async () => {
            const drugId = 1;
            const drug = DrugTestBuilder.newDrug().withValidValues().build();            
            when(drugRepository.update(drugId, drug)).thenResolve(true);
            const result = await drugService.updateDrug(drug, drug.name, drug.approved, drug.minDose,
                drug.maxDose, drug.availableAt);
            expect(result).toEqual(true);
        });

        it('should throw when cant update a drug', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();            
            when(drugRepository.update(anything(), anything())).thenResolve();
            expect(async () => await drugService.updateDrug(drug, drug.name, drug.approved, drug.minDose,
                drug.maxDose, drug.availableAt)).rejects.toThrow(BadRequest);
            expect(async () => await drugService.updateDrug(drug, drug.name, drug.approved, drug.minDose,
                drug.maxDose, drug.availableAt)).rejects.toThrow('No se pudo actualizar la droga');
        });
    });

    describe('findAll', () => {
        it('should return a list of drugs', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            const drug2 = DrugTestBuilder.newDrug().withValidValues().build();
            const drugs = [drug, drug2];
            when(drugRepository.findAllPaginate(0, 10)).thenResolve(drugs);
            const result = await drugService.findAll(1, 10);
            expect(result).toEqual(drugs);
        });
    });

    describe('removeDrug', () => {
        it('should remove a drug', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            when(drugRepository.delete(drug.id)).thenResolve(true);
            const result = await drugService.removeDrug(drug);
            expect(result).toEqual(true);
        });

        it('should throw if cant remove', async () => {
            const drug = DrugTestBuilder.newDrug().withValidValues().build();
            when(drugRepository.delete(drug.id)).thenResolve(false);            
            expect(async () => await drugService.removeDrug(drug)).rejects.toThrow(BadRequest);
        });
    });
});