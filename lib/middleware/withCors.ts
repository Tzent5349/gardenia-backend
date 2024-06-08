// lib/middleware/withCors.ts
import { NextRequest, NextResponse } from "next/server";
import { cors } from './cors';

export function withCors(handler:any) {
  return async (req: NextRequest, res: NextResponse) => {
    if (cors(req, res)) {
      return;
    }
    return handler(req, res);
  };
}
