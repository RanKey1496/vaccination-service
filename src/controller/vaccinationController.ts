import { Application, NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { VaccinationService } from '../service/vaccination/vaccinationService';
import Types from '../config/types';
import { JWTService } from '../service/jwt/jwtService';
import { RegistrableController } from './RegistrableController';
import { dataResponse } from '../util/response';
import { DrugService } from '../service/drug/drugService';
import { validateEntity } from '../util/main';

@injectable()
export class VaccinationController implements RegistrableController {

    @inject(Types.JWTService)
    private jwtService: JWTService;

    @inject(Types.VaccinationService)
    private vaccinationService: VaccinationService;

    @inject(Types.DrugService)
    private drugService: DrugService;

    public register(app: Application): void {

        app.post('/vaccination', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { name, drug_id, dose, date } = req.body;

                    const drug = await this.drugService.findById(drug_id);
                    await this.vaccinationService.validateCanVaccinateWithThisDrug(drug, dose, date);

                    const vaccination = this.vaccinationService.createInstance(name, drug, dose, date);
                    await validateEntity(vaccination);
                    await this.vaccinationService.saveNewVaccination(vaccination);

                    return dataResponse(res, 'Vacunacion creada satisfactoriamente');
                } catch (error) {
                    return next(error);
                }
            });

        app.put('/vaccination/:id', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { id } = req.params;
                    const { name, drug_id, dose, date } = req.body;

                    const vaccination = await this.vaccinationService.findById(id);
                    const drug = await this.drugService.findById(drug_id);
                    await this.vaccinationService.validateCanVaccinateWithThisDrug(drug, dose, date);
                    await this.vaccinationService.updateVaccination(vaccination, name, drug, dose, date);

                    return dataResponse(res, 'Vacunacion actualizada correctamente');
                } catch (error) {
                    return next(error);
                }
            });

        app.get('/vaccination', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const page: any = req.query.page || 1;
                    const limit: any = req.query.limit || 10;
                    const result = await this.vaccinationService.findAll(page, limit);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.delete('/vaccination/:id', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { id } = req.params;

                    const vaccination = await this.vaccinationService.findById(id);
                    await this.vaccinationService.removeVaccination(vaccination);

                    return dataResponse(res, 'Vacunación eliminada');
                } catch (error) {
                    return next(error);
                }
            });
    }

}