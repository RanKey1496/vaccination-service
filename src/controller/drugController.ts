import { Application, NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import Types from '../config/types';
import { dataResponse } from '../util/response';
import { validateEntity } from '../util/main';
import { RegistrableController } from './RegistrableController';
import { JWTService } from '../service/jwt/jwtService';
import { DrugService } from '../service/drug/drugService';

@injectable()
export class DrugController implements RegistrableController {

    @inject(Types.JWTService)
    private jwtService: JWTService;

    @inject(Types.DrugService)
    private drugService: DrugService;

    public register(app: Application): void {

        app.post('/drugs', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { name, approved, min_dose, max_dose, available_at } = req.body;

                    const drug = this.drugService.createInstance(name, approved, min_dose,
                        max_dose, available_at);
                    await validateEntity(drug);
                    await this.drugService.saveNewDrug(drug);

                    return dataResponse(res, 'Droga creada satisfactoriamente');
                } catch (error) {
                    return next(error);
                }
        });

        app.put('/drugs/:id', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { id } = req.params;
                    const { name, approved, min_dose, max_dose, available_at } = req.body;

                    const drug = await this.drugService.findById(id);
                    await this.drugService.updateDrug(drug, name, approved, min_dose, max_dose, available_at );

                    return dataResponse(res, 'Droga actualizada correctamente');
                } catch (error) {
                    return next(error);
                }
        });

        app.get('/drugs', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const page: any = req.query.page || 1;
                    const limit: any = req.query.limit || 10;
                    const result = await this.drugService.findAll(page, limit);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
        });

        app.delete('/drugs/:id', this.jwtService.isAuthenticated.bind(this.jwtService),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { id } = req.params;

                    const drug = await this.drugService.findById(id);
                    await this.drugService.removeDrug(drug);

                    return dataResponse(res, 'Droga eliminada');
                } catch (error) {
                    return next(error);
                }
        });

    }

}