
import { NextApiRequest, NextApiResponse } from 'next';
import { post } from '@/api/users/route';

export default async function handler(req , res ) {
  if (req.method === 'POST') {
    await post(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}