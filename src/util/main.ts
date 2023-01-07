import { validate } from 'class-validator';
import { BadRequest } from './exceptions';

export async function validateEntity(entity: any): Promise<void> {
    const errors = await validate(entity);
    if (errors.length > 0) {
        const messages = errors.map(e => `${e.property}: ${JSON.stringify(e.constraints)}`);
        throw new BadRequest(`${messages}`);
    }
}