import express, { Application, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { BadRequest, Unauthorize, Conflict, NotFound } from './util/exceptions';
import { badRequestResponse, unauthorizeResponse, conflictResponse, internalResponse, notFoundResponse } from './util/response';
import { ENVIRONMENT } from './util/secrets';
import { RegistrableController } from './controller/RegistrableController';
import Types from './config/types';
import { container } from './config/inversify';
import { dataSource } from './config/db';

export default class App {

    private async init() {

        await dataSource.initialize();

        const app: Application = express();
        app.set('port', process.env.PORT || 3000);

        app.use(errorHandler());
        app.use(compression());
        app.use(helmet());
        app.use(morgan(ENVIRONMENT === 'production' ? 'combined' : 'dev'));
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        const controllers: RegistrableController[] = container.getAll<RegistrableController>(Types.Controller);
        controllers.forEach(controller => controller.register(app));

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);

            if (err instanceof NotFound) {
                return notFoundResponse(res, err.message);
            }
            if (err instanceof BadRequest) {
                return badRequestResponse(res, err.message);
            }
            if (err instanceof Unauthorize) {
                return unauthorizeResponse(res, err.message);
            }
            if (err instanceof Conflict) {
                return conflictResponse(res, err.message);
            }

            return internalResponse(res);
        });

        return Promise.resolve(app);
    }

    public async start() {
        const app = await this.init();
        const server = app.listen(app.get('port'), async () => {
            console.log(`Service running at port ${app.get('port')} in ${app.get('env')} mode`);
            console.log('Date: ', new Date());
        });
        return Promise.resolve(server);
    }

}