import { Request } from 'express';

export const getToken = async(request: Request): Promise<string | undefined> => {
    //Bearer ***********
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    return type == 'Bearer' ? token : undefined;
}