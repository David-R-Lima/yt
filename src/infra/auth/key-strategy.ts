import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class KeyStrategy extends PassportStrategy(
    Strategy,
    'bearer',
) {
    constructor(
    ) {
        super();
    }

    async validate(token: string) {
        const expectedToken = process.env.API_KEY;

        if (!token) {
            return false;
        }

        if(expectedToken !== token) {
            return false
        }

        return true
    }
}
