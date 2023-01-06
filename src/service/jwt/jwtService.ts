import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Unauthorize } from '../../util/exceptions';
import { JWT_EXPIRE_TIME, JWT_SECRET_TOKEN } from '../../util/secrets';

export interface JWTService {
    generateToken(email: string): string;
    verifyToken(token: string): { email: string };
    isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class JWTServiceImpl implements JWTService {

    public generateToken(email: string): string {
        return jwt.sign({ email }, JWT_SECRET_TOKEN, { expiresIn: JWT_EXPIRE_TIME });
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, JWT_SECRET_TOKEN);
    }

    public async isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.get('Authorization').split(' ')[1];
            if (!token) return next(new Unauthorize('No se ha enviado un token'));
            const data = this.verifyToken(token);
            res.req.body.user = data;
            return next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return next(new Unauthorize('Token expirado'));
            }
            return next(new Unauthorize('Token invalido'));
        }
    }

}