// lib/init-middleware.ts

import Cors from 'cors';

// Function to initialize middleware
export default function initMiddleware(middleware: any) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
