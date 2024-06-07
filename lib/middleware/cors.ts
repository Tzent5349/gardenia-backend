// lib/middleware/cors.ts
import { NextApiRequest, NextApiResponse } from 'next';

export function cors(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // or specify your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Authorization'
    );

    // If the request method is OPTIONS, respond with a 200 status code
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }

    return false;
}
