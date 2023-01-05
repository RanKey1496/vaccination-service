import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Unauthorize } from '../../util/exceptions';
import { JWT_EXPIRE_TIME, JWT_SECRET_TOKEN } from '../../util/secrets';

export interface JWTService {
    generateToken(email: string): string;
    verifyToken(token: string): { email: string };
}

@injectable()
export class JWTServiceImpl implements JWTService {

    public generateToken(email: string): string {
        return jwt.sign({ email }, JWT_SECRET_TOKEN, { expiresIn: JWT_EXPIRE_TIME });
    }

    public verifyToken(token: string): any {
        const valid = jwt.verify(token, JWT_SECRET_TOKEN);
        if (!valid) throw new Unauthorize('Token invalido');
        return valid;
    }

}