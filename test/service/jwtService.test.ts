import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { JWTService, JWTServiceImpl } from '../../src/service/jwt/jwtService';

describe('JWTService', () => {
    let jwtService: JWTService;

    beforeAll((done) => {
        jwtService = new JWTServiceImpl();
        done();
    });

    describe('generateToken', () => {
        it('should return a Token', () => {
            const email = 'jhongil96@gmail.com';
            const token = jwtService.generateToken(email);
            const startsWith = token.startsWith('ey');
            expect(startsWith).toEqual(true);
        })
    });

    describe('verifyToken', () => {
        it('should return verify a token', () => {
            const email = 'jhongil96@gmail.com';
            const token = jwtService.generateToken(email);
            const verifyToken = jwtService.verifyToken(token);
            expect(verifyToken.email).toEqual(email);
        })
    });

    describe('isAuthenticated', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        let nextFunction: NextFunction = jest.fn();

        beforeEach(() => {
            mockRequest = {};
            mockResponse = {
                json: jest.fn()
            }
        });

        it('should pass', async () => {
            const email = 'jhongil96@gmail.com';
            const token = jwtService.generateToken(email);
            mockRequest = {
                headers: {
                    'authorization': token
                }
            };
            await jwtService.isAuthenticated(mockRequest as Request, mockResponse as Response, nextFunction)
            expect(nextFunction).toBeCalled();
        });

        it('should throw unauthorize without token', async () => {
            mockRequest = {
                headers: {
                    'authorization': ''
                }
            };
            await jwtService.isAuthenticated(mockRequest as Request, mockResponse as Response, nextFunction)
            expect(nextFunction).toBeCalled()
        });

        it('should throw unauthorize with invalid token', async () => {
            mockRequest = {
                headers: {
                    'authorization': 'Bearer 123'
                }
            };
            await jwtService.isAuthenticated(mockRequest as Request, mockResponse as Response, nextFunction)
            expect(nextFunction).toBeCalled();
        });
    });
});