// pages/api/create-user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import cors from '@/lib/cors';
import { createUser } from '@/lib/database/actions/users.action';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  if (req.method === 'POST') {
    try {
      // Your create user logic goes here
      const userData = req.body;
      const newUser = await createUser(userData);
      res.status(200).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
