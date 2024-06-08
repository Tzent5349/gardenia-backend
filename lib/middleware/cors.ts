import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  'http://localhost:3001',
  'https://33fb-79-168-246-226.ngrok-free.app', // Ensure this is the HTTPS version
  'https://chilly-seals-itch.loca.lt' // Use HTTPS for local network if applicable
] ;

export function cors(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin");

  if (allowedOrigins.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Authorization'
    );

    // If the request method is OPTIONS, respond with a 204 status code
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return true;
    }
  } else {
    res.headers.set('Access-Control-Allow-Origin', 'null');
    res.status(403).json({ message: 'Origin not allowed' });
    return true;
  }

  return false;
}
